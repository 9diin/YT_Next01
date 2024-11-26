"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/atoms";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/hooks/use-toast";
import useEmailCheck from "@/hooks/use-email";
/** UI 컴포넌트 */
import { FindPasswordPopup } from "@/components/common";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/components/ui";
import { Eye, EyeOff } from "@/public/assets/icons";

function LoginPage() {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useAtom(userAtom);
    const { checkEmail } = useEmailCheck();
    /** 회원가입에 필요한 상태 값 */
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    /** 비밀번호 보기 Toggle */
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const togglePassword = () => setShowPassword((prevState) => !prevState);

    const handleLogin = async () => {
        if (!email || !password) {
            toast({
                variant: "destructive",
                title: "기입되지 않은 데이터(값)가 있습니다.",
                description: "이메일과 비밀번호는 필수 값입니다.",
            });
            return; // 필수 값이 입력되지 않은 경우라면, 추가 작업은 하지 않고 리턴
        }

        if (!checkEmail(email)) {
            toast({
                variant: "destructive",
                title: "올바르지 않은 이메일 양식입니다.",
                description: "올바른 이메일 양식을 작성해주세요!",
            });
            return; // 이메일 형식이 잘못된 경우, 추가 작업을 하지 않고 리턴
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                toast({
                    variant: "destructive",
                    title: "에러가 발생했습니다.",
                    description: `Supabase 오류: ${error.message || "알 수 없는 오류"}`,
                });
            } else if (data && !error) {
                toast({
                    title: "로그인을 성공하였습니다.",
                    description: "자유롭게 TASK 관리를 해주세요!",
                });
                console.log(data);
                router.push("/board"); // 로그인 페이지로 이동
                // Jotai의 user에 관련된 상태 값을 업데이트
                setUser({
                    id: data.user?.id || "",
                    email: data.user?.email || "",
                    phone: data.user?.phone || "",
                    imgUrl: "/assets/images/profile.jpg",
                });
            }
        } catch (error) {
            /** 네트워크 오류나 예기치 않은 에러를 잡기 위해 catch 구문 사용 */
            console.error(error);
            toast({
                variant: "destructive",
                title: "네트워크 오류",
                description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
            });
        }
    };

    return (
        <div className="page">
            <div className="page__container">
                {/* 소개 문구 */}
                <div className="flex flex-col items-center mt-10">
                    <h4 className="text-lg font-semibold">안녕하세요 👋🏻</h4>
                    <div className="flex flex-col items-center justify-center mt-2 mb-4">
                        <div className="text-sm text-muted-foreground">
                            <small className="text-sm text-[#e79057] font-medium leading-none">TASK 관리 앱</small>에 방문해주셔서 감사합니다.
                        </div>
                        <p className="text-sm text-muted-foreground">서비스를 이용하려면 로그인을 진행해주세요.</p>
                    </div>
                </div>
                <Card className="w-[400px]">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">로그인</CardTitle>
                        <CardDescription>로그인을 위한 정보를 입력해주세요.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">이메일</Label>
                            <Input id="email" type="email" placeholder="이메일을 입력하세요." required value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="relative grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">비밀번호</Label>
                                <FindPasswordPopup>
                                    <p className="ml-auto inline-block text-sm underline cursor-pointer">비밀번호를 잊으셨나요?</p>
                                </FindPasswordPopup>
                            </div>
                            <Input id="password" type={showPassword ? "text" : "password"} placeholder="비밀번호를 입력하세요." required value={password} onChange={(event) => setPassword(event.target.value)} />
                            <Button size={"icon"} className="absolute top-[38px] right-2 -translate-y-1/4 bg-transparent hover:bg-transparent" onClick={togglePassword}>
                                {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                            </Button>
                        </div>
                    </CardContent>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <CardFooter className="flex flex-col mt-6">
                        <Button className="w-full text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg" onClick={handleLogin}>
                            로그인
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            계정이 없으신가요?
                            <Link href={"/signup"} className="underline text-sm ml-1">
                                회원가입
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default LoginPage;

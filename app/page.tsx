"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Label, Input } from "@/components/ui";
import { Eye, EyeOff } from "@/public/assets/icons";

function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const showToggle = () => setShowPassword((prevState) => !prevState);

    /** 로그인에 필요한 데이터 Input Value */
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    return (
        <div className="page">
            <div className="page__container">
                <div className="flex flex-col items-center mt-10">
                    <h4 className="text-lg font-semibold">안녕하세요👋</h4>
                    <div className="flex flex-col items-center justify-center mt-2 mb-4">
                        <div className="text-sm text-muted-foreground">
                            <small className="text-sm text-[#E79057] font-medium leading-none">TASK 관리 앱</small>에 방문해주셔서 감사합니다.
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
                            <Input id="email" type="email" placeholder="이메일을 입력하세요." required value={email} onChange={handleEmailChange} />
                        </div>
                        <div className="relative grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">비밀번호</Label>
                                <Link href={"#"} className="ml-auto inline-block text-sm underline">
                                    비밀번호를 잊으셨나요?
                                </Link>
                            </div>
                            <Input id="password" type={showPassword ? "text" : "password"} placeholder="비밀번호를 입력하세요." value={password} onChange={handlePasswordChange} />
                            <Button size="icon" className="absolute top-[38px] right-2 -translate-y-1/4 bg-transparent hover:bg-transparent" onClick={showToggle}>
                                {showPassword ? <Eye className="h-5 w-5 text-muted-foreground" /> : <EyeOff className="h-5 w-5 text-muted-foreground" />}
                            </Button>
                        </div>
                    </CardContent>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <CardFooter className="flex flex-col mt-6">
                        <Button className="w-full text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg">로그인</Button>
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

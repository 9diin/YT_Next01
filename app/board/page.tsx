"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateTask } from "@/hooks/api";
/** UI 컴포넌트 */
import { Button } from "@/components/ui";

function BoardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    /** Add New Page 버튼을 클릭하였을 때, TASK 생성 */
    const handleCreateTask = useCreateTask();

    useEffect(() => {
        /** 클라이언트에서 localStorage의 user 데이터를 확인 */
        const user = localStorage.getItem("user");

        /** user 데이터가 없거나 특정 조건을 만족하지 않으면 리다이렉트 */
        if (!user) {
            router.push("/");
        } else {
            setLoading(false); // user 데이터가 정상적이면 로딩 상태 해제
        }
    }, [router]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-5 mb-6">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">How to start:</h3>
                <div className="flex flex-col items-center gap-3">
                    <small className="text-sm font-normal leading-none">1. Create a page</small>
                    <small className="text-sm font-normal leading-none">2. Add boards to page</small>
                </div>
            </div>
            <Button className="text-[#E79057] bg-transparent border border-[#E79057] hover:bg-[#FFF9F5] w-[180px]" onClick={handleCreateTask}>
                Add New Page
            </Button>
        </div>
    );
}

export default BoardPage;

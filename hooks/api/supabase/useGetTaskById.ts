"use client";

import { toast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { taskAtom } from "@/stores/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

function useGetTaskById(taskId: number) {
    const supabase = createClient();
    const [task, setTask] = useAtom(taskAtom);

    const getTaskById = async () => {
        try {
            const { data, status, error } = await supabase.from("tasks").select("*").eq("id", taskId);

            if (data && status === 200) setTask(data[0]);
            if (error) {
                toast({
                    variant: "destructive",
                    title: "에러가 발생했습니다.",
                    description: `Supabase 오류: ${error.message || "알 수 없는 오류"}`,
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

    useEffect(() => {
        if (taskId) getTaskById();
    }, [taskId]);

    return { task, getTaskById };
}

export { useGetTaskById };

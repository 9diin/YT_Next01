"use client";

import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { useAtom } from "jotai";
import { tasksAtom } from "@/stores/atoms";

function useSearch() {
    const [, setTasks] = useAtom(tasksAtom);
    const search = async (searchTerm: string) => {
        try {
            const { data, status, error } = await supabase.from("tasks").select("*").ilike("title", `%${searchTerm}%`);

            if (data && status === 200) {
                setTasks(data); // Jotai의 tasksAtom 상태를 업데이트
            }

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
    return { search };
}

export { useSearch };

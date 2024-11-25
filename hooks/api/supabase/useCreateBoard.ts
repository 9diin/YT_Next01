"use client";

import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { taskAtom } from "@/stores/atoms";
import { useAtom } from "jotai";

function useCreateBoard() {
    const [, setTask] = useAtom(taskAtom);

    const createBoard = async (taskId: number, column: string, newValue: any) => {
        try {
            const { data, status, error } = await supabase
                .from("tasks")
                .update({
                    [column]: newValue,
                })
                .eq("id", taskId)
                .select();

            if (data !== null && status === 200) {
                toast({
                    title: "새로운 TODO-BOARD를 생성했습니다.",
                    description: "생성한 TODO-BOARD를 예쁘게 꾸며주세요!",
                });
                setTask(data[0]);
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
    return createBoard;
}

export { useCreateBoard };

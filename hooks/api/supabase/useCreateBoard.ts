import { useParams } from "next/navigation";
import { useAtom } from "jotai";
import { taskAtom } from "@/stores/atoms";
import { supabase } from "@/lib/supabase";
import { useGetTaskById } from "./useGetTaskById";
import { useToast } from "@/hooks/use-toast";

function useCreateBoard() {
    const { id } = useParams();
    const { getTaskById } = useGetTaskById(Number(id));
    const { toast } = useToast();
    const [_, setTask] = useAtom(taskAtom);

    const createBoard = async (taskId: number, column: string, newValue: any) => {
        try {
            const { data, status } = await supabase
                .from("tasks")
                .update({ [column]: newValue })
                .eq("id", taskId)
                .select();

            if (data !== null && status === 200) {
                toast({
                    title: "새로운 TODO-BOARD가 생성되었습니다.",
                    description: "생성한 TODO-BOARD를 예쁘게 꾸며주세요.",
                });
                setTask(data[0]);
                getTaskById();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "네트워크 오류",
                description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
            });
            console.error("API 호출 중 오류 발생:", error);
        }
    };

    return createBoard;
}

export { useCreateBoard };

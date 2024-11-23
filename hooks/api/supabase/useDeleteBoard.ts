import { useAtom } from "jotai";
import { taskAtom } from "@/stores/atoms";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Board } from "@/types";
import { useGetTaskById } from "./useGetTaskById";

function useDeleteBoard(taskId: number, boardId: string | number) {
    const { toast } = useToast();
    const { getTaskById } = useGetTaskById(taskId);
    const [task, setTask] = useAtom(taskAtom);

    const deleleBoard = async () => {
        try {
            const { data, status, error } = await supabase
                .from("tasks")
                .update({
                    boards: task?.boards.filter((board: Board) => board.id !== boardId),
                })
                .eq("id", taskId);

            if (status === 204) {
                toast({
                    title: "선택한 TODO-LIST가 삭제되었습니다.",
                    description: "새로운 TASK가 생기시면 언제든 추가해주세요!",
                });
                getTaskById();
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
            toast({
                variant: "destructive",
                title: "네트워크 오류",
                description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
            });
            console.error("API 호출 중 오류 발생:", error);
        }
    };
    return deleleBoard;
}

export { useDeleteBoard };

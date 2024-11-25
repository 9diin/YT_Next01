"use client";

import { toast } from "@/hooks/use-toast";
import { useAtom } from "jotai";
import { tasksAtom } from "@/stores/atoms";
import { supabase } from "@/lib/supabase";

function useGetTasks() {
    const [tasks, setTasks] = useAtom(tasksAtom);

    /** 하단의 코드에서 Supabase에서 error를 반환함에도 불구하고 try-catch 구문을 사용하는 이유
     * async-await 구문에서 비동기 로직을 처리할 경우, try-catch는 주로 비동기 함수에서 발생할 수 있는 예외를 처리하기 위해 사용됩니다.
     * 만약, getTasks 함수 내에서 await한 API 호출이나 네트워크 요청에서 에러가 발생한다면, 그 오류는 자동으로 예외를 발생할 수 있습니다.
     * 그럴 경우, 예외를 잡아내지 않으면 프로그램이 중단되거나 예상치 못한 오류가 발생할 수 있습니다.
     */
    const getTasks = async () => {
        try {
            const { data, status, error } = await supabase.from("tasks").select("*");

            if (data && status === 200) setTasks(data);
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

    return { tasks, getTasks };
}

export { useGetTasks };

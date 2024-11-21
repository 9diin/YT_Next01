import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/types";

/** Supabase 내 todos 테이블 데이터 전체 조회 */
function useGetTasks() {
    const { toast } = useToast();
    const [tasks, setTasks] = useState<Task[]>([]);
    const fetchApi = async () => {
        const { data, status, error } = await supabase.from("todos").select("*");

        if (data !== null && status === 200) setTasks(data);
        if (error)
            toast({
                variant: "destructive",
                title: "에러가 발생했습니다.",
                description: "알 수 없는 에러가 발생했습니다. 문의해주세요!",
            });
    };

    useEffect(() => {
        fetchApi();
    }, []);

    return tasks;
}

export { useGetTasks };

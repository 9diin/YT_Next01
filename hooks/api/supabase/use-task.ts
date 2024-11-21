"use client";

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

/** Supabase 내 todos 테이블 데이터 중 특정 id 값 정보 조회 */
function useGetTaskById(id: string | number) {
    const [task, setTask] = useState<Task>();
    const { toast } = useToast();

    const fetchApi = async () => {
        const { data, status, error } = await supabase.from("todos").select("*").eq("id", id);

        if (data !== null && status === 200) setTask(data[0]);
        if (error)
            toast({
                variant: "destructive",
                title: "에러가 발생했습니다.",
                description: "알 수 없는 에러가 발생했습니다. 문의해주세요!",
            });
    };

    useEffect(() => {
        fetchApi();
    }, [id]);

    return task;
}

/** Supabse 내 todos 데이블 데이터 중 특정 id 값에 대한 특정 column 변경 */
function useUpdateTaskOneColumnById(id: number, column: string, value: any) {
    const { toast } = useToast();

    const fetchApi = async () => {
        try {
            const { status, error } = await supabase
                .from("todos")
                .update({ [column]: value })
                .eq("id", Number(id));

            if (status === 204) {
                toast({
                    title: "새로운 TODO-BOARD가 생성되었습니다.",
                    description: "생성한 TODO-BOARD를 예쁘게 꾸며주세요.",
                });
            }

            if (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "에러가 발생했습니다.",
                    description: "개발자 도구창을 확인하세요.",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApi();
    }, [id, column, value]);

    return fetchApi; // fetchApi 함수 반환
}

export { useGetTasks, useGetTaskById, useUpdateTaskOneColumnById };

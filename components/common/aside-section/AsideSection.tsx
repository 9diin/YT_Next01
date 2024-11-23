"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { tasksAtom } from "@/stores/atoms";
import { useGetTasks, useCreateTask } from "@/hooks/api";
/** UI 컴포넌트 */
import { Button, SearchBar } from "@/components/ui";
import { Task } from "@/types";

function AsideSection() {
    const { id } = useParams();
    const router = useRouter();
    const { tasks, getTasks } = useGetTasks();

    /** Add New Page 버튼을 클릭하였을 때, TODO-LIST 생성 */
    const handleCreateTask = useCreateTask();

    useEffect(() => {
        getTasks();
    }, [id]);

    return (
        <aside className="page__aside">
            {/* 검색창 UI */}
            <SearchBar placeholder="검색어를 입력하세요." />
            {/* Add New Page 버튼 UI */}
            <Button className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]" onClick={handleCreateTask}>
                Add New Page
            </Button>
            {/* TODO 목록 UI 하나 */}
            <div className="flex flex-col mt-4 gap-2">
                <small className="text-sm font-medium leading-none text-[#A6A6A6]">9Diin의 TODO-BOARD</small>
                <ul className="flex flex-col">
                    {tasks.length ? (
                        tasks.map((task: Task) => {
                            return (
                                <li
                                    key={task.id}
                                    className={`${task.id === Number(id) ? `bg-[#F5F5F5]` : `bg-transparent`} min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm cursor-pointer`}
                                    onClick={() => router.push(`/board/${task.id}`)}
                                >
                                    <div className={`${task.id === Number(id) ? `bg-[#00F38D]` : `bg-neutral-400`} h-[6px] w-[6px] rounded-full`}></div>
                                    <span className={`${task.id === Number(id) ? `` : `text-neutral-400`}`}>{task.title ? task.title : "등록된 TASK 제목이 없습니다."}</span>
                                </li>
                            );
                        })
                    ) : (
                        <li className="bg-[#F5F5F5] text-neutral-400 w-full flex items-center justify-center min-h-9  gap-2 py-2 px-[10px] rounded-sm text-sm cursor-pointer">생성된 TASK가 없습니다.</li>
                    )}
                </ul>
            </div>
        </aside>
    );
}

export { AsideSection };

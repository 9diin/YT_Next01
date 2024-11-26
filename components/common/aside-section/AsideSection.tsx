"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetTasks, useCreateTask, useSearch } from "@/hooks/api";
/** UI 컴포넌트 */
import { Button, SearchBar } from "@/components/ui";
import { Task } from "@/types";
import { NavUser } from "./NavUser";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/atoms";

function AsideSection() {
    const router = useRouter();
    const { id } = useParams();
    const { tasks, getTasks } = useGetTasks();
    const { search } = useSearch();
    /** 상태 값 */
    const user = useAtomValue(userAtom); // read
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        getTasks();
    }, [id]);

    /** Add New Page 버튼을 클릭하였을 때, TASK 생성 */
    const handleCreateTask = useCreateTask();

    /** 검색 */
    const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") search(searchTerm);
        else return;
    };

    return (
        <aside className="page__aside">
            <div className="flex flex-col h-full gap-3">
                {/* 검색창 UI */}
                <SearchBar placeholder="검색어를 입력하세요." onChange={(event) => setSearchTerm(event.target.value)} onKeyDown={handleSearch} />
                {/* Add New Page 버튼 UI */}
                <Button className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]" onClick={handleCreateTask}>
                    Add New Page
                </Button>
                {/* TODO 목록 UI 하나 */}
                <div className="flex flex-col mt-4 gap-2">
                    <small className="text-sm font-medium leading-none text-[#A6A6A6]">9Diin의 TODO-BOARD</small>
                    <ul className="flex flex-col">
                        {tasks.length === 0 ? (
                            <li className="bg-[#F5F5F5] min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm text-neutral-400">
                                <div className="h-[6px] w-[6px] rounded-full bg-neutral-400"></div>
                                등록된 TASK가 없습니다.
                            </li>
                        ) : (
                            tasks.map((task: Task) => {
                                return (
                                    <li key={task.id} onClick={() => router.push(`/board/${task.id}`)} className={`${task.id === Number(id) && "bg-[#F5F5F5]"} min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm cursor-pointer`}>
                                        <div className={`${task.id === Number(id) ? "bg-[#00F38D]" : "bg-neutral-400"} h-[6px] w-[6px] rounded-full`}></div>
                                        <span className={`${task.id !== Number(id) && `text-neutral-400`}`}>{task.title ? task.title : "등록된 제목이 없습니다."}</span>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            </div>
            <NavUser user={user} />
        </aside>
    );
}

export { AsideSection };

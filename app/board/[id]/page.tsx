"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useGetTasks, useGetTaskById, useCreateBoard } from "@/hooks/api";
import { useToast } from "@/hooks/use-toast";
import { nanoid } from "nanoid";
/** UI 컴포넌트 */
import { AlertPopup, BoardCard } from "@/components/common";
import { Button, LabelDatePicker, Progress } from "@/components/ui";
import { ChevronLeft } from "@/public/assets/icons";
/** 스타일 */
import styles from "./page.module.scss";
/** 타입 */
import { Board } from "@/types";

function BoardUniquePage() {
    const { id } = useParams();
    const router = useRouter();
    const { getTasks } = useGetTasks();
    const { task } = useGetTaskById(Number(id));
    const { toast } = useToast();

    // 상태 초기화
    const [title, setTitle] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [boards, setBoards] = useState<Board[]>(task?.boards || []);
    const [count, setCount] = useState<number>(0);
    const createBoard = useCreateBoard();

    // task가 로드되면 상태 업데이트
    useEffect(() => {
        if (task) {
            setTitle(task.title || "");
            setStartDate(task.start_date);
            setEndDate(task.end_date);
            setBoards(task.boards || []);
        }
    }, [task]);

    // boards에 있는 isCompleted가 true인 항목의 개수를 계산
    useEffect(() => {
        if (task?.boards) {
            const completedCount = task.boards.filter((board) => board.isCompleted).length;
            setCount(completedCount);
        }
    }, [task?.boards]);

    /** 저장 버튼 클릭 시 */
    const handleSave = async () => {
        if (!title || !startDate || !endDate) {
            toast({
                variant: "destructive",
                title: "기입되지 않은 데이터(값)가 있습니다.",
                description: "수정한 TASK의 마감일을 꼭 지켜주세요!",
            });
            return;
        }

        try {
            const { data, status } = await supabase.from("tasks").update({ title: title, start_date: startDate, end_date: endDate }).eq("id", id).select();

            if (data !== null && status === 200) {
                toast({
                    title: "새로운 TODO-BOARD가 생성되었습니다.",
                    description: "생성한 TODO-BOARD를 예쁘게 꾸며주세요.",
                });
                // 서버에서 데이터 갱신 후 상태 업데이트
                getTasks();
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

    /** Add New Board 버튼 클릭 시 */
    const handleAddBoard = () => {
        const newBoard = {
            id: nanoid(),
            isCompleted: false,
            title: "",
            startDate: undefined,
            endDate: undefined,
            content: "",
        };
        const newBoards = [...boards, newBoard];

        setBoards(newBoards);
        createBoard(Number(id), "boards", newBoards);
    };

    return (
        <>
            <div className={styles.header}>
                <div className={styles[`header__btn-box`]}>
                    <Button variant={"outline"} size={"icon"} onClick={() => router.push("/")}>
                        <ChevronLeft />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant={"secondary"} onClick={handleSave}>
                            저장
                        </Button>
                        <AlertPopup>
                            <Button className="text-rose-600 bg-red-50 hover:bg-rose-50">삭제</Button>
                        </AlertPopup>
                    </div>
                </div>
                <div className={styles.header__top}>
                    {/* 제목 입력 Input 섹션 */}
                    <input type="text" placeholder="Enter Title Here!" value={title} onChange={(event) => setTitle(event.target.value)} className={styles.header__top__input} />
                    {/* 진행상황 척도 그래프 섹션 */}
                    <div className="flex items-center justify-start gap-4">
                        <small className="text-sm font-medium leading-none text-[#6D6D6D]">
                            {count}/{task?.boards.length} Completed
                        </small>
                        <Progress className="w-60 h-[10px]" value={task && task.boards.length > 0 ? (count / task.boards.length) * 100 : 0} />
                    </div>
                </div>
                {/* 캘린더 + Add New Board 버튼 섹션 */}
                <div className={styles.header__bottom}>
                    <div className="flex items-center gap-5">
                        <LabelDatePicker label={"From"} value={startDate} onChange={setStartDate} />
                        <LabelDatePicker label={"To"} value={endDate} onChange={setEndDate} />
                    </div>
                    <Button className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg" onClick={handleAddBoard}>
                        Add New Board
                    </Button>
                </div>
            </div>
            <div className={styles.body}>
                {!task?.boards.length ? (
                    <div className={styles.body__noData}>
                        {/* Add New Board 버튼 클릭으로 인한 Board 데이터가 없을 경우 */}
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">There is no board yet.</h3>
                        <small className="text-sm font-medium leading-none text-[#6D6D6D] mt-3 mb-7">Click the button and start flashing!</small>
                        <button onClick={handleAddBoard}>
                            <Image src="/assets/images/button.svg" width={74} height={74} alt="rounded-button" />
                        </button>
                    </div>
                ) : (
                    <div className={styles.body__isData}>
                        {/* Add New Board 버튼 클릭으로 인한 Board 데이터가 있을 경우 */}
                        {task?.boards.map((board: Board) => {
                            return <BoardCard key={board.id} board={board} />;
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default BoardUniquePage;

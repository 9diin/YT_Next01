"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetTaskById } from "@/hooks/api";
import { nanoid } from "nanoid";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
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
    const { toast } = useToast();
    const task = useGetTaskById(Number(id));
    const [boards, setBoards] = useState<Board[]>(task?.boards || []);

    /** Add New Board 버튼 클릭 시 */
    const handleAddBoard = async () => {
        const newBoard = {
            id: nanoid(),
            isCompleted: false,
            title: "",
            startDate: "",
            endDate: "",
            content: "",
        };
        setBoards((prevBoards) => [...prevBoards, newBoard]);
        updateTaskOneColumnById(Number(id), "boards", boards);
    };

    const updateTaskOneColumnById = async (id: number, column: string, newValue: any) => {
        try {
            const { data, status } = await supabase
                .from("tasks")
                .update({ [column]: newValue })
                .eq("id", Number(id))
                .select();

            console.log(data);
            if (data !== null && status === 204) {
                toast({
                    title: "새로운 TODO-BOARD가 생성되었습니다.",
                    description: "생성한 TODO-BOARD를 예쁘게 꾸며주세요.",
                });
                // setBoards(data.board);
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "에러가 발생했습니다.",
                description: "알 수 없는 에러가 발생했습니다. 문의사항을 남겨주세요!",
            });
        }
    };

    return (
        <>
            <div className={styles.header}>
                <div className={styles[`header__btn-box`]}>
                    <Button variant={"outline"} size={"icon"}>
                        <ChevronLeft />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant={"secondary"}>저장</Button>
                        <AlertPopup>
                            <Button className="text-rose-600 bg-red-50 hover:bg-rose-50">삭제</Button>
                        </AlertPopup>
                    </div>
                </div>
                <div className={styles.header__top}>
                    {/* 제목 입력 Input 섹션 */}
                    <input type="text" placeholder="Enter Title Here!" className={styles.header__top__input} />
                    {/* 진행상황 척도 그래프 섹션 */}
                    <div className="flex items-center justify-start gap-4">
                        <small className="text-sm font-medium leading-none text-[#6D6D6D]">1/10 Completed</small>
                        <Progress className="w-60 h-[10px]" value={33} />
                    </div>
                </div>
                {/* 캘린더 + Add New Board 버튼 섹션 */}
                <div className={styles.header__bottom}>
                    <div className="flex items-center gap-5">
                        <LabelDatePicker label={"From"} />
                        <LabelDatePicker label={"To"} />
                    </div>
                    <Button className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg" onClick={handleAddBoard}>
                        Add New Board
                    </Button>
                </div>
            </div>
            <div className={styles.body}>
                {boards.length !== 0 ? (
                    <div className={styles.body__isData}>
                        {/* Add New Board 버튼 클릭으로 인한 Board 데이터가 있을 경우 */}
                        {boards.map((board: Board) => {
                            return <BoardCard key={board.id} board={board} />;
                        })}
                    </div>
                ) : (
                    <div className={styles.body__noData}>
                        {/* Add New Board 버튼 클릭으로 인한 Board 데이터가 없을 경우 */}
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">There is no board yet.</h3>
                        <small className="text-sm font-medium leading-none text-[#6D6D6D] mt-3 mb-7">Click the button and start flashing!</small>
                        <button>
                            <Image src="/assets/images/button.svg" width={74} height={74} alt="rounded-button" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default BoardUniquePage;

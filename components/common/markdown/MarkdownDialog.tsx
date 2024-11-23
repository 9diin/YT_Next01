"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCreateBoard } from "@/hooks/api";
import { useToast } from "@/hooks/use-toast";
/** UI 컴포넌트 */
import { Button, Checkbox, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, LabelDatePicker, Separator } from "@/components/ui";
import MarkdownEditor from "@uiw/react-markdown-editor";
/** 타입 */
import { Board } from "@/types";
import { useAtom } from "jotai";
import { taskAtom } from "@/stores/atoms";

interface Props {
    board: Board;
    children: React.ReactNode;
}

function MarkdownEditorDialog({ board, children }: Props) {
    const { id } = useParams(); // Task ID를 가져옴
    const { toast } = useToast(); // 사용자에게 알림을 띄우기 위한 hook
    const updateBoard = useCreateBoard(); // Board 생성 및 업데이트 함수
    const [task, setTask] = useAtom(taskAtom); // 상태를 관리하는 Jotai의 atom

    // 상태 값 선언
    const [isCompleted, setIsCompleted] = useState<boolean>(board.isCompleted || false);
    const [title, setTitle] = useState<string>(board.title || "");
    const [startDate, setStartDate] = useState<Date | undefined>(board.startDate ? new Date(board.startDate) : undefined); // Date로 초기화
    const [endDate, setEndDate] = useState<Date | undefined>(board.endDate ? new Date(board.endDate) : undefined); // Date로 초기화
    const [content, setContent] = useState<string>(board.content || "**Hello, World!**");
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

    // 다이얼로그 열 때마다 상태를 초기화하도록 useEffect 사용
    useEffect(() => {
        setIsCompleted(board.isCompleted || false);
        setTitle(board.title || "");
        setStartDate(board.startDate ? new Date(board.startDate) : undefined); // board 값으로 초기화
        setEndDate(board.endDate ? new Date(board.endDate) : undefined); // board 값으로 초기화
        setContent(board.content || "**Hello, World!**");
    }, [board]); // board가 변경될 때마다 상태를 업데이트

    // 보드 삽입 함수
    const handleInsert = async (boardId: string) => {
        if (!title || !content) {
            toast({
                variant: "destructive",
                title: "기입되지 않은 데이터(값)가 있습니다.",
                description: "[제목]과 [콘텐츠]는 반드시 입력해주세요!",
            });
            return;
        }
        try {
            // boards 배열에서 해당 board를 찾고, 수정된 값으로 업데이트
            const updatedBoards = task?.boards.map((board: Board) => {
                if (board.id === boardId) {
                    return { ...board, isCompleted, title, startDate, endDate, content };
                }
                return board;
            });
            updateBoard(Number(id), "boards", updatedBoards);
            setDialogOpen(false); // 등록 후 다이얼로그 닫기
        } catch (error) {
            toast({
                variant: "destructive",
                title: "네트워크 오류",
                description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
            });
            console.error("API 호출 중 오류 발생:", error);
        }
    };

    // 취소 버튼 클릭 시 다이얼로그 닫기
    const handleCancel = () => {
        setDialogOpen(false); // 다이얼로그만 닫고, 상태는 초기화하지 않음
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex flex-col">
                    <DialogTitle>
                        <div className="flex items-center justify-start gap-2">
                            <Checkbox
                                checked={isCompleted}
                                onCheckedChange={(checked) => {
                                    if (typeof checked === "boolean") setIsCompleted(checked);
                                }}
                                className="h-5 w-5 min-w-5"
                            />
                            <input type="text" placeholder="게시물의 제목을 입력하세요." value={title} onChange={(event) => setTitle(event.target.value)} className="w-full text-xl outline-none bg-transparent" />
                        </div>
                    </DialogTitle>
                    <DialogDescription>마크다운 에디터를 사용하여 TODO-BOARD를 예쁘게 꾸며보세요.</DialogDescription>
                </DialogHeader>
                {/* 캘린더 박스 */}
                <div className="flex items-center gap-5">
                    <LabelDatePicker label={"From"} value={startDate} onChange={setStartDate} />
                    <LabelDatePicker label={"To"} value={endDate} onChange={setEndDate} />
                </div>
                <Separator />
                {/* 마크다운 에디터 UI 영역 */}
                <MarkdownEditor value={content} onChange={setContent} className="h-[320px]" />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" variant={"outline"} onClick={handleCancel}>
                            취소
                        </Button>
                    </DialogClose>
                    <Button type="submit" onClick={() => handleInsert(board.id)} className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg">
                        등록
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export { MarkdownEditorDialog };

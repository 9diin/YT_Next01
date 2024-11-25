"use client";

import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useCreateBoard } from "@/hooks/api";
import { useAtom } from "jotai";
import { taskAtom } from "@/stores/atoms";
/** UI 컴포넌트 */
import { Button, Checkbox, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, LabelDatePicker, Separator } from "@/components/ui";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Board } from "@/types";
import { useParams } from "next/navigation";

interface Props {
    children: React.ReactNode;
    board: Board;
}

function MarkdownEditorDialog({ children, board }: Props) {
    const { id } = useParams();
    const updateBoards = useCreateBoard();
    const [task] = useAtom(taskAtom);
    /** 상태 값 선언 */
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [content, setContent] = useState<string>("**Hello, World!!**");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        initState();
    }, [board]);

    /** 등록 버튼 클릭 시 */
    const handleInsert = async (boardId: string) => {
        if (!title || !content) {
            toast({
                variant: "destructive",
                title: "기입되지 않은 데이터(값)가 있습니다.",
                description: "제목과 콘텐츠는 필수 값입니다.",
            });
            return;
        }

        try {
            /** boards 배열에서 선택한 board를 찾고, 수정된 값으로 업데이트 */
            const newBoards = task?.boards.map((board: Board) => {
                if (board.id === boardId) {
                    return { ...board, isCompleted, title, startDate, endDate, content };
                }
                return board;
            });
            await updateBoards(Number(id), "boards", newBoards);
            handleCloseDialog();
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

    /** 취소 버튼 클릭 시, 다이얼로그 닫기 */
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        initState();
    };

    /** 상태 값 초기화 */
    const initState = () => {
        setIsCompleted(board.isCompleted || false);
        setTitle(board.title || "");
        setStartDate(board.startDate ? new Date(board.startDate) : undefined);
        setEndDate(board.endDate ? new Date(board.endDate) : undefined);
        setContent(board.content || "**Hello, World!!**");
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex flex-col">
                    <DialogTitle>
                        <div className="flex items-center justify-start gap-2">
                            <Checkbox
                                className="h-5 w-5 min-w-5"
                                checked={isCompleted}
                                onCheckedChange={(checked) => {
                                    if (typeof checked === "boolean") setIsCompleted(checked);
                                }}
                            />
                            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="게시물의 제목을 입력하세요." className="w-full text-xl outline-none bg-transparent" />
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
                <MarkdownEditor className="h-[320px]" value={content} onChange={setContent} />
                <DialogFooter>
                    <Button type="submit" variant={"outline"} onClick={handleCloseDialog}>
                        취소
                    </Button>
                    <Button type="submit" className="text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg" onClick={() => handleInsert(board.id)}>
                        등록
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export { MarkdownEditorDialog };

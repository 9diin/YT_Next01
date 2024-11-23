"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { Calendar as CalendarIcon } from "lucide-react";

interface Props {
    label: string;
    value: Date | undefined;
    onChange?: (date: Date | undefined) => void;
    isReadOnly?: boolean;
}

function LabelDatePicker({ label, value, onChange, isReadOnly }: Props) {
    return (
        <div className="max-w-64 flex items-center gap-3">
            <small className="text-sm font-medium leading-none text-[#6D6D6D]">{label}</small>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn("w-[280px] justify-start text-left font-normal", !value && "text-muted-foreground")}
                        disabled={isReadOnly} // "readOnly" 모드일 때 버튼 비활성화
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? format(value, "PPP") : <span>날짜를 선택하세요.</span>}
                    </Button>
                </PopoverTrigger>
                {!isReadOnly && (
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
                    </PopoverContent>
                )}
            </Popover>
        </div>
    );
}

export { LabelDatePicker };

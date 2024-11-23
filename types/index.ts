export interface Task {
    id: number;
    title: string;
    start_date: Date;
    end_date: Date;
    boards: Board[];
}

export interface Board {
    id: string;
    isCompleted: boolean;
    title: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    content: string;
}

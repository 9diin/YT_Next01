export interface Task {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    boards: Board[];
}

export interface Board {
    id: string | number;
    isCompleted: boolean;
    title: string;
    startDate: Date | string;
    endDate: Date | string;
    content: string;
}

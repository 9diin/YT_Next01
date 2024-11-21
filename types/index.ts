export interface Task {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    boards: Board[];
}

export interface Board {
    id: number;
    isCompleted: boolean;
    title: string;
    startDate: Date;
    endDate: string;
    content: string;
}

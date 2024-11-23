import { atom } from "jotai";
import { Task, Board } from "@/types";

/** Supabase에 저장되어 있는 'tasks' 테이블 내 모든 데이터 조회  */
/** 전체 tasks 목록 상태 */
export const tasksAtom = atom<Task[]>([]);

/** 개별(단일) task 상태 */
export const taskAtom = atom<Task | null>(null);

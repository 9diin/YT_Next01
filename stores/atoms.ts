import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Task, User } from "@/types";

/** Supabase에 저장되어 있는 'tasks' 테이블 내에 있는 모든 데이터 조회 */
/** 전체 tasks 목록 조회 */
export const tasksAtom = atom<Task[]>([]);

/** 단일(개별) task 상태 */
export const taskAtom = atom<Task | null>(null);

/** 유저(User) 상태 */
export const userAtom = atomWithStorage<User | null>("user", null);

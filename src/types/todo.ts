// types/todo.ts
export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Todo {
    id: string;
    content: string;
    isCompleted: boolean;
    createdAt: Date;
    priority: Priority;
  }
// types/todo.ts
export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
export type SortType = 'priority' | 'created' | 'completed';

export interface Todo {
    id: string;
    content: string;
    isCompleted: boolean;
    createdAt: Date;
    priority: Priority;
  }
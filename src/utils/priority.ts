// src/utils/priority.ts
import { Priority } from '../types/todo';

export const getPriorityStyle = (priority: Priority) => {
  switch(priority) {
    case 'HIGH': return 'bg-red-100 text-red-700 hover:bg-red-200';
    case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
    case 'LOW': return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  }
};

export const getPriorityLabel = (priority: Priority) => {
  switch(priority) {
    case 'HIGH': return '높음';
    case 'MEDIUM': return '중간';
    case 'LOW': return '낮음';
  }
};
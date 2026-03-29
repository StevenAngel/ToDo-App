import { api } from "./index.ts";
import type { Todo, CreateTodo } from "@/types/todo.ts";

export const todoApi = {
    create: (todo: CreateTodo) => api.post<CreateTodo>(`/todos`),
    getAll: () => api.get<Todo[]>('/todos'),
    getById: (id: string) => api.get<Todo>(`/todos/${id}`),
    update: (id: string, todo: CreateTodo) => api.patch<CreateTodo>(`/todos/${id}`),
    delete: (id: string) => api.delete<Todo>(`/todos/${id}`)
}
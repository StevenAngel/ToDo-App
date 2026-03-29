import { api } from "./index.ts";
import type { Todo, CreateTodo, UpdateTodo } from "@/types/todo.ts";

export const todoApi = {
    create: (todo: CreateTodo) => api.post<CreateTodo>(`/todos`, todo),
    getAll: () => api.get<Todo[]>('/todos'),
    getById: (id: string) => api.get<Todo>(`/todos/${id}`),
    update: (id: string, todo: UpdateTodo) => api.patch<UpdateTodo>(`/todos/${id}`, todo),
    delete: (id: string) => api.delete<Todo>(`/todos/${id}`)
}
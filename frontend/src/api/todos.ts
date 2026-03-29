import { api } from "./index.ts";
import type { Todo, CreateTodo, UpdateTodo } from "@/types/todo.ts";

export const todoApi = {
    create: (todo: CreateTodo) => api.post<CreateTodo>(`/todos`, todo),
    getAll: (projectId: string) => api.get<Todo[]>(`/todos/project/${projectId}`),
    getById: (id: string) => api.get<Todo>(`/todos/${id}`),
    update: (id: string, todo: UpdateTodo) => api.patch<UpdateTodo>(`/todos/${id}`, todo),
    delete: (id: string) => api.delete<Todo>(`/todos/${id}`)
}
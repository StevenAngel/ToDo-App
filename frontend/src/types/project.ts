import type { Todo } from "./todo"

export interface Project {
    id: number
    title: string
    description?: string
    todos?: Todo[] // optional for lazy loading, wenn project geöffnet wird
}

export type CreateProject = Omit<Project, 'id'>
export type UpdateProject = Omit<Project, 'id' | 'todos'>
export interface Todo {
    id: number
    title: string
    description?: string
    priority: 'low' | 'medium' | 'high'
    deadline?: string
    tags: Array<string>
    isDone: boolean
    project?: string
    projectId?: number 
}

export type CreateTodo = Omit<Todo, 'id' | 'isDone'>
export type UpdateTodo = Omit<Todo, 'id' | 'project'>
export interface Todo {
    id: number
    title: string
    description?: string
    priority: 'low' | 'medium' | 'high'
    deadline?: string
    categories: Array<string>
    isDone: boolean
    project?: string
}

export type CreateTodo = Omit<Todo, 'id' | 'isDone'>
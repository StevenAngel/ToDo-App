export interface Todo {
    id: number
    title: string
    description?: string
    priority: 'low' | 'medium' | 'high'
    deadline?: Date
    isFinished: boolean
}
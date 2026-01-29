export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: Priority
  category: string
  completed: boolean
}

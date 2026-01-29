import type { ProgressMetric, Task } from '../types'
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  parseDate,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from './dateUtils'

const buildMetric = (label: string, tasks: Task[]) => {
  const completed = tasks.filter((task) => task.completed).length
  const total = tasks.length
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)
  return { label, completed, total, percentage }
}

const filterByRange = (tasks: Task[], start: Date, end: Date) =>
  tasks.filter((task) => {
    const due = parseDate(task.dueDate)
    return due >= start && due <= end
  })

export const getProgressMetrics = (tasks: Task[], reference = new Date()): ProgressMetric[] => {
  const todayStart = new Date(reference)
  todayStart.setHours(0, 0, 0, 0)
  const todayEnd = new Date(reference)
  todayEnd.setHours(23, 59, 59, 999)

  const todayTasks = filterByRange(tasks, todayStart, todayEnd)
  const weekTasks = filterByRange(tasks, startOfWeek(reference), endOfWeek(reference))
  const monthTasks = filterByRange(tasks, startOfMonth(reference), endOfMonth(reference))
  const yearTasks = filterByRange(tasks, startOfYear(reference), endOfYear(reference))

  return [
    buildMetric('Today', todayTasks),
    buildMetric('This Week', weekTasks),
    buildMetric('This Month', monthTasks),
    buildMetric('This Year', yearTasks),
  ]
}

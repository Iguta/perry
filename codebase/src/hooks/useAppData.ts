import { useEffect, useMemo, useState } from 'react'
import type { Category, Goal, Task } from '../types'
import { createId } from '../utils/idUtils'
import { formatDate } from '../utils/dateUtils'
import { loadData, saveData } from '../services/storageService'

const TASKS_KEY = 'perry_tasks'
const GOALS_KEY = 'perry_goals'
const TASK_CATEGORIES_KEY = 'perry_task_categories'
const GOAL_CATEGORIES_KEY = 'perry_goal_categories'

const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)

const defaultTaskCategories: Category[] = [
  { id: createId(), name: 'General' },
  { id: createId(), name: 'Focus' },
  { id: createId(), name: 'Health' },
  { id: createId(), name: 'Work' },
  { id: createId(), name: 'Learning' },
]

const defaultGoalCategories: Category[] = [
  { id: createId(), name: 'Personal' },
  { id: createId(), name: 'Career' },
  { id: createId(), name: 'Learning' },
  { id: createId(), name: 'Wellness' },
]

const defaultTasks: Task[] = [
  {
    id: createId(),
    title: 'Morning reflection',
    description: 'Write a 5-minute gratitude journal entry.',
    dueDate: formatDate(today),
    priority: 'medium',
    category: 'General',
    completed: false,
  },
  {
    id: createId(),
    title: 'Read 10 pages',
    description: 'Continue the current personal development book.',
    dueDate: formatDate(today),
    priority: 'low',
    category: 'Learning',
    completed: true,
  },
  {
    id: createId(),
    title: 'Strength training',
    description: '45-minute full body workout.',
    dueDate: formatDate(tomorrow),
    priority: 'high',
    category: 'Health',
    completed: false,
  },
]

const defaultGoals: Goal[] = [
  {
    id: createId(),
    title: 'Run a 10K',
    theme: 'Physical Fitness',
    category: 'Wellness',
    progress: 55,
  },
  {
    id: createId(),
    title: 'Complete React mastery course',
    theme: 'Academics',
    category: 'Learning',
    progress: 72,
  },
  {
    id: createId(),
    title: 'Meditate daily for 30 days',
    theme: 'Spiritual',
    category: 'Personal',
    progress: 30,
  },
]

const ensureCategory = (categories: Category[], name: string) =>
  categories.some((category) => category.name === name)
    ? categories
    : [...categories, { id: createId(), name }]

export const useAppData = () => {
  const [taskCategories, setTaskCategories] = useState<Category[]>(() =>
    loadData(TASK_CATEGORIES_KEY, defaultTaskCategories),
  )
  const [goalCategories, setGoalCategories] = useState<Category[]>(() =>
    loadData(GOAL_CATEGORIES_KEY, defaultGoalCategories),
  )
  const [tasks, setTasks] = useState<Task[]>(() =>
    loadData(TASKS_KEY, defaultTasks),
  )
  const [goals, setGoals] = useState<Goal[]>(() =>
    loadData(GOALS_KEY, defaultGoals),
  )

  useEffect(() => {
    saveData(TASKS_KEY, tasks)
  }, [tasks])

  useEffect(() => {
    saveData(GOALS_KEY, goals)
  }, [goals])

  useEffect(() => {
    saveData(TASK_CATEGORIES_KEY, taskCategories)
  }, [taskCategories])

  useEffect(() => {
    saveData(GOAL_CATEGORIES_KEY, goalCategories)
  }, [goalCategories])

  const taskCategoryNames = useMemo(
    () => taskCategories.map((category) => category.name),
    [taskCategories],
  )

  const goalCategoryNames = useMemo(
    () => goalCategories.map((category) => category.name),
    [goalCategories],
  )

  const addTask = (data: Omit<Task, 'id' | 'completed'>) => {
    setTasks((prev) => [
      {
        ...data,
        id: createId(),
        completed: false,
      },
      ...prev,
    ])
  }

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id'>>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    )
  }

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const addGoal = (data: Omit<Goal, 'id'>) => {
    setGoals((prev) => [{ ...data, id: createId() }, ...prev])
  }

  const updateGoal = (id: string, updates: Partial<Omit<Goal, 'id'>>) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal)),
    )
  }

  const removeGoal = (id: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
  }

  const addTaskCategory = (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    setTaskCategories((prev) => ensureCategory(prev, trimmed))
  }

  const removeTaskCategory = (name: string) => {
    const fallback = 'General'
    if (name === fallback) return
    setTaskCategories((prev) =>
      prev.filter((category) => category.name !== name),
    )
    setTasks((prev) =>
      prev.map((task) =>
        task.category === name ? { ...task, category: fallback } : task,
      ),
    )
  }

  const addGoalCategory = (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    setGoalCategories((prev) => ensureCategory(prev, trimmed))
  }

  const removeGoalCategory = (name: string) => {
    const fallback = 'Personal'
    if (name === fallback) return
    setGoalCategories((prev) =>
      prev.filter((category) => category.name !== name),
    )
    setGoals((prev) =>
      prev.map((goal) =>
        goal.category === name ? { ...goal, category: fallback } : goal,
      ),
    )
  }

  return {
    tasks,
    goals,
    taskCategories,
    goalCategories,
    taskCategoryNames,
    goalCategoryNames,
    addTask,
    updateTask,
    removeTask,
    toggleTask,
    addGoal,
    updateGoal,
    removeGoal,
    addTaskCategory,
    removeTaskCategory,
    addGoalCategory,
    removeGoalCategory,
  }
}

import { useState } from 'react'
import AppShell from './components/AppShell'
import CalendarPage from './pages/CalendarPage'
import DashboardPage from './pages/DashboardPage'
import GoalsPage from './pages/GoalsPage'
import TasksPage from './pages/TasksPage'
import { useAppData } from './hooks/useAppData'
import './App.css'

const pages = [
  {
    id: 'calendar',
    label: 'Calendar',
    icon: '🗓️',
    subtitle: 'Plan your days with clarity',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📈',
    subtitle: 'Track progress across horizons',
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: '✅',
    subtitle: 'Capture actions and priorities',
  },
  {
    id: 'goals',
    label: 'Goals',
    icon: '🎯',
    subtitle: 'Shape your long-term vision',
  },
]

function App() {
  const [activePage, setActivePage] = useState('calendar')
  const {
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
  } = useAppData()

  return (
    <AppShell pages={pages} activePage={activePage} onNavigate={setActivePage}>
      {activePage === 'calendar' && <CalendarPage tasks={tasks} />}
      {activePage === 'dashboard' && <DashboardPage tasks={tasks} goals={goals} />}
      {activePage === 'tasks' && (
        <TasksPage
          tasks={tasks}
          categories={taskCategories}
          categoryNames={taskCategoryNames}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onRemoveTask={removeTask}
          onToggleTask={toggleTask}
          onAddCategory={addTaskCategory}
          onRemoveCategory={removeTaskCategory}
        />
      )}
      {activePage === 'goals' && (
        <GoalsPage
          goals={goals}
          categories={goalCategories}
          categoryNames={goalCategoryNames}
          onAddGoal={addGoal}
          onUpdateGoal={updateGoal}
          onRemoveGoal={removeGoal}
          onAddCategory={addGoalCategory}
          onRemoveCategory={removeGoalCategory}
        />
      )}
    </AppShell>
  )
}

export default App

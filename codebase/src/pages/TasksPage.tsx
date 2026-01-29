import { useState } from 'react'
import type { Task } from '../types'
import SectionHeader from '../components/SectionHeader'
import TaskCard from '../components/TaskCard'
import CategoryManager from '../components/CategoryManager'

interface TasksPageProps {
  tasks: Task[]
  categories: { id: string; name: string }[]
  categoryNames: string[]
  onAddTask: (data: Omit<Task, 'id' | 'completed'>) => void
  onUpdateTask: (id: string, updates: Partial<Omit<Task, 'id'>>) => void
  onRemoveTask: (id: string) => void
  onToggleTask: (id: string) => void
  onAddCategory: (name: string) => void
  onRemoveCategory: (name: string) => void
}

const emptyForm: Omit<Task, 'id' | 'completed'> = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  category: 'General',
}

const TasksPage = ({
  tasks,
  categories,
  categoryNames,
  onAddTask,
  onUpdateTask,
  onRemoveTask,
  onToggleTask,
  onAddCategory,
  onRemoveCategory,
}: TasksPageProps) => {
  const [form, setForm] = useState({ ...emptyForm })
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!form.title.trim() || !form.dueDate) return
    if (editingId) {
      onUpdateTask(editingId, form)
    } else {
      onAddTask(form)
    }
    setForm({ ...emptyForm })
    setEditingId(null)
  }

  return (
    <div className="page-grid">
      <section className="card">
        <SectionHeader
          title={editingId ? 'Edit task' : 'Create a task'}
          description="Capture focus items with due dates and priority."
        />
        <div className="form-grid">
          <label className="field">
            Task title
            <input
              className="input"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="e.g. Finish weekly reflection"
            />
          </label>
          <label className="field">
            Description
            <textarea
              className="input input--textarea"
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              placeholder="Add context or next steps"
            />
          </label>
          <div className="form-row">
            <label className="field">
              Due date
              <input
                type="date"
                className="input"
                value={form.dueDate}
                onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
              />
            </label>
            <label className="field">
              Priority
              <select
                className="input"
                value={form.priority}
                onChange={(event) =>
                  setForm({ ...form, priority: event.target.value as Task['priority'] })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label className="field">
              Category
              <select
                className="input"
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value })}
              >
                {categoryNames.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" type="button" onClick={handleSubmit}>
              {editingId ? 'Save changes' : 'Add task'}
            </button>
            {editingId && (
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setForm({ ...emptyForm })
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="card">
        <SectionHeader
          title="Tasks"
          description="Stay on top of your priorities and keep momentum."
        />
        <div className="list-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onRemoveTask}
              onEdit={(item) => {
                setEditingId(item.id)
                setForm({
                  title: item.title,
                  description: item.description,
                  dueDate: item.dueDate,
                  priority: item.priority,
                  category: item.category,
                })
              }}
            />
          ))}
        </div>
      </section>

      <section className="card">
        <SectionHeader
          title="Task categories"
          description="Group tasks the way your life flows."
        />
        <CategoryManager
          title="Manage task categories"
          categories={categories}
          onAdd={onAddCategory}
          onRemove={onRemoveCategory}
        />
      </section>
    </div>
  )
}

export default TasksPage

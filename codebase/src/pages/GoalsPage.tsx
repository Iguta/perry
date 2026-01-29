import { useState } from 'react'
import type { Goal } from '../types'
import SectionHeader from '../components/SectionHeader'
import GoalCard from '../components/GoalCard'
import CategoryManager from '../components/CategoryManager'

interface GoalsPageProps {
  goals: Goal[]
  categories: { id: string; name: string }[]
  categoryNames: string[]
  onAddGoal: (data: Omit<Goal, 'id'>) => void
  onUpdateGoal: (id: string, updates: Partial<Omit<Goal, 'id'>>) => void
  onRemoveGoal: (id: string) => void
  onAddCategory: (name: string) => void
  onRemoveCategory: (name: string) => void
}

const emptyForm = {
  title: '',
  theme: 'Spiritual',
  category: 'Personal',
  progress: 0,
}

const themeSuggestions = ['Spiritual', 'Physical Fitness', 'Academics', 'Career']

const GoalsPage = ({
  goals,
  categories,
  categoryNames,
  onAddGoal,
  onUpdateGoal,
  onRemoveGoal,
  onAddCategory,
  onRemoveCategory,
}: GoalsPageProps) => {
  const [form, setForm] = useState({ ...emptyForm })
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!form.title.trim()) return
    const payload = { ...form, progress: Number(form.progress) }
    if (editingId) {
      onUpdateGoal(editingId, payload)
    } else {
      onAddGoal(payload)
    }
    setForm({ ...emptyForm })
    setEditingId(null)
  }

  return (
    <div className="page-grid">
      <section className="card">
        <SectionHeader
          title={editingId ? 'Edit goal' : 'Create a goal'}
          description="Define what matters and track your momentum."
        />
        <div className="form-grid">
          <label className="field">
            Goal title
            <input
              className="input"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="e.g. Publish portfolio case study"
            />
          </label>
          <div className="form-row">
            <label className="field">
              Theme
              <input
                list="goal-themes"
                className="input"
                value={form.theme}
                onChange={(event) => setForm({ ...form, theme: event.target.value })}
              />
              <datalist id="goal-themes">
                {themeSuggestions.map((theme) => (
                  <option key={theme} value={theme} />
                ))}
              </datalist>
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
          <label className="field">
            Progress ({form.progress}%)
            <input
              type="range"
              min="0"
              max="100"
              className="range"
              value={form.progress}
              onChange={(event) => setForm({ ...form, progress: Number(event.target.value) })}
            />
          </label>
          <div className="form-actions">
            <button className="btn btn-primary" type="button" onClick={handleSubmit}>
              {editingId ? 'Save changes' : 'Add goal'}
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
          title="Goals"
          description="Keep sight of the themes shaping your growth."
        />
        <div className="list-grid">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDelete={onRemoveGoal}
              onEdit={(item) => {
                setEditingId(item.id)
                setForm({
                  title: item.title,
                  theme: item.theme,
                  category: item.category,
                  progress: item.progress,
                })
              }}
            />
          ))}
        </div>
      </section>

      <section className="card">
        <SectionHeader
          title="Goal categories"
          description="Organize goals into personalized focus areas."
        />
        <CategoryManager
          title="Manage goal categories"
          categories={categories}
          onAdd={onAddCategory}
          onRemove={onRemoveCategory}
        />
      </section>
    </div>
  )
}

export default GoalsPage

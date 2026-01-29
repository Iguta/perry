import type { Goal } from '../types'

interface GoalCardProps {
  goal: Goal
  onEdit: (goal: Goal) => void
  onDelete: (id: string) => void
}

const GoalCard = ({ goal, onEdit, onDelete }: GoalCardProps) => {
  return (
    <div className="goal-card">
      <div className="goal-card__header">
        <div>
          <p className="goal-card__title">{goal.title}</p>
          <p className="goal-card__meta">
            {goal.theme} · {goal.category}
          </p>
        </div>
        <span className="goal-card__progress">{goal.progress}%</span>
      </div>
      <div className="goal-card__bar">
        <div className="goal-card__bar-fill" style={{ width: `${goal.progress}%` }} />
      </div>
      <div className="goal-card__actions">
        <button className="btn btn-secondary" onClick={() => onEdit(goal)} type="button">
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(goal.id)} type="button">
          Delete
        </button>
      </div>
    </div>
  )
}

export default GoalCard

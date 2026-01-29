import type { Task } from '../types'

interface TaskCardProps {
  task: Task
  onToggle: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

const TaskCard = ({ task, onToggle, onEdit, onDelete }: TaskCardProps) => {
  return (
    <div className={`task-card ${task.completed ? 'is-complete' : ''}`}>
      <div className="task-card__header">
        <div>
          <p className="task-card__title">{task.title}</p>
          <p className="task-card__meta">
            Due {task.dueDate} · {task.category}
          </p>
        </div>
        <span className={`priority priority--${task.priority}`}>
          {task.priority}
        </span>
      </div>
      <p className="task-card__description">{task.description}</p>
      <div className="task-card__actions">
        <button className="btn btn-ghost" onClick={() => onToggle(task.id)} type="button">
          {task.completed ? 'Mark active' : 'Mark complete'}
        </button>
        <button className="btn btn-secondary" onClick={() => onEdit(task)} type="button">
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)} type="button">
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard

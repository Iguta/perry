import type { Task } from '../types'

interface DayTasksPanelProps {
  dateLabel: string
  tasks: Task[]
}

const DayTasksPanel = ({ dateLabel, tasks }: DayTasksPanelProps) => {
  return (
    <div className="day-panel">
      <h3>{dateLabel}</h3>
      {tasks.length === 0 ? (
        <p className="empty-state">No tasks scheduled. Use the Tasks page to add one.</p>
      ) : (
        <div className="day-panel__list">
          {tasks.map((task) => (
            <div key={task.id} className="day-panel__item">
              <div>
                <p className="day-panel__title">{task.title}</p>
                <p className="day-panel__meta">{task.category} · {task.priority}</p>
              </div>
              <span className={`status-dot ${task.completed ? 'is-complete' : ''}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DayTasksPanel

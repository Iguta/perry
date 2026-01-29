import { getMonthGrid, isSameDay } from '../utils/dateUtils'
import type { Task } from '../types'

interface CalendarGridProps {
  activeMonth: Date
  selectedDate: Date
  tasks: Task[]
  onSelect: (date: Date) => void
}

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const CalendarGrid = ({ activeMonth, selectedDate, tasks, onSelect }: CalendarGridProps) => {
  const days = getMonthGrid(activeMonth)
  const month = activeMonth.getMonth()

  return (
    <div className="calendar">
      <div className="calendar__weekdays">
        {weekdayLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="calendar__grid">
        {days.map((day) => {
          const dayTasks = tasks.filter((task) => task.dueDate === day.toISOString().slice(0, 10))
          const isCurrentMonth = day.getMonth() === month
          const isSelected = isSameDay(day, selectedDate)

          return (
            <button
              key={day.toISOString()}
              className={`calendar__day ${isCurrentMonth ? '' : 'is-muted'} ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelect(day)}
              type="button"
            >
              <span className="calendar__date">{day.getDate()}</span>
              {dayTasks.length > 0 && (
                <span className="calendar__badge">{dayTasks.length}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarGrid

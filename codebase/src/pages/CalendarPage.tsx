import { useMemo, useState } from 'react'
import type { Task } from '../types'
import CalendarGrid from '../components/CalendarGrid'
import DayTasksPanel from '../components/DayTasksPanel'
import SectionHeader from '../components/SectionHeader'
import { formatDate, parseDate } from '../utils/dateUtils'

interface CalendarPageProps {
  tasks: Task[]
}

const CalendarPage = ({ tasks }: CalendarPageProps) => {
  const [activeMonth, setActiveMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const monthLabel = activeMonth.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  })

  const selectedLabel = selectedDate.toLocaleDateString('default', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const dayTasks = useMemo(
    () => tasks.filter((task) => task.dueDate === formatDate(selectedDate)),
    [tasks, selectedDate],
  )

  const moveMonth = (direction: number) => {
    const next = new Date(activeMonth)
    next.setMonth(activeMonth.getMonth() + direction)
    setActiveMonth(next)
  }

  return (
    <div className="page-grid page-grid--calendar">
      <section className="card">
        <SectionHeader
          title="Calendar"
          description="Visualize tasks by date and drill into your day."
          action={
            <div className="month-switch">
              <button className="btn btn-ghost" type="button" onClick={() => moveMonth(-1)}>
                ←
              </button>
              <span className="month-switch__label">{monthLabel}</span>
              <button className="btn btn-ghost" type="button" onClick={() => moveMonth(1)}>
                →
              </button>
            </div>
          }
        />
        <CalendarGrid
          activeMonth={activeMonth}
          selectedDate={selectedDate}
          tasks={tasks}
          onSelect={(date) => {
            setSelectedDate(date)
            if (date.getMonth() !== activeMonth.getMonth()) {
              setActiveMonth(parseDate(formatDate(date)))
            }
          }}
        />
      </section>

      <section className="card">
        <SectionHeader
          title="Day focus"
          description="Zoom into the selected day and stay aligned."
        />
        <DayTasksPanel dateLabel={selectedLabel} tasks={dayTasks} />
      </section>
    </div>
  )
}

export default CalendarPage

import { useMemo } from 'react'
import type { Goal, Task } from '../types'
import { getProgressMetrics } from '../utils/metricsUtils'
import SectionHeader from '../components/SectionHeader'
import StatCard from '../components/StatCard'
import ProgressRing from '../components/ProgressRing'

interface DashboardPageProps {
  tasks: Task[]
  goals: Goal[]
}

const DashboardPage = ({ tasks, goals }: DashboardPageProps) => {
  const metrics = useMemo(() => getProgressMetrics(tasks), [tasks])
  const completedTasks = tasks.filter((task) => task.completed).length
  const activeTasks = tasks.length - completedTasks

  return (
    <div className="page-grid">
      <section className="card">
        <SectionHeader
          title="Progress overview"
          description="Track how your daily actions move the needle across time horizons."
        />
        <div className="progress-grid">
          {metrics.map((metric) => (
            <ProgressRing
              key={metric.label}
              value={metric.percentage}
              label={metric.label}
              detail={`${metric.completed}/${metric.total} completed`}
            />
          ))}
        </div>
      </section>

      <section className="card">
        <SectionHeader
          title="Today at a glance"
          description="A quick snapshot of current workload and focus."
        />
        <div className="stat-grid">
          <StatCard label="Active tasks" value={`${activeTasks}`} helper="Ready to action" />
          <StatCard label="Completed" value={`${completedTasks}`} helper="Done so far" />
          <StatCard label="Goals" value={`${goals.length}`} helper="In motion" />
        </div>
      </section>
    </div>
  )
}

export default DashboardPage

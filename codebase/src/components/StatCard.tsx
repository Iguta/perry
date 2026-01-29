interface StatCardProps {
  label: string
  value: string
  helper: string
}

const StatCard = ({ label, value, helper }: StatCardProps) => {
  return (
    <div className="stat-card">
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__helper">{helper}</p>
    </div>
  )
}

export default StatCard

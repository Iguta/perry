interface ProgressRingProps {
  value: number
  label: string
  detail: string
}

const ProgressRing = ({ value, label, detail }: ProgressRingProps) => {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="progress-ring">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle
          className="progress-ring__track"
          strokeWidth="8"
          r={radius}
          cx="44"
          cy="44"
        />
        <circle
          className="progress-ring__value"
          strokeWidth="8"
          r={radius}
          cx="44"
          cy="44"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="progress-ring__content">
        <p className="progress-ring__value-text">{value}%</p>
        <p className="progress-ring__label">{label}</p>
        <p className="progress-ring__detail">{detail}</p>
      </div>
    </div>
  )
}

export default ProgressRing

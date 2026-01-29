import type { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

const SectionHeader = ({ title, description, action }: SectionHeaderProps) => {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        {description && <p className="section-subtitle">{description}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  )
}

export default SectionHeader

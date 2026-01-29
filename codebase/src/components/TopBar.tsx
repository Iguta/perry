interface TopBarProps {
  title: string
  subtitle: string
}

const TopBar = ({ title, subtitle }: TopBarProps) => {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{subtitle}</p>
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="topbar__actions">
        <div className="pill">Calm focus mode</div>
        <div className="pill pill--accent">Dark</div>
      </div>
    </header>
  )
}

export default TopBar

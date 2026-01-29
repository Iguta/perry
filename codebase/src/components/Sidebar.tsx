interface PageLink {
  id: string
  label: string
  icon: string
}

interface SidebarProps {
  pages: PageLink[]
  activePage: string
  onNavigate: (id: string) => void
}

const Sidebar = ({ pages, activePage, onNavigate }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="brand-mark">P</div>
        <div>
          <p className="brand-title">Perry</p>
          <p className="brand-subtitle">Goal & Task Tracker</p>
        </div>
      </div>
      <nav className="sidebar__nav">
        {pages.map((page) => (
          <button
            key={page.id}
            className={`sidebar__link ${activePage === page.id ? 'is-active' : ''}`}
            onClick={() => onNavigate(page.id)}
            type="button"
          >
            <span className="sidebar__icon" aria-hidden="true">
              {page.icon}
            </span>
            <span>{page.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar__footer">
        <div className="soft-card">
          <p className="soft-card__title">Daily Intention</p>
          <p className="soft-card__text">
            Build gentle momentum with the tasks that matter most.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

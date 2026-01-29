import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

interface PageLink {
  id: string
  label: string
  icon: string
  subtitle: string
}

interface AppShellProps {
  pages: PageLink[]
  activePage: string
  onNavigate: (id: string) => void
  children: ReactNode
}

const AppShell = ({ pages, activePage, onNavigate, children }: AppShellProps) => {
  const active = pages.find((page) => page.id === activePage) ?? pages[0]

  return (
    <div className="app-shell">
      <Sidebar pages={pages} activePage={activePage} onNavigate={onNavigate} />
      <main className="app-shell__main">
        <TopBar title={active.label} subtitle={active.subtitle} />
        <div className="app-shell__content">{children}</div>
      </main>
    </div>
  )
}

export default AppShell

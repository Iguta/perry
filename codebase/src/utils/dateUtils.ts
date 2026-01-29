const pad = (value: number) => value.toString().padStart(2, '0')

export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  return `${year}-${month}-${day}`
}

export const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, (month || 1) - 1, day || 1)
}

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

export const startOfWeek = (date: Date) => {
  const day = date.getDay()
  const diff = (day === 0 ? -6 : 1) - day
  const start = new Date(date)
  start.setDate(date.getDate() + diff)
  start.setHours(0, 0, 0, 0)
  return start
}

export const endOfWeek = (date: Date) => {
  const start = startOfWeek(date)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

export const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1)

export const endOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)

export const startOfYear = (date: Date) => new Date(date.getFullYear(), 0, 1)

export const endOfYear = (date: Date) =>
  new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999)

export const getMonthGrid = (date: Date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const grid: Date[] = []

  const startWeekDay = start.getDay()
  const lead = startWeekDay === 0 ? 6 : startWeekDay - 1
  for (let i = lead; i > 0; i -= 1) {
    const day = new Date(start)
    day.setDate(start.getDate() - i)
    grid.push(day)
  }

  for (let day = 1; day <= end.getDate(); day += 1) {
    grid.push(new Date(date.getFullYear(), date.getMonth(), day))
  }

  const trailing = 42 - grid.length
  for (let i = 1; i <= trailing; i += 1) {
    grid.push(new Date(date.getFullYear(), date.getMonth() + 1, i))
  }

  return grid
}

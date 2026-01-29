import { useState } from 'react'
import type { Category } from '../types'

interface CategoryManagerProps {
  title: string
  categories: Category[]
  onAdd: (name: string) => void
  onRemove: (name: string) => void
}

const CategoryManager = ({ title, categories, onAdd, onRemove }: CategoryManagerProps) => {
  const [value, setValue] = useState('')

  return (
    <div className="category-manager">
      <div className="category-manager__header">
        <p className="category-manager__title">{title}</p>
        <div className="category-manager__input">
          <input
            className="input"
            placeholder="Add category"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              onAdd(value)
              setValue('')
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="category-manager__list">
        {categories.map((category) => (
          <div key={category.id} className="category-pill">
            <span>{category.name}</span>
            <button type="button" onClick={() => onRemove(category.name)} aria-label={`Remove ${category.name}`}>
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryManager

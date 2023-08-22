import { ChangeEvent, FC, useState } from 'react'
import { useDebounce } from '../../utils'

type SearchBarProps = {
  onSearch: (_: string) => void
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('')
  const { debounce } = useDebounce()

  const onSearchChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value)
    debounce(onSearch, 500)(value)
  }

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="search"
        value={search}
        placeholder="Search..."
        onChange={onSearchChange}
      />
      {!search && <span className="material-symbols-outlined search-bar__icon">search</span>}
    </div>
  )
}

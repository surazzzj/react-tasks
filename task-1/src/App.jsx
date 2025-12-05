// Search Filter

import { useState } from 'react'
import data from '../src/assets/asset'
import '../src/App.css'

const SearchFilter = () => {

  const [query, setQuery] = useState("");

  const filtered = data.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input type="text"
        placeholder='Search...'
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.map((item,idx) => (
        <p key={idx}>{item}</p>
      ))}
    </div>
  )
}

export default SearchFilter
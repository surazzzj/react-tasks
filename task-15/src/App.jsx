import { useState } from "react"

const arr = ["Play cricket", "Play Video game", "Read book"];

const App = () => {
  const [arrCopy, setArrCopy] = useState(arr);
  const [selected, setSelected] = useState(null);

  const handleDelete = (value) => {
    const filtered = arrCopy.filter((item) => item !== value)
    setArrCopy(filtered);
    setSelected(null);
  }

  const handleCheckbox = (value) => {
    setSelected(value);
  }

  return (
    <div>
      <ul>
        {
          arrCopy.map((item) => (
            <li key={item}>
              <input onChange={() => handleCheckbox(item)} checked={selected === item} type="checkbox" />
              {item}
              {selected === item && (<button onClick={() => handleDelete(item)}>delete</button>)}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
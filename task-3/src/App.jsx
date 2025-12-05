// Toggle Password Visibility

import { useState } from 'react'
import '../src/App.css'

const PasswordToggle = () => {

  const [show, setShow] = useState(false);
  const [pw, setPw] = useState("");

  return (
    <div>
      <input type={show ? "text" : "password"}
        value={pw}
        placeholder='Enter Password'
        onChange={(e) => setPw(e.target.value)} />

      <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
      <p>Length: {pw.length}</p>
    </div>
  )
}

export default PasswordToggle

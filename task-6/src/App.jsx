import { useReducer } from 'react'
import '../src/App.css'

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "Inc": return state + 1;
    case "Dec": return state - 1;
    case "Reset": return 0;
    default: return state;
  }
}

const ReducerCounter = () => {

  const [count, dispatch] = useReducer(reducerFunction, 0);

  return (
    <div id='main'>
      <h4>Counter: {count}</h4>
      <div>
        <button onClick={() => dispatch({ type: "Inc" })}>+</button>
        <button onClick={() => dispatch({ type: "Dec" })}>-</button>
        <button onClick={() => dispatch({ type: "Reset" })}>Reset</button>
      </div>
    </div>
  )
}

export default ReducerCounter
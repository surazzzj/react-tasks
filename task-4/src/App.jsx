import { useEffect, useState } from 'react'
import '../src/App.css'

const App = () => {
  const [getUsers, setGetUsers] = useState([]);

  const fetchData = async () => {
    const url = "https://dummyjson.com/users";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.users);
    setGetUsers(data.users);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <h3>Users:</h3>

      <div id='main'>
        {getUsers.map((user, idx) => (
          <div id='main2' key={idx}>
            <img src={user.image} alt="" />
            <div>
              <p>{user.username}</p>
              <p>{user.age}</p>
              <p>{user.gender}</p>
              <p>{user.company.name}</p>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App
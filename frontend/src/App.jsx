import { useState } from 'react'

import './App.css'

const API_URL = 'http://localhost:5001';

function App() {
  const [Data, setData] = useState([])

  const handleGetData = async () => {
    const response = await fetch(`${API_URL}/getdata`);
    const data = await response.json();
    setData(data);
  }

  return (
    <>
      <section id="insert">
        <h1>Insert</h1>
        <input type="text" id='name' placeholder='Enter name' />
        <input type="text" id="age" placeholder='Enter age' />
        <button onClick={async () => {
          const name = document.getElementById('name').value;
          const age = document.getElementById('age').value;
          await fetch(`${API_URL}/insertdata`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age })
          })
          alert('Data inserted successfully');
        }}>Insert</button>
      </section>

      <section id="get">
        <button onClick={handleGetData}>Get Data</button>
        { 
        
          Data.length > 0?<div>
            <h1>Data:</h1>
            <div>{JSON.stringify(Data, null, 2)}</div>
          </div>:<h2>No data available</h2>
        }
      </section>

      <section id="update">
        <h1>Update Age</h1>
        <input type="text" id='updateName' placeholder='Enter name' />
        <input type="text" id="updateAge" placeholder='Enter new age' />
        <button onClick={async () => {
          const name = document.getElementById('updateName').value;
          const age = document.getElementById('updateAge').value;
          await fetch(`${API_URL}/updateAge/${name}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ age })
          })
          alert('Age updated successfully');
        }}>Update Age</button>
      </section>

      <section id="delete">
        <h1>Delete User</h1>
        <input type="text" id='deleteName' placeholder='Enter name' />
        <button onClick={async () => {
          const name = document.getElementById('deleteName').value;
          await fetch(`${API_URL}/delete/${name}`, {
            method: 'DELETE'
          })
          alert('User deleted successfully');
        }}>Delete User</button>
      </section>

    </>
  )
}

export default App

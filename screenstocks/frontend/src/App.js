import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'


function App() {
  const hello = 'Hello, World'
  const [data, setData] = useState([])

  useEffect(() => {
    async function getData() {
      await fetch("http://127.0.0.1:8000/api/lookup/rel")
      .then(response => response.json())
      .then(res => {
        console.log(res)
        setData(res)
      })
    }
    getData()
  }, [])

  return (
    <>
     <SearchBar />
    </>
  );
}

export default App;

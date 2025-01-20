import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [users,setUsers]=useState([])
  useEffect(()=>{
	

fetch('https://randomuser.me/api?results=100') 
		.then(async response=> await response.json())
		.then(response=>{setUsers(response.results)})
		.catch(err=>{
		  console.error(err)})
  }, [])

  return (
    <>
      <h1>Prueba Técnica</h1>
      {JSON.stringify(users)}
    </>
  );
}
export default App;

import { useEffect, useMemo, useRef, useState } from "react"
import "./App.css";
import { UsersList } from "./componentes/UsersList";
import { SortBay, User } from "./assets/typesParseados";


function fetchUsers(pagina:number){
  return fetch(`https://randomuser.me/api?results=8&seed=enio&page=${pagina}`) 
		.then(async response=> {
      if (!response.ok) throw new Error('Error en el FETCH')
      return await response.json()})

}


function App() {
  const [users,setUsers]=useState<User[]>([])   
  const [colorGrid,setColorGrid]=useState(false)
  const [sorting,setSorting]=useState<SortBay>(SortBay.NONE)
  const originalUsers= useRef<User[]>([])
  const [filtraPais,setFiltraPais]=useState<string|null>(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)
  const [pagina,setPagina]=useState(1)

  const toggleColor = () =>{
    setColorGrid(!colorGrid)
  }
  const toggleOrdenarPais = () =>{
    const newSortingValue = sorting===SortBay.NONE ? SortBay.COUNTRY : SortBay.NONE
    setSorting(newSortingValue)
  }
  useEffect(()=>{
    setLoading(true)
    setError(false)
    fetchUsers(pagina)
  	.then(response=>{
      setUsers(prevUsers=>{
        const newUsuarios = prevUsers.concat(response.results)
        originalUsers.current=newUsuarios
        return newUsuarios
      })})
		.catch(err=>{
		  console.error(err)
      setError(true)
    })
   .finally(()=>setLoading(false))
 
  }, [pagina])

  const eliminarUsuario = (email:string) => {
    const usuariosFiltradosAeliminar = users.filter(user=>user.email!==email)
    setUsers(usuariosFiltradosAeliminar)
  }
  const setearEstadoInicial = () =>{
    setUsers(originalUsers.current)
  }
  
  const usuariosFiltrados = useMemo(()=>{
  return  filtraPais !== null && filtraPais.length> 0
      ?   users.filter(user=> {
        return user.location.country.toLowerCase().includes(filtraPais.toLowerCase())})
      :   users
      },[filtraPais,users])
  
  const usersOrdenado = useMemo(()=>{ 
    if (sorting === SortBay.NONE) return usuariosFiltrados
    if (sorting === SortBay.COUNTRY) {
      return usuariosFiltrados.toSorted((a,b)=> a.location.country.localeCompare(b.location.country))}
    if (sorting === SortBay.NAME) {
        return usuariosFiltrados.toSorted((a,b)=> a.name.first.localeCompare(b.name.first))}
    if (sorting === SortBay.LASTNAME) {
          return usuariosFiltrados.toSorted((a,b)=> a.name.last.localeCompare(b.name.last))}
    },[sorting,usuariosFiltrados])   

  const changeSortBay = (sortBy:SortBay) =>{
        setSorting(sortBy)
  }        

  return (
    <div className="App">
      <h1>Prueba Técnica</h1>
      <header>
        <button onClick={toggleColor}>
          Cambia de color
        </button>
        <button onClick={toggleOrdenarPais}>
          {sorting ===SortBay.COUNTRY ? 'No Ordenar x Pais' :  'Ordenar x Pais' }
        </button>
        <button onClick={setearEstadoInicial}>
          Volver Lista Inicial
        </button>
        <input 
          type="text" 
          onChange={(e)=>{
            setFiltraPais(e.target.value)
            console.log(filtraPais)
          }}
          placeholder="Filtrar por País"
        />
      </header>
      <main>
        {users.length > 0 && !loading && !error &&  
        <>
          <UsersList  changeSortBay={changeSortBay} eliminarUsuario={eliminarUsuario} colorGrid={colorGrid} usuarios={usersOrdenado} />
          <button onClick={()=>{setPagina(pagina+1)}}>
            Cargar más resultados
          </button>
        </>
        }
        {loading && <p>Cargando...</p>}
        {error && <p>Error en la carga {error} </p>}
        {users.length === 0 && !loading && !error && <p>No hay usuarios</p>}
      </main>
    </div>
  );
}
export default App;

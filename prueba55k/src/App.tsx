import {  useMemo,  useState } from "react"
import "./App.css";
import { UsersList } from "./componentes/UsersList";
import { SortBay, type User } from "./assets/typesParseados";
import {  useQuery } from "@tanstack/react-query";

const fetchUsers =  async (page:number)=>{
  const response = await fetch(`https://randomuser.me/api?results=8&seed=enio&page=${page}`);
  if (!response.ok) throw new Error('Error en el FETCH');
  const response_1 = await  response.json();
  return {
    response: response_1.results,
  };
}

function App() {
  const {isLoading, isError, data = [] ,  refetch }= useQuery<User[]>({
    queryKey: ['usuarios'],
    queryFn: () => fetchUsers(1),
  })

  console.log('data...:',data)    
  console.log('usuarios...:',users)


  const [colorGrid,setColorGrid]=useState(false)
  const [sorting,setSorting]=useState<SortBay>(SortBay.NONE)
  const [filtraPais,setFiltraPais]=useState<string|null>(null)


  const toggleColor = () =>{
    setColorGrid(!colorGrid)
  }
  const toggleOrdenarPais = () =>{
    const newSortingValue = sorting===SortBay.NONE ? SortBay.COUNTRY : SortBay.NONE
    setSorting(newSortingValue)
  }
  const eliminarUsuario = () => {
  //  const usuariosFiltradosAeliminar = users.filter(user=>user.email!==email)
  //  setUsers(usuariosFiltradosAeliminar)
  }
  const setearEstadoInicial = () =>{
    refetch()
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
        {users.length > 0 && !isLoading && !isError &&  
        <>
          <UsersList  changeSortBay={changeSortBay} eliminarUsuario={eliminarUsuario} colorGrid={colorGrid} usuarios={usersOrdenado} />
          <button onClick={()=>{fetchNextPage()}}>
            Cargar más resultados
          </button>
        </>
        }
        {isLoading && <p>Cargando...</p>}
        {isError && <p>Error en la carga {isError} </p>}
        {users.length > 0 && !isLoading && !isError && <p>No hay usuarios</p>}
      </main>
    </div>
  );
}
export default App;



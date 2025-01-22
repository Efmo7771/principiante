import {SortBay, type User,  } from "../assets/typesParseados";

interface Props {
    changeSortBay: (sortBy:SortBay)=>void
    eliminarUsuario: (email:string)=>void
    colorGrid: boolean,
    usuarios: User[] | undefined,
}
export function UsersList ({ changeSortBay, eliminarUsuario, colorGrid, usuarios,}:Props){
    
    return(
        <table width='100%'>
            <thead>
                <tr>
                    <th>FOTO</th>
                    <th onClick={()=>changeSortBay(SortBay.NAME)}>NOMBRE</th>
                    <th onClick={()=>changeSortBay(SortBay.LASTNAME)}>APELLLIDO</th>
                    <th onClick={()=>changeSortBay(SortBay.COUNTRY)}>PAIS</th>
                    <th>ACCIONES</th>
                </tr>
            </thead>
            <tbody>
            {usuarios?.map((user, index)  =>{
                const backgroundColor = index % 2 === 0 ? '#333' : '#555'
                const color = colorGrid ? backgroundColor  : 'transparent'
                return (
                    <tr key={user.email} style={{backgroundColor:color}}>
                        <td>
                            <img style={{borderRadius:"50%"}}  src={user.picture.thumbnail} alt={user.name.first}/>
                        </td>
                        <td>
                            {user.name.first}
                        </td>
                        <td>
                            {user.name.last}
                        </td>
                        <td>
                            {user.location.country} 
                        </td>
                        <td>
                            <button onClick={()=>eliminarUsuario(user.email)}>
                                BORRAR
                            </button>
                        </td>
                    </tr>
                )}
            )}
            </tbody>
        </table>
    )
}
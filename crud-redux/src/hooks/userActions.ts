import { useAppDispatch } from "../hooks/store"  // Se creo a partir de useSelector para definir su tipo (store.ts)  
import { addNewUser, deleteUserById, User, UserId } from "../store/users/slice"

export function userActions() {
    const dispatch = useAppDispatch()
    const addUser = ({ name, email, github }:User) => {
        dispatch(addNewUser({ name, email, github }))
    }
    const handleRemoveUser = (id: UserId) => {
        dispatch(deleteUserById(id))
    }

    return {
        handleRemoveUser,
        addUser
    }
}
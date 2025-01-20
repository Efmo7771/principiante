import { configureStore, PayloadAction, type Middleware } from "@reduxjs/toolkit";
import usersReducer, { rollbackUser } from "./users/slice";
import { toast } from "sonner";
import { UserWithId } from "./users/slice";

const persisteLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    next(action)
    localStorage.setItem("__redux_state__", JSON.stringify(store.getState()))

}
const syncDataMiddleware: Middleware = store => next => action => {
    const { type, payload } = action as PayloadAction<string>
    const previousState=store.getState()
    next(action)
    if (type === 'users/deleteUserById') {
        const userIdToRemove = payload
        const userToRemove = previousState.users.find((user:UserWithId) => user.id === userIdToRemove)
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(res => {
                if (res.ok) {
                    toast.success(`Usuario ${userIdToRemove} eliminado correctamente`)
                }
            })
            .catch(err => {
                console.log(err)
                console.log('error')
                if (userToRemove) store.dispatch(rollbackUser(userToRemove))
                toast.error(`Usuario ${userIdToRemove} no fue eliminado `)
            })
    }
}


export const store = configureStore({
    reducer: {
        users: usersReducer, // users es el nombre que se usará donde se necesite
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persisteLocalStorageMiddleware, syncDataMiddleware)
})

export type RootState = ReturnType<typeof store.getState> // getState y dispatch son propiedades del Store
export type AppDispatch = typeof store.dispatch
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserId = string

export interface User {   // Nombre de Interface siempre en Mayúscula
    name: string,
    email: string,
    github: string
}
export interface UserWithId extends User {
    id: UserId;
}

const DEFAULT_STATE =
    [
        {
            id: "1",
            name: "Peter McCrown",
            email: "peter@gmail.com",
            github: "@peter"
        },
        {
            id: "2",
            name: "Jon Mueller",
            email: "jhonr@gmail.com",
            github: "@jhon"
        },
        {
            id: "3",
            name: "Peter Federer",
            email: "peterfe@gmail.com",
            github: "@peterfederer"
        },
        {
            id: "4",
            name: "Maxime Bujet",
            email: "maxime@gmail.com",
            github: "@maxime"
        },
        {
            id: "5",
            name: "Emma Nelly",
            email: "emma@gmail.com",
            github: "@emma"
        },
    ]


const initialState: UserWithId[] = (() => {
    const persisteLsState = localStorage.getItem("__redux_state__",)
    if (Array.isArray(persisteLsState)) { return JSON.parse(persisteLsState).users }
    return DEFAULT_STATE
})()

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            return [...state, { id, ...action.payload }]
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload
            return state.filter((user) => user.id !== id)

        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUser = state.some(user => user.id === action.payload.id)
            if (!isUser) {
                return [...state, action.payload]
            }
        }
    }
})

export default usersSlice.reducer
export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions // reducer y action son propiedades del Slice
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveCurrentUser: (state, action) => {
            state.user = action.payload
        },
        removeCurrentUser: (state) => {
            state.user = {}
        },
    },
})

export const { saveCurrentUser, removeCurrentUser } = authSlice.actions

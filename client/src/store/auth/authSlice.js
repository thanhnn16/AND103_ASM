import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveCurrentUser: (state, action) => {
            const user = action.payload;
            if (user.password) {
                delete user.password;
            }
            state.user = user;
            console.log('Saved user to state', state.user);
        },
        removeCurrentUser: (state) => {
            state.user = {}
            console.log('Removed user from state');
        },
    },
})

export const { saveCurrentUser, removeCurrentUser } = authSlice.actions

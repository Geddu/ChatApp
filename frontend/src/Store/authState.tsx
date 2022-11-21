import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Auth {
    token: string,
    id: number,
    username: string,
    tabSelection: number
}

const initialState: Auth = {
    token: '',
    id: 0,
    username: '',
    tabSelection: 0
}

export const authState = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        saveToken: (state, action: PayloadAction<Auth>) => {
            state.token = action.payload.token
            state.id = action.payload.id
            state.username = action.payload.username
        },
        changeTab: (state, action: PayloadAction<number>) => {
            state.tabSelection = action.payload
        },
        resetAuthState: () => {
            return initialState
        },
    },
})

// Action creators are generated for each case reducer function
export const { saveToken, changeTab, resetAuthState } = authState.actions

// Other code such as selectors can use the imported `RootState` type
// export const getAuthState = (state: RootState) => state.authState


export default authState.reducer
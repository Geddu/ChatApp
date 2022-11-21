import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Toast {
    open: boolean,
    content: string,
}

const initialState: Toast = {
    open: false,
    content: '',
}

export const toastState = createSlice({
    name: 'toastState',
    initialState,
    reducers: {
        handleOpen: (state, action: PayloadAction<string>) => {
            state.open = true
            state.content = action.payload
        },
        handleClose: (state) => {
            state.open = false
            state.content = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const { handleOpen, handleClose } = toastState.actions

// Other code such as selectors can use the imported `RootState` type
// export const getAuthState = (state: RootState) => state.authState


export default toastState.reducer
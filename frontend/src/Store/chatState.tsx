import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { toSvg } from 'jdenticon'

export interface SelectedThread {
    index: number | undefined,
    id: number,
    name: string
}
export interface Chat {
    threadSelection: SelectedThread | undefined,
    creatingThread: boolean
}

const initialState: Chat = {
    threadSelection: undefined,
    creatingThread: false,
}

export const chatState = createSlice({
    name: 'chatState',
    initialState,
    reducers: {
        selectThread: (state, action: PayloadAction<SelectedThread>) => {
            state.threadSelection = action.payload
        },
        creatingThread: (state, action: PayloadAction<boolean>) => {
            state.creatingThread = action.payload
        },
        resetChatState: () => {
            return initialState
        },
    },
})

// Action creators are generated for each case reducer function
export const { selectThread, creatingThread, resetChatState } = chatState.actions

// Other code such as selectors can use the imported `RootState` type
// export const getAuthState = (state: RootState) => state.authState


export default chatState.reducer
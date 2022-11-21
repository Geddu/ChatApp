import { configureStore } from "@reduxjs/toolkit"
import authState from './authState'
import chatApi from "./chatApi"
import chatState from "./chatState"
import toastState from "./toastState"

export const store = configureStore({
    reducer: {
        authState: authState,
        chatState: chatState,
        toastState: toastState,
        [chatApi.reducerPath]: chatApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(chatApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<
    typeof store.getState
>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

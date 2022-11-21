import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { changeTab, saveToken } from './authState'
import { selectThread } from './chatState';
import { handleOpen } from './toastState';

export interface RegisterParams {
    username: string | undefined;
    password: string | undefined;
    passwordConfirm: string | undefined;
}

export interface LoginParams {
    username: string | undefined;
    password: string | undefined;
}

export interface AuthValues {
    token: string,
    id: number,
    username: string,
    tabSelection: number,
}

export interface Thread {
    id: number,
    name: string,
}

type ThreadResponse = Thread[];

export interface MakeThread {
    token: string,
    name: string,
    participantId: number
}

export interface AuthError {
    error: {
        data: string,
        error: string,
        originalStatus: number,
        status: string
    }
}

export interface Messages {
    token: string,
    threadId: number,
    messageContent?: string,
}

export interface Message {
    id: number,
    content: string,
    sender: number,
    threadId: number,
    createdAt: string,
    updatedAt: string,
    user: {
        id: number,
        username: string
    },
    thread: {
        id: number,
        name: string
    }
}


const blueforsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    tagTypes: ['Thread', 'Message'],
    endpoints: (builder) => ({

        // REGISTER
        register: builder.mutation<void, RegisterParams>({
            query: ({ username, password, passwordConfirm }) => ({
                url: `/auth/register`,
                method: 'POST',
                body: {
                    username: username,
                    password: password,
                    passwordConfirm: passwordConfirm
                },
            }),
            async onQueryStarted (id, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                console.log('Signing up...')
                try {
                    await queryFulfilled
                    dispatch(changeTab(1))
                } catch (err) {
                    console.log('error Signing in: ')
                    dispatch(handleOpen(`Error Logging signing up`))
                    console.log(err)
                    dispatch(changeTab(0))
                }
            }
        }),

        // LOGIN
        login: builder.mutation<AuthValues, LoginParams>({
            query: ({ username, password }) => ({
                url: `/auth/login`,
                method: 'POST',
                body: {
                    username: username,
                    password: password
                },
            }),
            async onQueryStarted (id, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                console.log('Logging in...')
                try {
                    const { data } = await queryFulfilled
                    // `onSuccess` side-effect
                    console.log('loggend in: ' + data.username)
                    dispatch(saveToken({ ...data, tabSelection: 0 }))
                } catch (err) {
                    // `onError` side-effect
                    console.log('error logging in: ' + err)
                    dispatch(handleOpen(`Error Logging in`))
                }
            },
        }),

        // GET USERS
        users: builder.query<AuthValues[], string>({
            query: (token) => ({
                url: `/users`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                },
            }),
        }),

        // GET Threads
        threads: builder.query<ThreadResponse, string>({
            query: (token) => ({
                url: `/threads`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                },
            }),
            providesTags: ['Thread']
        }),

        // Make a Thread
        addThread: builder.mutation<Thread, MakeThread>({
            query: ({ token, name, participantId }) => ({
                url: `/threads`,
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token
                },
                body: {
                    name: name,
                    participantId: participantId
                }
            }),
            invalidatesTags: ['Thread'],
            async onQueryStarted (makeThreadValues, { dispatch, queryFulfilled }) {
                // `onStart` side-effect
                console.log('Making a Thread...')
                try {
                    const { data } = await queryFulfilled
                    console.log('Thread Made!')
                    dispatch(selectThread({
                        id: data.id,
                        name: data.name,
                        index: undefined,
                    }))
                } catch (err) {
                    console.log('Error while Making a Thread: ')
                    console.log(err)
                    dispatch(handleOpen(`Error while Making a Thread`))
                }
            }
        }),

        // GET Messages
        messages: builder.query<Message[], Messages>({
            query: ({ token, threadId }) => ({
                url: `/threads/${threadId}/messages`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                },
            }),
            providesTags: ['Message']
        }),

        // POST Messages
        sendMessage: builder.mutation<Message, Messages>({
            query: ({ token, threadId, messageContent }) => ({
                url: `/threads/${threadId}/messages`,
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token
                },
                body: {
                    content: messageContent
                },
            }),
            invalidatesTags: ['Message']
        }),
        // Refresh Messages
        refreshMessages: builder.mutation<Message[], Messages>({
            query: ({ token, threadId }) => ({
                url: `/threads/${threadId}/messages`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                },
            }),
            invalidatesTags: ['Message']
        }),

    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useUsersQuery,
    useThreadsQuery,
    useAddThreadMutation,
    useMessagesQuery,
    useSendMessageMutation,
    useRefreshMessagesMutation,
} = blueforsApi

export default blueforsApi
import { Avatar, Grid, List, ListItem, Typography } from "@mui/material"
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import carloya from '../Assets/carayola.json'
import { Auth } from "../Store/authState";
import { io } from "socket.io-client";
import { useAppSelector } from "../Store/hooks";
import { useMessagesQuery, useRefreshMessagesMutation } from "../Store/chatApi";
import React, { useEffect } from "react";

const GetColor = (id: number) => {
    if (carloya.length <= id) {
        // Just to make sure we wont get an error even if we have a whole bunch of users
        return carloya[Math.floor(Math.random() * carloya.length - 1)].hex
    }
    return carloya[id].hex
}


const ChatList = ({ authState }: { authState: Auth }) => {
    
    const chatState = useAppSelector((state) => state.chatState)
    const [refreshMessages] = useRefreshMessagesMutation();
    const { data: messages } = useMessagesQuery(chatState.threadSelection !== undefined 
        ? { token: authState.token, threadId: chatState.threadSelection.id } 
        : { token: authState.token, threadId: 0 })

    // Socket.io Connection
    useEffect(() => {
        if (chatState.threadSelection !== undefined) {
            const socket = io("http://localhost:8000", {
                reconnectionDelay: 10000,
                path: "/socket", // <--- HOW WAS THIS NOT METIONED IN ANY OF THE EXAPLES?!?! 
                query: {
                    thread: chatState.threadSelection.id
                }
            });
            socket.onAny((event, ...args) => {
                console.log(event, args);
            });
            socket.on('message', (...args) => {
                console.log("Message recieved:")
                console.log(args);
                refreshMessages({ 
                    token: authState.token,
                    threadId: chatState.threadSelection !== undefined ? chatState.threadSelection.id : 0 
                })
            });
        }
    }, [chatState]);

    useEffect(() => {
        let objDiv = document.getElementById("chat-container");
        if (objDiv !== null) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }, [messages])
    

    return (
        <Grid id="chat-container" item xs sx={{ overflow: 'auto', maxHeight: 'inherit' }}>
            <List id="chatList" sx={{
                width: '100%',
                paddingLeft: '16px',
                maxHeight: 'inherit',
            }}>
                {messages !== undefined ? (messages.map((message) => (
                    <ListItem key={`Message-${message.id}-${message.createdAt}`} alignItems="flex-start" sx={message.sender === authState.id
                        ? { textAlign: 'end' }
                        : { textAlign: 'start' }}>
                        {message.sender !== authState.id && (
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: GetColor(message.user.id) }} aria-label="recipe">
                                    {authState.username.charAt(0)}
                                </Avatar>
                            </ListItemAvatar>
                        )}
                        <ListItemText
                            primary={
                                message.sender !== authState.id ? (
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline', fontWeight: 600 }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {message.user.username}
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'inline', fontWeight: 400 }}
                                            variant="subtitle2"
                                            color="text.secondary">
                                            {" - " + new Date(message.createdAt).toLocaleDateString("fi-FI")}
                                        </Typography>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline', fontWeight: 400 }}
                                            variant="subtitle2"
                                            color="text.secondary">
                                            {new Date(message.createdAt).toLocaleDateString("fi-FI") + " - "}
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'inline', fontWeight: 600 }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {message.user.username}
                                        </Typography>
                                    </React.Fragment>
                                )

                            }
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body1"
                                    >
                                        {message.content}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                        {message.sender === authState.id && (
                            <ListItemAvatar sx={{ marginLeft: '16px' }}>
                                <Avatar sx={{ bgcolor: GetColor(message.user.id) }} aria-label="recipe">
                                    {authState.username.charAt(0)}
                                </Avatar>
                            </ListItemAvatar>
                        )}
                    </ListItem>
                ))) : ('')}

            </List>
        </Grid>
    )
}

export default ChatList
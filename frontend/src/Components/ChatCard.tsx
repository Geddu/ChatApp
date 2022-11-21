import { Card, CardHeader, Avatar, IconButton, CardContent, Typography, Divider, styled, Grid, CardActions, TextField, Button } from "@mui/material"
import RandomIcon from "./RandomIcon";
import { useSendMessageMutation, useThreadsQuery } from "../Store/chatApi";
import { useAppSelector } from "../Store/hooks";
import { Auth } from "../Store/authState";
import picture from "../Assets/GedChat.svg"
import SendIcon from '@mui/icons-material/Send';
import ChatList from "./ChatList";
import { useState } from "react";

const ChatInputField = styled(TextField)((theme) => ({
    width: '100%',
    paddingRight: '16px',
    '& .MuiInputBase-input': {
        padding: '10.5px 16px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '20px',
    },
}));

const SendButton = styled(Button)({
    borderRadius: '20px'
});

const GedChat = styled('img')({
    height: 300,
});

const ChatCard = ({ authState }: { authState: Auth }) => {
    const chatState = useAppSelector((state) => state.chatState)
    const [messageContent, setMessageContent] = useState('')
    const [sendMessage] = useSendMessageMutation();

    const handleMessageContentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessageContent(event.target.value);
    };

    return (
        <Card sx={{ height: '100%', borderRadius: '0px 20px 20px 0px' }}>
            {chatState.threadSelection !== undefined ? (
                <>
                    <CardHeader
                        avatar={
                            <RandomIcon name={chatState.threadSelection.name} />
                        }
                        title={<Typography variant="h5">{chatState.threadSelection.name}</Typography>}
                        subheader={<Typography variant="body2">ID: {chatState.threadSelection.id}</Typography>}
                    />
                    <Divider />
                    <Grid container direction="column" sx={{ height: 'calc(100% - 85px)' }}>
                        <Grid id="chat-container" item xs sx={{ overflow: 'auto', maxHeight: 'inherit' }}>
                            <ChatList authState={authState} />
                        </Grid>
                        <Grid item p={2}>
                            <Grid container>
                                <Grid item xs>
                                    <ChatInputField
                                        id="outlined-basic"
                                        autoComplete="off"
                                        variant="outlined"
                                        value={messageContent}
                                        onChange={(event) => handleMessageContentChange(event)} 
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                if (chatState.threadSelection !== undefined) {
                                                    sendMessage({
                                                        token: authState.token,
                                                        threadId: chatState.threadSelection.id,
                                                        messageContent: messageContent
                                                    });
                                                }
                                                setMessageContent('')
                                            }
                                        }}/>
                                </Grid>
                                <Grid item>
                                    <SendButton
                                        onClick={() => {
                                            if(chatState.threadSelection !== undefined){
                                                sendMessage({
                                                    token: authState.token,
                                                    threadId: chatState.threadSelection.id,
                                                    messageContent: messageContent
                                                });
                                            }
                                            setMessageContent('')
                                        }}
                                        endIcon={<SendIcon />}
                                        aria-label="send"
                                        variant="contained"
                                        size="large">
                                        Send
                                    </SendButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <CardContent sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Grid container>
                        <Grid item container xs={12} justifyContent="center" mb={6}>
                            <GedChat src={picture} alt="Bluefors Logo" />
                        </Grid>
                        <Grid item mr={4} ml={4}>
                            <Typography variant="h6" color="text.secondary" textAlign="center">
                                Did you know: Avocados are a fruit, not a vegetable. They're technically considered a single-seeded berry, believe it or not.
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            )}
        </Card>
    )
}

export default ChatCard
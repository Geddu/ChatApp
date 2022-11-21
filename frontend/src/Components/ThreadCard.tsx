import { Card, CardHeader, Avatar, IconButton, CardContent, Typography, SvgIcon, Divider, List, ListItem, ListItemButton, Button, Box, TextField, styled, Modal, Grid } from "@mui/material"
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Auth } from '../Store/authState';
import React, { useEffect, useState } from "react";
import { Thread, useAddThreadMutation, useThreadsQuery, useUsersQuery } from "../Store/chatApi";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { creatingThread, selectThread } from "../Store/chatState";
import CreateIcon from '@mui/icons-material/Create';
import RandomIcon from "./RandomIcon";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LogoutModal from "./LogoutModal";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import carloya from '../Assets/carayola.json'


const GetColor = (id: number) => {
    if (carloya.length <= id) {
        // Just to make sure we wont get an error even if we have a whole bunch of users
        return carloya[Math.floor(Math.random() * carloya.length - 1)].hex
    }
    return carloya[id].hex
}

const ThreadNameField = styled(TextField)({
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '20px',
    },
});

const NewThreadButton = styled(Button)({
    borderRadius: '20px',
});

const CardHeaderStyled = styled(CardHeader)({
    '& .MuiCardHeader-action': {
        alignSelf: 'auto',
        marginRight: '6px'
    },
});


const ThreadCard = ({ authState }: { authState: Auth }) => {
    const { data: users } = useUsersQuery(authState.token)
    const { data: threadsData } = useThreadsQuery(authState.token)
    const [threads, setThreads] = useState<Thread[] | undefined>()
    const [userSelected, setUserSelected] = useState({ id: 0, username: '' })
    const [threadName, setThreadName] = useState('')
    const [addThread] = useAddThreadMutation()
    const chatState = useAppSelector((state) => state.chatState)
    const dispatch = useAppDispatch();

    // Logout controlls
    const [logoutOpen, setLogoutOpen] = React.useState(false);
    const handleLogoutOpen = () => setLogoutOpen(true);
    const handleLogoutClose = () => setLogoutOpen(false);
    // --

    // Functions
    const handleThreadClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: number,
        name: string,
        index: number,
    ) => {
        dispatch(selectThread({ id: id, name: name, index: index }));
    };
    const handleUserClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: number,
        username: string,
    ) => {
        setUserSelected({ id, username })
    };

    const handleThreadNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThreadName(event.target.value);
    };

    // Some magic for automatically selecting the correct Thread after its creation ;)
    useEffect(() => {
        if (threadsData !== undefined && threadsData.length > 1) {
            const itemsToSort = [...threadsData];
            itemsToSort.sort((x, y) => {
                return y.id - x.id
            });
            setThreads(itemsToSort);
            if (chatState.threadSelection?.index === undefined && chatState.threadSelection?.id !== undefined) {
                const foundIndex = itemsToSort?.findIndex((thread) => thread.id === chatState.threadSelection?.id)
                if (foundIndex !== undefined) {
                    dispatch(selectThread({
                        id: chatState.threadSelection.id,
                        name: chatState.threadSelection.name,
                        index: foundIndex
                    }))
                }
            }
        } else {
            setThreads(threadsData);
        }

    }, [threadsData]);

    const handleAddingNewThread = () => {
        addThread({
            token: authState.token,
            name: threadName,
            participantId: userSelected.id
        }).then((e) => {
            console.log(e)
            dispatch(creatingThread(false))
            setUserSelected({ id: 0, username: '' })
            setThreadName('')
        })
    }

    return (
        <Card sx={{ height: '100%', borderRadius: '20px 0px 0px 20px', borderRight: '1px solid rgba(255,255,255,0.12)' }}>
            <CardHeaderStyled
                avatar={
                    <Avatar sx={{ bgcolor: GetColor(authState.id) }} aria-label="recipe">
                        {authState.username.charAt(0)}
                    </Avatar>
                }
                action={
                    chatState.creatingThread ? (
                        <IconButton aria-label="cancel" size="large"
                            onClick={() => {
                                setUserSelected({ id: 0, username: '' })
                                dispatch(creatingThread(false))
                            }}>
                            <CloseIcon />
                        </IconButton>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item>
                                <IconButton aria-label="new" size="large"
                                    onClick={() => dispatch(creatingThread(true))}>
                                    <CreateIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton aria-label="logout" size="large"
                                    onClick={handleLogoutOpen}>
                                    <LogoutRoundedIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    )
                }
                title={<Typography variant="h5">{authState.username}</Typography>}
                subheader={`Logged in: ${(new Date).toLocaleDateString("fi-FI")}`}
            />
            <Divider />
            <CardContent sx={{ maxHeight: 'calc(100vh - (85px + 32px + 40px + 16px))' }}>
                {chatState.creatingThread ? (userSelected.username === '' ? (
                    /* THREAD CREATION */
                    <>
                        <Typography m={2} variant="h6" textAlign="center">Select whom to chat with:</Typography>
                        <List sx={{
                            width: '100%',
                            overflow: 'auto',
                            maxHeight: 'calc(100vh - (85px + 32px + 40px + 16px + 64px))',
                        }}>
                            {users !== undefined && users !== null && users.length > 1 ? (users?.map((user, index) => (
                                <div key={`divtUser-${user.id}`} style={user.id !== authState.id ? { display: 'block' } : { display: 'none' }}>
                                    <ListItemButton
                                        key={`user-${user.id}`}
                                        sx={{ borderRadius: '20px', width: '95%' }}
                                        alignItems="flex-start"
                                        onClick={(event) => handleUserClick(event, user.id, user.username)}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: GetColor(user.id) }} aria-label="recipe">
                                                {user.username.charAt(0)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={user.username}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        ID:
                                                    </Typography>
                                                    {" " + user.id}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItemButton>
                                    <Divider key={`userDiv-${user.id}`} variant="inset" component="li" sx={{ marginRight: '36px' }} />
                                </div>
                            ))) : (
                                <Typography
                                    textAlign="center"
                                    sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                    No one else has started to use the app yet T^T
                                </Typography>
                            )}
                        </List>
                    </>
                ) : (
                    <>
                        <Typography m={2} variant="h6" textAlign="center">About to chat up {userSelected.username}</Typography>
                        <Box m={2}>
                            <ThreadNameField
                                id="outlined-basic"
                                label="Thread name"
                                variant="outlined"
                                autoComplete="off"
                                required
                                value={threadName}
                                helperText={threadName.length < 3 ? "Has to be longer that 3 letters." : " "}
                                onChange={handleThreadNameChange} />
                        </Box>
                        <Box m={2} mt={0} sx={{ textAlign: 'end' }}>
                            <NewThreadButton
                                endIcon={<ArrowForwardRoundedIcon />}
                                disabled={threadName.length < 3}
                                variant="contained"
                                size="large"
                                onClick={() => handleAddingNewThread()}>
                                Start Chat
                            </NewThreadButton>
                        </Box>
                    </>
                )
                ) : (
                    /* THREADS */
                    <List sx={{
                        width: '100%',
                        overflow: 'auto',
                        maxHeight: 'inherit',
                    }}>
                        {threads !== undefined && threads !== null && threads.length > 0 ? (threads?.map((thread, index) => (
                            <div key={`divthread-${thread.id}`}>
                                <ListItemButton
                                    key={`thread-${thread.id}`}
                                    sx={{ borderRadius: '20px', width: '95%' }}
                                    alignItems="flex-start"
                                    selected={chatState.threadSelection?.index === index}
                                    onClick={(event) => handleThreadClick(event, thread.id, thread.name, index)}>
                                    <ListItemAvatar>
                                        <RandomIcon name={thread.name} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                sx={{ display: 'inline', fontWeight: 500 }}
                                                component="span"
                                                color="text.primary"
                                            >
                                                {thread.name}
                                            </Typography>}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    ID:
                                                </Typography>
                                                {" " + thread.id}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItemButton>
                                <Divider key={`threadDiv-${thread.id}`} variant="inset" component="li" sx={{ marginRight: '36px' }} />
                            </div>
                        ))) : (
                            <>
                                <Typography
                                    textAlign="center"
                                    sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                    Add a new Thread
                                </Typography>
                                <Typography
                                    textAlign="center"
                                    sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                    from the above <CreateIcon sx={{ height: '20px' }} /> -button
                                </Typography>
                            </>
                        )}
                    </List>
                )}
            </CardContent>
            <LogoutModal handleLogoutClose={handleLogoutClose} logoutOpen={logoutOpen} />
        </Card>
    )
}

export default ThreadCard
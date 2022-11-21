import { Grid } from '@mui/material';
import * as React from 'react';
import ThreadCard from '../Components/ThreadCard';
import ChatCard from '../Components/ChatCard';
import { Auth } from '../Store/authState';

const Chat = ({ authState }: { authState: Auth }) => {
    return (
        <Grid container sx={{height: '100%'}}>
            <Grid item xs={5} pt={3} pl={3} pb={3}>
                <ThreadCard authState={authState} />
            </Grid>
            <Grid item xs={7} pt={3} pr={3} pb={3}>
                <ChatCard authState={authState} />
            </Grid>
        </Grid>
    )
}
export default Chat;
import { Button, Grid, Modal, Typography } from "@mui/material";
import { Box, color, styled } from "@mui/system";
import React from "react";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useAppDispatch } from "../Store/hooks";
import { saveToken } from "../Store/authState";
import { resetChatState } from "../Store/chatState";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1F1F1F',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
};

const LogoutButton = styled(Button)({
    borderRadius: '20px',
});

const LogoutModal = ({ logoutOpen, handleLogoutClose }: { logoutOpen: boolean, handleLogoutClose: () => void }) => {
    const dispatch = useAppDispatch();

    return (
        <Modal
            open={logoutOpen}
            onClose={handleLogoutClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
                    Are you sure you want to leave this wonderful place?
                </Typography>
                <Grid container justifyContent="space-between" pt={4}>
                    <Grid item>
                        <LogoutButton
                            startIcon={<ArrowBackIosRoundedIcon />}
                            variant="contained"
                            onClick={handleLogoutClose} >Go back</LogoutButton>
                    </Grid>
                    <Grid item>
                        <LogoutButton
                            endIcon={<LogoutRoundedIcon />}
                            variant="contained"
                            color="warning"
                            // since there is no "real" Logout query available in the backend, so this will do.
                            onClick={() => {
                                dispatch(saveToken({
                                    token: '',
                                    id: 0,
                                    username: '',
                                    tabSelection: 1
                                }))
                                dispatch(resetChatState())
                            }}>
                            Logout
                        </LogoutButton>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default LogoutModal
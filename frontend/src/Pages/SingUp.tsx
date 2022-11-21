import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useRegisterMutation } from '../Store/chatApi';
import { useAppDispatch } from '../Store/hooks';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import styled from 'styled-components';
import { handleOpen } from '../Store/toastState';

const FormTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        borderRadius: '20px',
    },
})

export default function SignUp () {
    const [register] = useRegisterMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const authValues = {
            username: data.get('email')?.toString(),
            password: data.get('password')?.toString(),
            passwordConfirm: data.get('passwordConfirm')?.toString()
        }
        // Some fast form checking. Could have used Formik.js too.
        if (authValues.username && authValues.password && authValues.passwordConfirm) {
            if (authValues?.username?.length > 2
                && authValues?.password?.length > 4
                && authValues?.passwordConfirm?.length > 4) {
                if (authValues?.password === authValues?.passwordConfirm){
                    register(authValues)
                } else { dispatch(handleOpen(`Passwords do not match.`)) }
                console.log({
                    authValues
                });
            } else { dispatch(handleOpen(`Fill in the required fields as instructed to continue.`)) }
        }


    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box component="form" noValidate onSubmit={handleSubmit} mt={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormTextField
                                required
                                helperText="At least 3 characters"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextField
                                required
                                helperText="At least 5 characters"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextField
                                required
                                helperText="At least 5 characters"
                                fullWidth
                                name="passwordConfirm"
                                label="Password Confirm"
                                type="password"
                                id="passwordConfirm"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label={<>"I solemnly swear that I am up to no good." <AutoFixHighIcon sx={{ marginLeft: '0.5rem' }} /></>}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: '20px' }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
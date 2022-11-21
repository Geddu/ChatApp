import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useAppDispatch } from '../Store/hooks'
import { useLoginMutation } from '../Store/chatApi'
import styled from 'styled-components';
import { handleOpen } from '../Store/toastState';

const FormTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    borderRadius: '20px',
  },
})

export default function SignIn () {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const authValues = {
      username: data.get('email')?.toString(),
      password: data.get('password')?.toString()
    }
    // Some fast form checking. Could have used Formik.js too.
    if (authValues.username && authValues.password){
      if (authValues?.username?.length > 2 && authValues?.password?.length > 4){
        login(authValues)
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
        <Box component="form" onSubmit={handleSubmit} noValidate >
          <FormTextField
            margin="dense"
            helperText="At least 3 characters"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <FormTextField
            margin="normal"
            helperText="At least 5 characters"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: '20px' }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
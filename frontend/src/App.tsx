import Container from '@mui/material/Container';
import LoginTabs from './Components/LoginTabs';
import { useAppDispatch, useAppSelector } from './Store/hooks';
import Chat from './Pages/Chat';
import styled from 'styled-components';
import { Snackbar, Alert } from '@mui/material';
import { handleClose } from './Store/toastState';

const MainContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  padding: '0px',
}));

export default function App () {
  const authState = useAppSelector((state) => state.authState)
  const toastState = useAppSelector((state) => state.toastState)
  const dispatch = useAppDispatch()

  return (
    <MainContainer maxWidth="xl">
      {authState.username !== '' && authState.tabSelection !== undefined ? (
        <Chat authState={authState} />
      ) : (
        <LoginTabs selectedTab={authState.tabSelection} />
      )}
      < Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={toastState.open}
        autoHideDuration={6000}
        onClose={() => dispatch(handleClose())} >
        <Alert
          variant="filled"
          onClose={() => dispatch(handleClose())}
          severity="error"
          sx={{ width: '100%' }}>
          {toastState.content}
        </Alert>
      </Snackbar >
    </MainContainer>
  );
}

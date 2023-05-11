import './App.css'
import {Box, Typography} from '@mui/material';
import LoginForm from './pages/Login/LoginForm';

function App() {

  return (
    <Box
    className='App'
    display='flex'
    justifyContent='center'
    alignItems='center'
    flexDirection='center'
    >
      <Typography variant ='h2' mb='20px' textAling='center'>
        Torres - Testing
      </Typography>
      <LoginForm />
    </Box>
  )
}

export default App

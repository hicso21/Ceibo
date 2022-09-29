import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import { Alert, Link, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { sendLoginRequest } from '../state/user';
import { useState } from 'react';
import GoogleLogin from './GoogleLogin';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function SignUp() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);

  const [email, setEmail] = useState('')
  const [emailLegend, setEmailLegend] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)

  const [password, setPassword] = useState('')
  const [pwLegend, setPwLegend] = useState('')
  const [errorPw, setErrorPw] = useState(false)
  const [type, setType] = useState('password')

  const handleType = () => {
    type === 'password'?setType('text'):setType('password')
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(sendLoginRequest({
      email: data.get('email'),
      password: data.get('password'),
    }))
    .then((resp)=>{
      if(resp.payload !== undefined){
        navigate('/mascotas')
      }else{
        setOpen(true)
      }
    })
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Los datos ingresados no coinciden con ningun usuario registrado
            </Alert>
          </Snackbar>
          <Avatar sx={{ m: 1, bgcolor: '#1e244b' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e)=>{
                    setEmail(e.target.value)
                    if(!email.includes('@') || !email.split('@')[0]){
                      setErrorEmail(true)
                      setEmailLegend('El correo electronico debe existir')
                    }else{
                      setErrorEmail(false)
                      setEmailLegend('')
                    }
                  }}
                  error={errorEmail}
                  required
                  fullWidth
                  label="Correo Electronico"
                  name="email"
                  autoComplete="email"
                  helperText={emailLegend}
                  autoFocus
                  />
              </Grid>
              <Grid item xs={12} sx={{display:'flex'}}>
                <TextField
                  onChange={(e)=>{
                    setPassword(e.target.value)
                    if(password.length<5){
                      setErrorPw(true)
                      setPwLegend('La contraseña debe contener al menos 6 caracteres')
                    }else{
                      setErrorPw(false)
                      setPwLegend('')
                    }
                  }}
                  error={errorPw}
                  required
                  fullWidth
                  label="Contraseña"
                  type={type}
                  name="password"
                  autoComplete="new-password"
                  helperText={pwLegend}
                />
                <Button color='inherit' onClick={handleType} sx={{height:56}}>
                  <VisibilityIcon/>
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Inicia sesion
            </Button>
            <Grid container sx={{justifyContent:"center", mb:4, mt:1}} >
              <GoogleLogin/>
            </Grid>
            <Grid container>
              <Grid item xs>
                {/* <Link href="/passwordForgotted" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"No tienes una cuenta creada? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

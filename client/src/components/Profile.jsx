import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  CssBaseline,
  Box,
  Avatar,
  Stack,
  Container,
  CardMedia
} from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import useMatches from "../hooks/useMatches";
import { setUser } from "../state/user";
import { useEffect } from "react";

const theme = createTheme();

const Profile = () => {
  let changePassword
  let google
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [image, setImage] = useState(user.profile_picture);
  const seleccionArchivos = document.querySelector("#seleccionArchivos");
  const imagenPrevisualizacion = document.querySelector(
    "#imagenPrevisualizacion"
  );

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenPassword = () => {
    setOpenPassword(true);
  };

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const lastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSend = () => {
    axios
      .put(`http://localhost:3001/api/user/update/${user._id}`, {
        name: name,
        last_name: lastName,
        email: email,
      })
      .then((res) => dispatch(setUser(res.data)));
      setOpen(false);
  };

  const handleSendPassword = () => {
    axios
      .put(`http://localhost:3001/api/user/resetPassword/${user._id}`, {
        password: password
      })
      .then((res) => dispatch(setPassword(res.data)));
      setOpenPassword(false);
  };

  const handleImage = (e) => {
    const archivos = seleccionArchivos.files;

    if (!archivos || !archivos.length) {
      imagenPrevisualizacion.src = "";
      return;
    }
    const primerArchivo = archivos[0];
    const objectUrl = URL.createObjectURL(primerArchivo);
    setImage(objectUrl);

    imagenPrevisualizacion.src = objectUrl;
  };

  const handleSubmit = () => {
    axios
      .put(`http://localhost:3001/api/user/update/${user._id}`, {
        profile_picture: image,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        password: user.password
      })
  };

  //false = mobile  ---  true = desktop
  const matches = useMatches();

  localStorage.getItem('google')?
   changePassword = <Typography sx={{display:'flex', justifyContent:'center', mt:10, mb:14}}>Estas logueado con una cuenta de Google</Typography>
   :
   changePassword=  <>
                      <Stack alignItems="center" spacing={1}>
                        <Button variant="contained" component="label">
                          Subir imagen
                          <input hidden id="seleccionArchivos" accept="image/*" type="file" onChange={handleImage} />
                        </Button>
                        <Button onClick={()=>{console.log(image)}}>images</Button>
                          <img id="imagenPrevisualizacion" alt="" />
                      </Stack>
                      <Box component="form" noValidate sx={{ mt: 2 }}>
                        <Button
                          variant="contained"
                          onClick={handleClickOpen}
                          fullWidth
                          sx={{
                            marginBottom: 1,
                            marginTop: 2,
                            backgroundColor: "#03A696",
                            "&:hover": {
                              backgroundColor: "#04BF9D",
                              color: "#757575",
                            },
                          }}
                        >
                          Editar datos personales
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleClickOpenPassword}
                          fullWidth
                          sx={{
                            marginBottom: 1,
                            backgroundColor: "#03A696",
                            "&:hover": {
                              backgroundColor: "#04BF9D",
                              color: "#757575",
                            },
                          }}
                        >
                          Cambiar contraseña
                        </Button>
                        <Dialog
                          open={open}
                          onClose={handleSend}
                          maxWidth="md"
                          fullWidth={true}
                        >
                          <DialogContent>
                            <TextField
                              onChange={nameChange}
                              label="Nombre"
                              defaultValue={user.name}
                              autoFocus
                              margin="dense"
                              id="name"
                              type="text"
                              fullWidth
                              variant="standard"
                            />
                            <TextField
                              onChange={lastNameChange}
                              label="Apellido"
                              defaultValue={user.last_name}
                              autoFocus
                              margin="dense"
                              id="name"
                              type="text"
                              fullWidth
                              variant="standard"
                            />
                            <TextField
                              onChange={emailChange}
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Email"
                              defaultValue={user.email}
                              type="text"
                              fullWidth
                              variant="standard"
                            />
                          </DialogContent>

                          <DialogActions>
                            <Button variant="contained" onClick={() => setOpen(false)}>
                              Cancelar
                            </Button>
                            <Button variant="contained" onClick={handleSend}>
                              Guardar cambios
                            </Button>
                          </DialogActions>
                        </Dialog>

                        <Dialog
                          open={openPassword}
                          onClose={handleSendPassword}
                          maxWidth="md"
                          fullWidth={true}
                          >
                          
                          <DialogContent>
                            <TextField
                            onChange={passwordChange}
                            margin="dense"
                            variant="standard"
                            fullWidth
                            autoFocus
                            label="Nueva contraseña"
                            type="password"
                            id="password"
                            name="password"
                            />
                          </DialogContent>

                          <DialogActions>
                            <Button variant="contained" onClick={() => setOpenPassword(false)}>
                              Cancelar
                            </Button>
                            <Button variant="contained" onClick={handleSendPassword}>
                              Guardar cambios
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Box>
                      <Button
                        color="inherit"
                        fullWidth
                        sx={{ mt: 5, bgcolor: "#FFD640", mb: 1, borderRadius: 7 }}
                        onClick={handleSubmit}
                        >
                        Guardar cambios
                      </Button>
                    </>

  if (matches) {} 
  else {}
  
  useEffect(()=>{
    if(localStorage.getItem('google'))google = localStorage.getItem('google')
  },[])

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Mi Perfil
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar  alt="Remy Sharp"
                sx={{ m: 2, width: 66, height: 66 }}>
                  <img id="imagenPrevisualizacion" alt="" width={"100%"} src={user.profile_picture} />
                </Avatar>
            </Stack>
          {changePassword}
          </Box>
          <Button
            color="inherit"
            fullWidth
            sx={{ bgcolor: "#FFD640", mb: 1, borderRadius: 7 }}
            onClick={() => {
              navigate("/");
            }}
            >
            Volver
          </Button>
          <br />
          <br />
          <br />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Profile;

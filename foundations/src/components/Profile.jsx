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
  Collapse,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import useMatches from "../hooks/useMatches";
import { sendLoginRequest, setUser } from "../state/user";
import { styled, useTheme, alpha } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const theme = createTheme();

const Profile = () => {
  let changePassword
  const [collapse, setCollapse] = useState(false)
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [image , setImage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const seleccionArchivos = document.querySelector("#seleccionArchivos");
  const imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const nameChange = (e) => {
    setName(e.target.value);
  };

  const lastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleImage = (e) => {
    const reader = new FileReader()
    const archivos = seleccionArchivos.files;

    if (!archivos || !archivos.length) {
      imagenPrevisualizacion.src = "";
      return;
    }

    reader.addEventListener('loadend', function () {
      imagenPrevisualizacion.src = reader.result
      setImage(reader.result)
    })
    
    reader.readAsDataURL(archivos[0]);

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

  const handleSubmit = () => {
    console.log(image)
    axios
      .post(`http://localhost:3001/api/upload/`, {Base64:image})
      .then(resp=>{
        axios.put(`http://localhost:3001/api/foundation/update/${user._id}`, {
          profile_picture: resp.data,
          name: user.name,
          location: user.location,
          email: user.email,
          password: user.password
        })
        .then(()=>{
          setCollapse(true)
          setTimeout(() => {
            setCollapse(false)
          }, 3000);
        })
      })
  };

  //false = mobile  ---  true = desktop
  const matches = useMatches();

  let bottom
  let typography

  if (matches) {
    bottom = <><DrawerHeader/><br/><br/></>
    typography = 'h3'
  }else {
    bottom = <></>
    typography = 'h4'
  }

  localStorage.getItem('google')?
   changePassword = <Typography sx={{display:'flex', justifyContent:'center', mt:10, mb:14}}>Estas logueado con una cuenta de Google</Typography>
   :
   changePassword=  <>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Button variant="contained" component="label">
                          Subir imagen
                          <input hidden id="seleccionArchivos" accept="image/*" multiple type="file" onChange={handleImage}/>
                        </Button>
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
                          Edita tus datos personales
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

                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          size="large"
                          sx={{
                            marginBottom: 1,
                            backgroundColor: "#03A696",
                            "&:hover": {
                              backgroundColor: "#04BF9D",
                              color: "#757575",
                            },
                          }}
                          onClick={() => {
                            navigate("/mascotas");
                          }}
                        >
                          Editar Mascotas
                        </Button>
                      </Box>
                      <Button
                        color="inherit"
                        fullWidth
                        sx={{ mt: 5, bgcolor: "#FFD640", borderRadius: 7 }}
                        onClick={handleSubmit}
                        >
                        Guardar cambios
                      </Button>
                    </>

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 7,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant={typography}>
              Mi Fundacion
            </Typography>
            <Stack direction="row" spacing={2}>
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
              sx={{ mt: 2, bgcolor: "#FFD640", mb: 1, borderRadius: 7 }}
              onClick={() => {
                navigate("/mascotas");
              }}
            >
              Volver
            </Button>
            <Collapse in={collapse}>
              <Alert variant="filled" severity="success" sx={{borderRadius:10}}>
                Por favor reinicia sesion para cargar la foto de perfil
              </Alert>
            </Collapse>
          <br />
          <br />
          <br />
        </Container>
      </ThemeProvider>
      {bottom}
    </>
  );
};

export default Profile;

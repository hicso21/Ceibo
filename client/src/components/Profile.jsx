import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import useMatches from "../hooks/useMatches";
import axios from "axios";

const theme = createTheme();

const Profile = () => {
  const user = useSelector((state) => state.user);








  //false = mobile  ---  true = desktop
  const matches = useMatches();

  if (matches) {
  } else {
  }

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
            <Typography component="h1" variant="h5">
              Mi Perfil
            </Typography>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ m: 2, width: 66, height: 66 }}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button variant="contained" component="label">
                Subir imagen
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </Stack>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    variant="outlined"
                    required
                    fullWidth
                    label="Nombre"
                    defaultValue={user.name}
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="last_name"
                    variant="outlined"
                    required
                    fullWidth
                    label="Apellido"
                    defaultValue={user.last_name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    variant="outlined"
                    required
                    fullWidth
                    label="Email"
                    defaultValue={user.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    variant="outlined"
                    required
                    fullWidth
                    label="Contraseña"
                    defaultValue={user.password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
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
                Formulario de adopción
              </Button>
             
            </Box>
          </Box>
            <Button
              color="inherit"
              fullWidth
              sx={{ mt: 5, bgcolor: "#FFD640", mb: 1, borderRadius: 7 }}
            >
              Guardar cambios
            </Button>
            <Button
              color="inherit"
              fullWidth
              sx={{bgcolor: "#FFD640", borderRadius: 7 }}
            >
              Cancelar
            </Button>
            <br/>
            <br/>
            <br/>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Profile;

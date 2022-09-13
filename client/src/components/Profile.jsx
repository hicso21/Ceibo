import * as React from "react";
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
import axios from "axios";

const theme = createTheme();

const Profile = () => {

  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
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
                    autoComplete="fname"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    autoFocus
                    value="Juan Carlos"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value="juancarlos@gmail.com"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="new-password"
                    required
                    fullWidth
                    id="password"
                    label="Contraseña"
                    type="password"
                    value="Contraseña123"
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
              <Grid container justifyContent="flex-end"></Grid>
            </Box>
            <Button
              color="inherit"
              fullWidth
              sx={{ mt: 6, bgcolor: "#FFD640", mb: 4, borderRadius: 7 }}
            >
              Guardar cambios
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Profile;


import * as React from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

function AdoptionForm() {
  return (
    <div className="App">
      <Grid sx={{ marginTop: 10, marginBottom: 10 }}>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Formulario de Adopción
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Desde "Patitas Con Techo" realizamos este formulario para así
              poder comprender el contexto del adoptante y cuidar a nuestros
              animales.
            </Typography>
            <form>
              <Grid container spacing={2} marginTop={2}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Apellido"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    label="Numero de telefono"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    label="Edad"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      Estado Civil
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Estado Civil"
                    >
                      <MenuItem value={"Soltero"}>Soltero/a</MenuItem>
                      <MenuItem value={"Casado"}>Casado/a</MenuItem>
                      <MenuItem value={"Otro"}>Otro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label="Dirección"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      Espacio disponible para la mascota
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Espacio disponible para la mascota"
                    >
                      <MenuItem value={"Casa"}>Casa</MenuItem>
                      <MenuItem value={"Departamento"}>Departamento</MenuItem>
                      <MenuItem value={"Patio"}>Patio</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      ¿Convive con niños?
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="¿Convive con niños?"
                    >
                      <MenuItem value={"Si"}>Si</MenuItem>
                      <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-helper-label">
                      ¿Tiene más mascotas?
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="¿Tiene más mascotas?"
                    >
                      <MenuItem value={"Si"}>Si</MenuItem>
                      <MenuItem value={"No"}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="¿Algo que nos quieras contar?"
                    multiline
                    rows={4}
                    placeholder="Alguna experiencia previa con otra mascota, algo importante que tengamos que saber, etc"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default AdoptionForm;

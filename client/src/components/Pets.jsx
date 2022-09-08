import axios from "axios";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const ShowPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get("/api/pets")
      .then((res) => res.data)
      .then((data) => {
        setPets(data.results);
      });
  }, []);

  return (
    <>
    <div
      style={{
        backgroundColor: "white",
      }}
      >
      <Container
        sx={{
          p: 1,
          mb: 1,
          backgroundColor: "#e0e0e0",
          borderRadius: 1,
          color: "action.active",
          fontWeight: "bold",
        }}
        >
        <p style={{ textAlign: "center" }}>Mascotas</p>
      </Container>
      <Container sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}>
        <Grid container my={4}>
          {pets?.map((mascota) => {
            <Grid item xs={4} p={2}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {mascota.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mascota.species}
                  </Typography>
                  <Typography variant="body4" color="text.secondary">
                    {mascota.sex}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mascota.foundation}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>;
          })}
        </Grid>
      </Container>
    </div>
    </>
  );
};

export default ShowPets;
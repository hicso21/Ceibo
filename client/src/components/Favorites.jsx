import axios from "axios";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions
} from "@mui/material";
import { Link } from 'react-router-dom'

const ShowFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("/api/favorites")
      .then((res) => res.data)
      .then((data) => {
        setFavorites(data.results);
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
        <p style={{ textAlign: "center", color: "black"}}>Mis Favoritos</p>
        </Container>
      <Container sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}>
        <Grid container my={4}>
        {favorites?.map((favoritos) => {
            <Grid item xs={4} p={2}>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.primary"
                gutterBottom
              >
                No tiene favoritos
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/favorites">
                <Button size="small">Ver Favoritos</Button>
              </Link>
            </CardActions>
          </Card>
          </Grid>;
           })}
        </Grid>
      </Container>
    </div>
    </>
  );
};

export default ShowFavorites;
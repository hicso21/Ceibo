import axios from "axios";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useMatches from "../hooks/useMatches";

const ShowPets = () => {
  const [pets, setPets] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //false = mobile  ---  true = desktop
  const matches = useMatches();

  if (matches) {
  } else {
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/foundation/${user._id}/pets`)
      .then((res) => {
        console.log(res.data);
        setPets(res.data);
      });
  }, []);

  return (
    <>
      <Container
        sx={{
          p: 5,
          backgroundColor: "#e0e0e0",
          borderRadius: 1,
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Mascotas
        </Typography>
        <Grid container my={4}>
          {pets?.map((mascota) => {
            return (
              <Link
                to={`/mascotas/${mascota._id}`}
                key={mascota._id}
                style={{
                  textDecoration: "none",
                  margin: "0px auto",
                  minWidth: 295,
                }}
              >
                <Grid item xs={12} p={2} key={mascota._id}>
                  <Card>
                    <CardMedia>
                      <img src={mascota.photos[0]} alt="" width="100%" />
                    </CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {mascota.name}
                      </Typography>
                      <Typography variant="body4" color="text.secondary">
                        {mascota.gender}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Link>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default ShowPets;

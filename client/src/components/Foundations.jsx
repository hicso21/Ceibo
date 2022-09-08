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
import {Link} from 'react-router-dom'

const ShowFoundations = () => {
  const [foundations, setFoundations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/foundation")
      .then((res) => res.data)
      .then((data) => {
        setFoundations(data);
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
          <p style={{ textAlign: "center", color: "black" }}>Fundaciones</p>
        </Container>
        <Container sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}>
          <Grid container my={4}>
            {foundations?.map((fundacion) => {
              return(
              <Link to={`/foundation/${fundacion._id}`} key={fundacion._id} style={{textDecoration:'none'}}>
                <Grid item xs={12} p={2}>
                  <Card>
                    <CardMedia>
                      <img src={fundacion.profile_picture} alt="" width='100%'/>
                    </CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {fundacion.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {fundacion.history}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Link>
              )
            })}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default ShowFoundations;

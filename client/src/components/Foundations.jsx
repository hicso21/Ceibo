import axios from "axios";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const ShowFoundations = () => {
  const [foundations, setFoundations] = useState([]);

  useEffect(() => {
    axios
      .get("/api/foundations")
      .then((res) => res.data)
      .then((data) => {
        setFoundations(data.results);
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
          <p style={{ textAlign: "center" }}>Fundaciones</p>
        </Container>
        <Container sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}>
          <Grid container my={4}>
            {foundations?.map((fundacion) => {
              <Grid item xs={4} p={2}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {fundacion.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {fundacion.history}
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

export default ShowFoundations;

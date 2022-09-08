import { React, useState } from "react";
import { Container, Grid, Pagination } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

const UserFavorites = () => {

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
        <p style={{ textAlign: "center" }}>Mis Favoritos</p>
        </Container>
      <Container sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}>
        <Grid container my={4}>
            <Grid item xs={4} p={2}>
          <Card sx={{ mb: 3, width: "100%" }}>
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
              <Link to="/pets">
                <Button size="small">Ver Favoritos</Button>
              </Link>
            </CardActions>
          </Card>
          </Grid>;
        </Grid>
      </Container>
    </div>
    </>
  );
};

export default UserFavorites;
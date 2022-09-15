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
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ShowFavorites = () => {
  const {pathname} = useLocation()
  const [favorites, setFavorites] = useState([]);
  const user = useSelector(state=>state.user)

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`http://localhost:3001/api/user/favorites/${user._id}`)
        .then((res) => {
          setFavorites(res.data)
          console.log(res.data)
        })
    }, 2000);
  }, [pathname]);


  return (
    <>
    <div
      style={{
        backgroundColor: "white",
      }}
      >
      <Container sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}>
        <Typography variant="h2" sx={{pl:3}}>Favoritos</Typography>
        <Grid container my={4}>
        {favorites?.map((favoritos,i) => {
          return (
            <Grid item xs={4} p={2} key={i}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="text.primary"
                    gutterBottom
                    >
                    {favoritos.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to="/favorites">
                    <Button size="small">Ver Favoritos</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          )
           })}
        </Grid>
      </Container>
    </div>
    </>
  );
};

export default ShowFavorites;
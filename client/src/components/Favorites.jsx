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
  const [favoritesArr, setFavoritesArr] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const user = useSelector(state=>state.user)

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/user/favorites/${user._id}`)
      .then((res) => setFavoritesArr(res.data))
      .then(()=>
        favoritesArr?.map((id)=>{
          axios.get(`http://localhost:3001/api/pets/${id}`)
            .then((res)=>{
              console.log(res.data)
              setFavorites(current=>[...current, res.data])
            })
            .then(()=>{console.log(favorites)})
        })
      )
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
                    No tiene favoritos
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
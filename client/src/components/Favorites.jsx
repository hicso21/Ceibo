import axios from "axios";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  CardMedia,
  CardActions
} from "@mui/material";
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logoGatito from '../assets/gatitoLogo.png';
import logoPerrito from '../assets/perritoLogo.png';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import useMatches from '../hooks/useMatches'

const ShowFavorites = () => {
  let empty = <></>
  const {pathname} = useLocation()
  const [favorites, setFavorites] = useState([]);
  const user = useSelector(state=>state.user)
  const matches = useMatches()

  useEffect(() => {
      axios
        .get(`http://localhost:3001/api/user/favorites/${user?._id}`)
        .then((res) => {setFavorites(res.data); return res.data})
  }, [pathname]);

  favorites[0]
              ?
              empty=<></>
              :
              matches
                    ?
                    empty=<>
                            <Typography variant="h4" sx={{ width:'100%',display:'flex', justifyContent:'center', mt:5}}>Aun no tienes favoritos</Typography>
                            <Button sx={{ width:'100%',display:'flex', justifyContent:'center', mt:15}}>
                              <Link to='/mascotas'>
                                <Typography variant="body1">Haz click aqui para agregar mascotas a favoritos!!</Typography>
                              </Link>
                            </Button>
                          </>
                    :
                    empty=<>
                            <Typography variant="h4" sx={{ width:'100%',display:'flex', justifyContent:'center', mt:5}}>Aun no tienes</Typography>
                            <Typography variant="h4" sx={{ width:'100%',display:'flex', justifyContent:'center'}}>favoritos</Typography>
                            <Button sx={{ width:'100%',display:'flex', justifyContent:'center', mt:15}}>
                              <Link to='/mascotas'>
                                <Typography variant="body1">Haz click aqui para agregar mascotas a favoritos</Typography>
                              </Link>
                            </Button>
                          </> 

  return (
    <>
    <div
      style={{
        backgroundColor: "white",
      }}
      >
      <Container sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}>
        <Typography variant="h3" sx={{pl:3,display:'flex', justifyContent:'center'}}>Favoritos</Typography>
        <Grid container my={4}>
        {empty}
        {favorites?.map((favoritos,i) => {
          return (
            <Link to={`/mascotas/${favoritos._id}`} key={favoritos._id} style={{textDecoration:'none', margin:'0px auto', minWidth:295}}>
              <Grid item xs={12} p={2} key={favoritos._id}>
                <Card>
                  <CardMedia>
                    <img src={favoritos.photos[0]} alt="" width='100%'/>
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {favoritos.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {favoritos.specie === 'perro' ? <img src={logoPerrito} width="50" height="50" alt="perrito"   />:<img src={logoGatito} width="40" height="40"  alt="gatito" />}</Typography>
                    <Typography variant="body4" color="text.secondary">
                      {favoritos.gender === 'hembra'?<FemaleIcon sx={{width:40, height:40}}/>:<MaleIcon sx={{width:40, height:40}}/>}
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

export default ShowFavorites;
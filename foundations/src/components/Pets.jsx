import axios from "axios";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  Box,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useMatches from "../hooks/useMatches";
import HomeIcon from '@mui/icons-material/Home';
import { styled } from "@mui/material/styles";
import logoGatito from '../assets/gatitoLogo.png';
import logoPerrito from '../assets/perritoLogo.png';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const ShowPets = () => {
  const [pets, setPets] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //false = mobile  ---  true = desktop
  const matches = useMatches();

  let bottom
  let gridStyle

  if (matches) {
    bottom = <DrawerHeader/>
    gridStyle = {
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
    }
  } else {
    bottom = <></>
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/foundation/${user._id}/pets`)
      .then((res) => {
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
        <Box sx={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
          {pets.map((mascota) => {
              return(
              <Link to={`/mascotas/${mascota._id}`} key={mascota._id} style={{textDecoration:'none', display:'flex', flexDirection:'row', flexWrap:'wrap', alignItems:'center',  maxWidth:576}}>
                <Grid item xs={12} p={2} key={mascota._id}>
                    <Card>
                    <CardMedia>
                        <img id='imgPet' src={mascota.photos[0]} alt="" style={{objectFit:'cover'}} width='100%' max-height='1000px'/>
                    </CardMedia>
                    <Container sx={{dispaly:'flex', width:'100%', mt:1, mb:2}}>
                        
                        <Typography gutterBottom variant="h4" component="span" sx={{width:'25%',height:'50px'}}>
                        {mascota.name}
                        </Typography>

                        <Typography variant="body2" component='span'>
                        {mascota.specie === 'perro' ? <img src={logoPerrito} width="50" height="50" alt="perrito"/>:<img src={logoGatito} width="40" height="40"  alt="gatito" />}
                        </Typography>

                        <Typography variant="body2" component='span' sx={{width:'100%'}}>
                        {mascota.gender === 'hembra'?<FemaleIcon sx={{width:40, height:40}}/>:<MaleIcon sx={{width:40, height:40}}/>}
                        </Typography>
                        
                        <Typography variant="body2">
                        {mascota?.adopted? <><HomeIcon sx={{width:40, height:40}}/> <Typography variant='h6' component='span'>(adoptado)</Typography></>:<></>}
                        </Typography>
                    </Container>
                    </Card>
                </Grid>
              </Link>
              )
          })}
        </Box>
      </Container>
      {bottom}
    </>
  );
};

export default ShowPets;

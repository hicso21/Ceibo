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
import { useDispatch } from "react-redux";
import { getId } from "../state/id";
import useMatches from "../hooks/useMatches";
import logoGatito from '../assets/gatitoLogo.png';
import logoPerrito from '../assets/perritoLogo.png';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const ShowPets = () => {
  const [pets, setPets] = useState([]);
  const dispatch = useDispatch();
  const handlePet = (id)=>{
    dispatch(getId({type:'pets',id}))
  }

  //false = mobile  ---  true = desktop
  const matches = useMatches()

  if(matches){}
  else{}

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/pets/all")
      .then((res) =>{setPets(res.data)})
      
  }, []);
  return (
    <>
    <div
      style={{
        backgroundColor: "white",
      }}
      >
      <Container sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}>
        <Typography variant="h3" sx={{pl:4}}>Mascotas</Typography>
        <Grid container my={4}>
          {pets?.map((mascota) => {
            return(
            <Link onClick={()=>{handlePet(mascota._id)}} to={`/mascotas/${mascota.name}`} key={mascota._id} style={{textDecoration:'none', margin:'0px auto', minWidth:295}}>
              <Grid item xs={12} p={2} key={mascota._id}>
                <Card>
                  <CardMedia>
                    <img src={mascota.photos[0]} alt="" width='100%'/>
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {mascota.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {mascota.specie === 'perro' ? <img src={logoPerrito} width="50" height="50" alt="perrito"   />:<img src={logoGatito} width="40" height="40"  alt="gatito" />}</Typography>
                    <Typography variant="body4" color="text.secondary">
                      {mascota.gender === 'hembra'?<FemaleIcon sx={{width:40, height:40}}/>:<MaleIcon sx={{width:40, height:40}}/>}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                      {mascota.foundation}
                    </Typography> */}
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

export default ShowPets;
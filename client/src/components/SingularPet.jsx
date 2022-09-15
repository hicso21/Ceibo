import { Button, Card, CardMedia, IconButton, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios'
import { setUser } from '../state/user';
import { getOnePet } from '../state/pets';

const SingularPet = () => {
    const {pathname} = useLocation()
    const [favorites, setFavorites] = useState(false)
    const user = useSelector((state)=>state.user)
    const pet = useSelector((state)=>state.pets[0])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let fav;

    const handleFavorites = (pet) => {
        if(favorites){
            axios.put(`http://localhost:3001/api/user/favorites/remove/${user._id}`, pet).then((r)=>{dispatch(setUser(r.data))})
            setFavorites(false)
            fav = <><StarBorderIcon sx={{height:40, width:40}}/></>
        }else{
            axios.put(`http://localhost:3001/api/user/favorites/add/${user._id}`, pet).then((r)=>{console.log(r.data);dispatch(setUser(r.data))})
            setFavorites(true)
            fav = <><StarIcon sx={{height:40, width:40}}/></>
        }
    }

    const handleAdopt = () => {
        if(!user.email) navigate('/login')
        else navigate("/adoptionForm");
    }

    const buttonStyle = {
        bgcolor: "#FFD640",
        mt: 2,
        mb: 4,
        borderRadius: 10,
    };

    if(favorites){
        fav = <><StarIcon sx={{height:40, width:40}}/></>
    }else {
        fav = <><StarBorderIcon sx={{height:40, width:40}}/></>
    }

    useEffect(()=> {
        dispatch(getOnePet(pathname.substring(10)))
        if(user._id){
        axios.get(`http://localhost:3001/api/user/favorites/${user._id}`)
        .then((res)=>{
            console.log(res.data)
            if(res.data.find(e=>e._id === pet?._id)) setFavorites(true) 
        })
        }
    },[])

  return (
    <>
        <br/>
        <Container sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <CardMedia sx={{padding:0, borderRadius:10, maxWidth:'343'}}>
                    <img
                        alt=''
                        src={pet?.photos[0]}
                        width='100%'
                        id='petPhoto'
                    />
                    <Button onClick={()=>handleFavorites(pet)} sx={{color:'inherit', ml:'80%'}}>
                        {fav} 
                    </Button>
                </CardMedia>
                <Card sx={{borderRadius:5}}>
                    <Stack padding={2} sx={{maxWidth:'100%'}}>
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <Typography variant='h4' width={'20%'} paddingLeft={2}>{pet?.name}</Typography>
                            <Typography variant='h4' id='genero'>{pet?.gender === 'hembra'?<FemaleIcon sx={{width:40, height:40}}/>:<MaleIcon sx={{width:40, height:40}}/>}</Typography>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <Typography variant='body' width={'100%'} paddingLeft={2}>{`Edad: ${pet?.age}`}</Typography>
                            <Typography variant='body' id='tamanio'>{pet?.size}</Typography>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'row', paddingLeft:1}}>
                            <Typography><LocationOnIcon sx={{paddingTop:1}}/>{pet?.location}</Typography>
                        </Box>
                        
                    </Stack>
                </Card>
                <Card sx={{borderRadius:5, marginTop:3}}>
                    <Box sx={{padding:2}}>
                        <Typography variant='h6'>
                            <AssignmentIcon sx={{paddingTop:1, width:30}}/> Descripcion:
                        </Typography>
                        <Typography sx={{paddingTop:2, pl:2}}>
                            {pet?.history}
                        </Typography>
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <Typography sx={{paddingTop:2, pl:2}}>
                                Castrado{pet?.neutered?<CheckIcon sx={{pt:1}}/>:<CloseIcon sx={{pt:1}}/>}
                            </Typography>
                            <Typography sx={{paddingTop:2, pl:12}}>
                                Vacunado{pet?.vaccinated?<CheckIcon sx={{pt:1}}/>:<CloseIcon sx={{pt:1}}/>}
                            </Typography>
                        </Box>
                    </Box>
                </Card>
                <Button color='inherit' sx={buttonStyle} onClick={handleAdopt}>Adoptar</Button>
        </Container>
    </>
  );
};

export default SingularPet;

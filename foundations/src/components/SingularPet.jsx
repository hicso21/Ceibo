import { Button, Card, CardMedia, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React from 'react'
import { useSelector } from "react-redux";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const SingularPet = () => {
    let infoView = useSelector((state)=>state.id);

    const buttonStyle = {
        bgcolor:'#FFD640',
        mb:4,
        borderRadius:10
    }
      
    return (
    <>
        <br/>
        <Container sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <CardMedia sx={{padding:0, borderRadius:10, maxWidth:'343'}}>
                    <img
                    alt=''
                    src={infoView.photos}
                    width='100%'
                    id='petPhoto'
                    />
                </CardMedia>
                <br/>
                <Card sx={{borderRadius:5}}>
                    <Stack padding={2} sx={{maxWidth:'100%'}}>
                        <Box sx={{display:'flex', flexDirection:'row'}} fullWidth>
                            <Typography variant='h4' width={'20%'} paddingLeft={2}>{infoView.name}</Typography>
                            <Typography variant='h4' id='genero'>{infoView.gender === 'hembra'?<FemaleIcon sx={{width:40, height:40}}/>:<MaleIcon sx={{width:40, height:40}}/>}</Typography>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'row'}} fullWidth>
                            <Typography variant='body' width={'100%'} paddingLeft={2}>{`Edad: ${infoView.age}`}</Typography>
                            <Typography variant='body' id='tamanio'>{infoView.size}</Typography>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'row', paddingLeft:1}} fullWidth>
                            <Typography><LocationOnIcon sx={{paddingTop:1}}/>{infoView.location}</Typography>
                        </Box>
                        
                    </Stack>
                </Card>
                <Card sx={{borderRadius:5, mt:3, maxHeight:220, mb:2}}>
                    <Box sx={{padding:2}}>
                        <Typography variant='h6'>
                            <AssignmentIcon sx={{paddingTop:1, width:30}}/> Descripcion:
                        </Typography>
                        <Typography sx={{paddingTop:2, pl:2}}>
                            {infoView.history}
                        </Typography>
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <Typography sx={{paddingTop:2, pl:2}}>
                                Castrado{infoView.neutered?<CheckIcon sx={{pt:1}}/>:<CloseIcon sx={{pt:1}}/>}
                            </Typography>
                            <Typography sx={{paddingTop:2, pl:12}}>
                                Vacunado{infoView.vaccinated?<CheckIcon sx={{pt:1}}/>:<CloseIcon sx={{pt:1}}/>}
                            </Typography>
                        </Box>
                    </Box>
                </Card>
                <Button color='inherit' fullWidth sx={buttonStyle}>Adoptar</Button>
        </Container>
    </>
    )
}

export default SingularPet
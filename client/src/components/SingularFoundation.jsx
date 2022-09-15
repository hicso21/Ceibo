import { Card, CardMedia, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useEffect } from 'react';
import { getFoundation } from '../state/foundations';
import { useLocation } from 'react-router';
//import {Carousel} from'react-responsive-carousel';
import Carousel from './Carousel';

// import { ReactDOM } from 'react';
// const DemoCarousel = () =>{
//         return (
//             <Carousel showArrows={true} /* onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb} */>
//                 <div>
//                     <img src="assets/1.jpeg" />
//                     <p className="legend">Legend 1</p>
//                 </div>
//                 <div>
//                     <img src="assets/2.jpeg" />
//                     <p className="legend">Legend 2</p>
//                 </div>
//             </Carousel>
//         );
// };


const SingularFoundation = () => {
    const foundation = useSelector((state)=>state.foundations[0])
    const dispatch = useDispatch()
    const {pathname} = useLocation()

    useEffect(()=>{
        dispatch(getFoundation(pathname.substring(13)))
    },[])

    return (
    <>
        <br/>
        <Container>
                <CardMedia sx={{padding:0, borderRadius:10}}>
                    <img
                    alt=''
                    src={foundation?.profile_picture}
                    width='100%'
                    id='petPhoto'
                    />
                </CardMedia>
                <br/>
                <Card sx={{borderRadius:5}}>
                    <Stack padding={2} >
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <Typography variant='h4' width={'100%'} paddingLeft={2}>{foundation?.name}</Typography>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'row'}}>
                            <Typography variant='body' paddingLeft={10}>{foundation?.size}</Typography>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'row', paddingLeft:1}}>
                            <Typography><LocationOnIcon sx={{paddingTop:1}}/>{foundation?.location}</Typography>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'row', paddingLeft:1}}>
                            <Typography variant='body2'><AlternateEmailIcon sx={{paddingTop:1}}/>{foundation?.email}</Typography>
                        </Box>                       
                    </Stack>
                </Card>
                <Card sx={{borderRadius:5, marginTop:3}}>
                    <Box sx={{padding:2}}>
                        <Typography variant='h6'>
                            <AssignmentIcon sx={{paddingTop:1, width:30}}/> Descripcion:
                        </Typography>
                        <Typography sx={{pt:2, pl:2}}>
                            {foundation?.history}
                        </Typography>
                    </Box>
                </Card>
                <Carousel foundation={foundation}/>
                <br/><br/>
        </Container>
    </>
  );
};

export default SingularFoundation;

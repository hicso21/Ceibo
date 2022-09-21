import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from '@mui/system';
import { Box } from '@mui/material';
import useMatches from '../hooks/useMatches';
import { useSelector } from 'react-redux'
import { useState,useEffect } from "react";
import {useLocation } from 'react-router-dom'

export default function History() {
  const user = useSelector(state=>state.user)
  const [adoptados, setAdoptados] = useState([]);
  const {pathname} = useLocation()
    //false = mobile  ---  true = desktop
  const matches = useMatches()

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/user/adopted/${user?._id}`)
      .then((res) => {
        setAdoptados(res.data)
        console.log(res.data)
      })
}, [pathname]);

    if(matches){}
    else{}

    return (
      <>
        <Box sx={{p:3}}>
     
          <Stack>
          <br/>
          <Typography variant='h5'>Adopted Pets</Typography>     
            {adoptados?.map((pet)=>{
              return(
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              >
              <Typography>{pet.name}</Typography>
            </AccordionSummary>
                <AccordionDetails>
              <Typography>Name: {pet.name}</Typography>
              <Typography>Especie: {pet.gender}</Typography>
              <Typography>Tamaño: {pet.size}</Typography>
              <Typography>Vacundo: {pet.vaccinated?"Si":"No"}</Typography>
              <Typography>Castrado: {pet.neuterd?"Si":"No"}</Typography>
            </AccordionDetails>
          </Accordion>
              )
            })}
          </Stack>
        </Box>
      </>
    );
  }
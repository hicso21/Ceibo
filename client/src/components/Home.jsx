import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import React, { useState } from 'react'
import {Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getId } from '../state/id';


function Home(){
  const [pets, setPets] = useState([])
  const [foundations, setFoundations] = useState([])
  const dispatch = useDispatch()

  const handlePet = (id)=>{
    dispatch(getId({type:'pets',id}))
  }

  useEffect(()=>{
    axios.get('http://localhost:3001/api/pets/some')
      .then((pets)=>setPets(pets.data))
    axios.get('http://localhost:3001/api/foundation/some')
      .then((foundations)=>setFoundations(foundations.data))
  },[])

  function TitlebarBelowImageList({items, type}) {
    return (
      <ImageList sx={{ width: 327, height: 235 }} style={{gridTemplateColumns: 340}}>
        {items?.map((item, i) => (
          <Link to={`/${type}/${item.name}`} style={{color: 'inherit', textDecoration:'none'}} key={i} onClick={()=>{handlePet(item._id)}}>
            <ImageListItem sx={{width:'100%'}}>
              <img
                src={item.photos}
                alt={item.name}
                loading="lazy"
                />
              <ImageListItemBar
                title={`Click here to know more about ${item.name}!!`}
                subtitle={<span>{item.foundation}</span>}
                position="below"
                />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    );
  }

  return (
    <>
      <Box sx={{p:3}}>
        <Typography variant='h4' >
          Algunas Mascotas
        </Typography>
        <TitlebarBelowImageList items={pets} type={'pet'}/>
        <Typography variant='h4' >
          Algunas Fundaciones
        </Typography>
        <TitlebarBelowImageList items={foundations} type={'foundation'}/>
      </Box>
    </>
  )
}

export default Home
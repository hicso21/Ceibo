import { Box, Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import React, { useState } from 'react'
import {Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getId } from '../state/id';
import useMatches from '../hooks/useMatches';


function Home(){
  const [pets, setPets] = useState([])
  const [foundations, setFoundations] = useState([])
  const dispatch = useDispatch()

  //false = mobile  ---  true = desktop
  const matches = useMatches()

  //style variables
  let ImageStyle
  let BoxStyle

  if(matches){}
  else{
    BoxStyle = {p:2, pt:3, display:'flex', flexDirection:'column', alignItems:'center', margin:'auto 0px', width:'100%'}
    ImageStyle = { width: 327, height: 235, display:'flex', flexDirection:'column' }
  }

  const handlePet = (id)=>{
    dispatch(getId({type:'pets',id}))
  }

  const handleFoundation = (id)=>{
    dispatch(getId({type:'foundation',id}))
  }

  useEffect(()=>{
    axios.get('http://localhost:3001/api/pets/some')
      .then((pets)=>setPets(pets.data))
    axios.get('http://localhost:3001/api/foundation/some')
      .then((foundations)=>setFoundations(foundations.data))
  },[])

  function ImageListPets({items, type}) {
    console.log(foundations)
    return (
      <ImageList sx={ImageStyle}>
        {items?.map((item, i) => (
          <Link to={`/${type}/${item.name}`} style={{color: 'inherit', textDecoration:'none'}} key={i} onClick={()=>{handlePet(item._id)}}>
            <ImageListItem sx={{width:'100%', justifyContent:'center'}}>
              <img
                src={item.photos}
                alt={item.name}
                loading="lazy"
                width={'100%'}
                />
              <ImageListItemBar
                title={`Haz click aqui para conocer a ${item.name}!!`}
                subtitle={<span>{item.foundation}</span>}
                position="below"
                />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    );
  }

  function ImageListFoundations({items, type}) {
    return (
      <ImageList sx={ImageStyle}>
        {items?.map((item, i) => (
          <Link to={`/${type}/${item.name}`} style={{color: 'inherit', textDecoration:'none'}} key={i} onClick={()=>{handleFoundation(item._id)}}>
            <ImageListItem sx={{width:'100%', justifyContent:'center'}}>
              <img
                src={item.profile_picture}
                alt={item.name}
                loading="lazy"
                />
              <ImageListItemBar
                title={`Haz click aqui para conocer a ${item.name}!!`}
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
      <Container sx={BoxStyle}>
        <Typography variant='h4' >
          Algunas Mascotas
        </Typography>
        <ImageListPets items={pets} type={'mascotas'}/>
        <Typography variant='h4' >
          Algunas Fundaciones
        </Typography>
        <ImageListFoundations items={foundations} type={'fundaciones'}/>
      </Container>
      <br/>
      <br/>
    </>
  )
}

export default Home
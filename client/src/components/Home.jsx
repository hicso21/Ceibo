import { Box, Container, ImageList, ImageListItem, ImageListItemBar, Card, CardContent } from '@mui/material'
import React, { useState } from 'react'
import {Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import useMatches from '../hooks/useMatches';

function Home() {
  const [pets, setPets] = useState([]);
  const [foundations, setFoundations] = useState([]);
  const dispatch = useDispatch();

  //false = mobile  ---  true = desktop
  const matches = useMatches()

  //style variables
  let TitlePetsStyle
  let TitleFoundationsStyle
  let ImageStyle
  let ImageStylePets
  let ImageStyleFoundation
  let ImageListStylePets
  let ImageListStyleFoundation
  let BoxStyle
  let CardStyle
  let variant

  if(matches){
    variant = 'h3'
    TitlePetsStyle = {paddingLeft: "10%", paddingBottom: "2%"}
    TitleFoundationsStyle = {paddingLeft: "10%", paddingBottom: "2%", paddingTop: "4%"}
    CardStyle = { maxWidth: "80%", margin: "0 auto", borderRadius: "17px"}
    ImageStyle = { width: '90%', height: '40%', display:'flex', flexDirection:'row', margin:'auto'}
    ImageStylePets = {maxHeight: 300, borderRadius:15, width:200}
    ImageListStyleFoundation = { width: '100%', height: '50%', display:'flex', flexDirection:'row'}
    ImageStyleFoundation = {maxHeight:300, width:200, borderRadius:15}
  }
  else{
    variant = 'h4'
    BoxStyle = {p:2, pt:3, display:'flex', flexDirection:'column', alignItems:'center', margin:'auto 0px', width:'100%'}
    TitlePetsStyle = { paddingBottom: "4%", paddingTop: "6%"}
    TitleFoundationsStyle = { paddingBottom: "4%", paddingTop: "6%"}
    CardStyle = { maxWidth: "80%", margin: "0 auto", borderRadius: "17px"}
    ImageStyle = { width: 327, height: 235, display:'flex', flexDirection:'column', alignItems:'center'}
    ImageStylePets = { maxHeight: 300, borderRadius:15, width: 200}
    ImageListStyleFoundation = { width: 327, height: 235, display:'flex', flexDirection:'column'}
    ImageStyleFoundation = { maxHeight:300, borderRadius:15, width: 200}
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/pets/some")
      .then((pets) => setPets(pets.data));
    axios
      .get("http://localhost:3001/api/foundation/some")
      .then((foundations) => setFoundations(foundations.data));
  }, []);

  function ImageListPets({ items, type }) {
    return (
      <ImageList sx={ImageStyle} className='imageList'>
        {items?.map((item, i) => {
        return(
          <Link to={`/${type}/${item._id}`} style={{color: 'inherit', textDecoration:'none',  padding: 5, width:200}} key={i}>
            <ImageListItem>
              <img
                src={item.photos}
                alt={item.name}
                loading="lazy"
                style={ImageStylePets}
                />
              <ImageListItemBar
                title={`Haz click aqui para conocer a ${item.name}!`}
                subtitle={<span>{item.foundation.name}</span>}
                position="below"
              />
            </ImageListItem>
          </Link>
        )})}
      </ImageList>
    );
  }

  function ImageListFoundations({ items, type }) {
    return (
      <ImageList sx={ImageStyle} className='imageList'>
        {items?.map((item, i) => (
          <Link to={`/${type}/${item._id}`} style={{color: 'inherit', textDecoration:'none',  padding: 5, width:200}} key={i}>
            <ImageListItem >
              <img
                src={item.profile_picture}
                alt={item.name}
                loading="lazy"
                style={ImageStyleFoundation}
                />
              <ImageListItemBar
                title={`Fundacion ${item.name}`}
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
        <Typography variant={variant} style={TitlePetsStyle}>
          Algunas mascotas...
        </Typography>
        <Card style={CardStyle}>
        <CardContent>
        <ImageListPets items={pets} type={'mascotas'}/>
        </CardContent>
        </Card>
        <Typography variant={variant} style={TitleFoundationsStyle} >
          Algunas fundaciones...
        </Typography>
        <Card style={CardStyle}>
        <CardContent>
        <ImageListFoundations items={foundations} type={'fundaciones'}/>
        </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Home;

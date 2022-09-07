import { Button, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import React from 'react'
import {Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';


const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      name: 'Chicho',
      fundation: 'fundation name',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      name: 'Firu',
      fundation: 'fundation name',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      name: 'Tito',
      fundation: 'fundation name',
    }
  ];
  
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function TitlebarBelowImageList({items}) {
    return (
      <ImageList sx={{ width: 370, height: 235 }} style={{gridTemplateColumns: 340}}>
        {items.map((item, i) => (
          <Link to={`/${item.name}`} style={{color: 'inherit', textDecoration:'none'}} key={i}>
            <ImageListItem >
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                />
              <ImageListItemBar
                title={`Click here to know more about ${item.name}!!`}
                subtitle={<span>{item.fundation}</span>}
                position="below"
                />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    );
}

export default function Home(){
  return (
    <>
        <DrawerHeader />
        <Typography variant='h4' >
          Some Pets
        </Typography>
        <TitlebarBelowImageList items={itemData}/>
        <Typography variant='h4' >
          Some Fundations
        </Typography>
        <TitlebarBelowImageList items={itemData}/>
    </>
  )
}


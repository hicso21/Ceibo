import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import useMatches from '../hooks/useMatches';


function Home(){
  const [pets, setPets] = useState([])
  const [foundations, setFoundations] = useState([])
  const dispatch = useDispatch()

  //false = mobile  ---  true = desktop
  const matches = useMatches()

  //style variables


  if(matches){}
  else{

  }


  

  return (
    <>
      <Box>
        agdf
      </Box>
    </>
  )
}

export default Home
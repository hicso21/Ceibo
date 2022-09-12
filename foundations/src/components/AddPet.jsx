import { Container, FormControl, Paper, MenuItem, Select, TextField, Typography, FormControlLabel, Switch, TextareaAutosize, Button } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import axios from 'axios';

const AddPet = () => {

  const [genre, setGenre] = useState(false)
  const [name, setName] = useState('')
  const [specie, setSpecie] = useState('')
  const [size, setSize] = useState('')
  const [age, setAge] = useState(0)
  const [personality, setPersonality] = useState('')
  const [history, setHistory] = useState('')
  const [images, setImages] = useState([])

  const buttonStyle = {
    mt:4,
    bgcolor:'#FFD640',
    mb:2,
    borderRadius:10
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const handleGenre = (e) => {
    if(genre === true) setGenre(false)
    else setGenre(true)
  }
  const handleName = (e) => {setName(e.target.value)}
  const handleSpecie = (e) => {setSpecie(e.target.value)}
  const handleAge = (e) => {setAge(e.target.value)}
  const handleSize = (e) => {setSize(e.target.value)}
  const handlePersonality = (e) => {setPersonality(e.target.value)}
  const handleHistory = (e) => {setHistory(e.target.value)}
  const handleImages = (e) => {setImages(current=>[...current, e.target.value])}

  const handleSubmit = () => {
    axios.post('/api/pets/create', {name, age, history, genre, size, personality, images, specie})
      .then((res)=>{console.log(res)})
  }

  return (
    <>
        <Container sx={{ p: 4, backgroundColor: "#e0e0e0", borderRadius: 1, justifyContent:'center' }}>
          <Typography variant="h3" sx={{display:'flex', justifyContent:'center'}}>
            Nueva
          </Typography>
          <Typography variant="h3" sx={{pb:5 ,display:'flex', justifyContent:'center'}}>
            Mascota
          </Typography>
          <Box sx={{pb:3, justifyContent:'center'}}>
            <Stack>
              <Item>
                Agregar Fotos
              </Item>
            </Stack>
          </Box>
          <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', pb:3}}>
            <Typography variant='body1' sx={{pr:2}}>Nombre: </Typography>
            <TextField
              required
              id="standard-required"
              variant="standard"
              onChange={handleName}
            />
          </Box>
          <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'start'}}>
              <Typography variant='body1' sx={{pr:2}}>Especie: </Typography>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                <Select required onChange={handleSpecie}>
                  <MenuItem value={'perro'}>Perro</MenuItem>
                  <MenuItem value={'gato'}>Gato</MenuItem>
                  <MenuItem value={'otro'}>Otro</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'end'}}>
              <MaleIcon sx={{width:'20%', height:'20%'}}/>
              <Switch
                checked={genre}
                onChange={handleGenre}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <FemaleIcon sx={{width:'20%', height:'20%'}}/>
            </Box>
          </Box>
          <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Typography variant='body1'>Tamaño: </Typography>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                <Select required onChange={handleSize}>
                  <MenuItem value={'Chico'}>Chico</MenuItem>
                  <MenuItem value={'Mediano'}>Mediano</MenuItem>
                  <MenuItem value={'Grande'}>Grande</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Typography sx={{pl:2, pr:2}}>Edad:</Typography>
            <TextField
              required
              id="standard-number"
              type="number"
              variant="standard"
              sx={{width:'10%'}}
              onChange={handleAge}
            />
            <Typography>años</Typography>
            </Box>
          </Box>
          <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', pt:3}}>
            <Typography variant='h6' sx={{pl:2, pr:2}}>Personalidad:</Typography>
            <TextField fullWidth id="fullWidth" sx={{":hover":{bgcolor:"white"}}} size="small" onClick={handlePersonality}/>
          </Box>
          <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', pt:3}}>
            <Typography variant='h6' sx={{pl:2, pr:2}}>Descripcion:</Typography>
            <TextField fullWidth size="small" sx={{":hover":{bgcolor:'white'}}} onChange={handleHistory}/>
          </Box>
          <Button color='inherit' fullWidth sx={buttonStyle} onClick={handleSubmit}>Agregar Mascota</Button>
        </Container>
    </>
  )
}

export default AddPet
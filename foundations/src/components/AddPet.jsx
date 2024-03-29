import {
  Container,
  FormControl,
  Paper,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  TextareaAutosize,
  Button,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import useMatches from "../hooks/useMatches";
import backgroundImage from '../assets/fondo-huellas - Edited.png'

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AddPet = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const matches = useMatches()
  const [gender, setGender] = useState("macho");
  const [name, setName] = useState("");
  const [specie, setSpecie] = useState("");
  const [size, setSize] = useState("");
  const [age, setAge] = useState("");
  const [personality, setPersonality] = useState("");
  const [history, setHistory] = useState("");
  const [images, setImages] = useState({});
  const [switcher, setSwitcher] = useState(false);
  const seleccionArchivos = document.querySelector("#seleccionArchivos");
  const imagenPrevisualizacion = document.querySelector(
    "#imagenPrevisualizacion"
  );

  const buttonStyle = {
    mt: 4,
    bgcolor: "#FFD640",
    mb: 2,
    borderRadius: 10,
    color: "black",
  };

  const AddImageStyle = {
    mt: 4,
    bgcolor: "#FFD640",
    mb: 2,
    borderRadius: 10,
    color: "black",
    ":hover": { bgcolor: "#FFD640" },
  };

  const titulo = {
    display: 'flex',
    borderTop: '4px dotted rgb(238, 197, 84)',
    borderBottom: '4px dotted rgb(238, 197, 84)',
    backgroundColor: 'rgb(255, 255, 234)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }

  const handleGender = (e) => {
    if (switcher === false) setGender("hembra");
    else setGender("macho");
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleSpecie = (e) => {
    setSpecie(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  const handlePersonality = (e) => {
    setPersonality(e.target.value);
  };
  const handleHistory = (e) => {
    setHistory(e.target.value);
  };
  const notification={
  
    notifications:`La fundacion ${user.name} ha agregado una nueva mascota (${specie}) en adopcion llamada ${name}, es ${gender} y tiene ${age} años. ${history}`
  }
  const handleSubmit = () => {

    axios
    .post(
      `http://localhost:3001/api/upload/`, 
      {Base64:images}
    )
    .then(
      (res)=>{
      axios
        .post(
          `http://localhost:3001/api/foundation/${user._id}/add`, 
          {
          name,
          age,
          history,
          gender,
          size,
          personality,
          photos: res.data,
          specie,
          }
        )
        .then(
          () => {
          navigate('/mascotas')
          }
        )
        .then(
          ()=>{
            axios
              .put(`http://localhost:3001/api/user/notifications/add`,notification)
          }
        )
      }
    )
  }

  const handleImage = (e) => {
    const reader = new FileReader()
    const archivos = seleccionArchivos.files;

    if (!archivos || !archivos.length) {
      imagenPrevisualizacion.src = "";
      return;
    }

    reader.addEventListener('loadend', function () {
      imagenPrevisualizacion.src = reader.result
      setImages(reader.result)
    })
    
    reader.readAsDataURL(archivos[0]);

  };

  let bottom
  let title
  let typography

  if(matches){
    bottom = <DrawerHeader/>
    typography = 'h3'
    title = <>
              <Typography
                variant={typography}
                sx={{ mb: 5, display: "flex", justifyContent: "center" }}
                style={titulo}
              >
                Nueva Mascota
              </Typography>
            </>
  }else{
    bottom = <><br /></>
    typography = 'h4'
    title = <>
              <Typography
                variant={typography}
                sx={{ display: "flex", justifyContent: "center" }}
                style={titulo}
              >
                Nueva Mascota
              </Typography>
            </>
  }

  return (
    <>
      <Container
        sx={
          matches?
          {
            p: 4,
            backgroundColor: backgroundImage,
            borderRadius: 1,
            justifyContent: "center",
          }
          :
          {
            p: 4,
            backgroundColor: backgroundImage,
            borderRadius: 1,
            justifyContent: "center",
            pt:7
          }
        }
      >
        <br />
        {title}
        <Box sx={{ justifyContent: "center" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              fullWidth
              variant="contained"
              component="label"
              sx={AddImageStyle}
            >
              <input
                hidden
                type="file"
                id="seleccionArchivos"
                accept="image/*"
                onChange={handleImage}
              />
              Seleeciona una imagen para tu mascota
            </Button>
          </Stack>
          <img id="imagenPrevisualizacion" alt="" style={matches?{maxWidth:500}:{maxWidth:361}}/>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            pb: 3,
          }}
        >
          <Typography variant="body1" sx={{ pr: 2 }}>
            Nombre:{" "}
          </Typography>
          <TextField
            required
            id="standard-required"
            variant="standard"
            onChange={handleName}
            placeholder="Cual es su nombre?"
          />
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Typography variant="body1" sx={{ pr: 2 }}>
              Especie:{" "}
            </Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
              <Select required onChange={handleSpecie}>
                <MenuItem value={"perro"}>Perro</MenuItem>
                <MenuItem value={"gato"}>Gato</MenuItem>
                <MenuItem value={"otro"}>Otro</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <MaleIcon sx={{ width: "20%", height: "20%" }} />
            <Switch
              checked={switcher}
              onChange={() => {
                if (switcher === false) setSwitcher(true);
                else setSwitcher(false);
                handleGender();
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            <FemaleIcon sx={{ width: "20%", height: "20%" }} />
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1">Tamaño: </Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
              <Select required onChange={handleSize}>
                <MenuItem value={"Chico"}>Chico</MenuItem>
                <MenuItem value={"Mediano"}>Mediano</MenuItem>
                <MenuItem value={"Grande"}>Grande</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ pl: 2, pr: 2 }}>Edad:</Typography>
            <TextField
              required
              id="standard-number"
              type="number"
              variant="standard"
              sx={{ width: "10%" }}
              onChange={handleAge}
            />
            <Typography>años</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            pt: 3,
          }}
        >
          <Typography variant="h6" sx={{ pl: 2, pr: 2 }}>
            Personalidad:
          </Typography>
          <TextField
            fullWidth
            id="fullWidth"
            sx={{ ":hover": { bgcolor: "white" } }}
            size="small"
            onChange={handlePersonality}
            placeholder="Escribe en breves palabras la personalidad del animal"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pt: 3,
          }}
        >
          <Typography variant="h6" sx={{ pl: 2, pr: 2 }}>
            Descripcion:
          </Typography>
          <TextField
            fullWidth
            size="small"
            sx={{ ":hover": { bgcolor: "white" } }}
            onChange={handleHistory}
            placeholder="Detalla una descripcion del animal"
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          component="label"
          sx={AddImageStyle}
          onClick={handleSubmit}
        >
          Agregar Mascota
        </Button>
      </Container>
      {bottom}
    </>
  );
};

export default AddPet;

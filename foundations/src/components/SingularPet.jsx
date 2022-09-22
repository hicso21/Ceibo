import { Button, Card, CardMedia, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ResponsiveDialog from "./SingPetDialog";
import { useEffect } from "react";
import { getOnePet } from "../state/pets";
import { useLocation } from "react-router";
import axios from "axios";
/* import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'; */
import { useState } from "react";

const SingularPet = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  let pet = useSelector((state) => state.pets[0]);
  const [emailAdoptante, setEmailAdoptante] = useState("");
  
  const buttonStyle = {
    bgcolor: "#FFD640",
    mb: 4,
    borderRadius: 10,
  };

  useEffect(() => {
    dispatch(getOnePet(pathname.substring(10)));
  }, []);
  
  const handlerClickadopted = (e)=>{
console.log("adoptado");
axios.put(`http://localhost:3001/api/pets/update/${pathname.substring(10)}`, {
 adopted : true
})
/* const user = axios.get(`http://localhost:3001/api/user/${emailAdoptante}`)
axios.put(`http://localhost:3001/api/user/update/${user._id}`, {
 adopted : pet
}) */
}
const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const emailAdoptanteChange = (e) => {
    setEmailAdoptante(e.target.value);
  };

  return (
    <>
      <br />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardMedia sx={{ padding: 0, borderRadius: 10, maxWidth: "343" }}>
          <img alt="" src={pet?.photos} width="100%" id="petPhoto" />
        </CardMedia>
        <br />
        <Card sx={{ borderRadius: 5 }}>
          <Stack padding={2} sx={{ maxWidth: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h4" width={"20%"} paddingLeft={2}>
                {pet?.name}
              </Typography>
              <Typography variant="h4" id="genero">
                {pet?.gender === "hembra" ? (
                  <FemaleIcon sx={{ width: 40, height: 40 }} />
                ) : (
                  <MaleIcon sx={{ width: 40, height: 40 }} />
                )}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                variant="body"
                width={"100%"}
                paddingLeft={2}
              >{`Edad: ${pet?.age} años`}</Typography>
              <Typography variant="body" id="tamanio">
                {pet?.size}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", paddingLeft: 1 }}>
              <Typography>
                <LocationOnIcon sx={{ paddingTop: 1 }} />
                {pet?.location}
              </Typography>
            </Box>
          </Stack>
        </Card>
        <Card sx={{ borderRadius: 5, mt: 3, maxHeight: 220, mb: 2 }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6">
              <AssignmentIcon sx={{ paddingTop: 1, width: 30 }} /> Descripcion:
            </Typography>
            <Typography sx={{ paddingTop: 2, pl: 2 }}>
              {pet?.history}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ paddingTop: 2, pl: 2 }}>
                Castrado
                {pet?.neutered ? (
                  <CheckIcon sx={{ pt: 1 }} />
                ) : (
                  <CloseIcon sx={{ pt: 1 }} />
                )}
              </Typography>
              <Typography sx={{ paddingTop: 2, pl: 12 }}>
                Vacunado
                {pet?.vaccinated ? (
                  <CheckIcon sx={{ pt: 1 }} />
                ) : (
                  <CloseIcon sx={{ pt: 1 }} />
                )}
              </Typography>
            </Box>
          </Box>
        </Card>
        <ResponsiveDialog buttonStyle={buttonStyle} pet={pet} />
       {pet?.adopted? <Button
        color="inherit"
        fullWidth
        sx={buttonStyle}
       disabled>
        Este perro ya fue adoptado
      </Button> :<Button
        color="inherit"
        fullWidth
        sx={buttonStyle}
        onClick={handlerClickadopted}>
        Adoptar
      </Button> 
       
      } 
      </Container>
    </>
  );
};

export default SingularPet;


/* 
<>
<Button variant="outlined" onClick={handleClickOpen}>
  Completar adopcion
</Button>
<Dialog open={open} onClose={handleClose}>
  <DialogTitle>Adopcion</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Por favor escribirel mail del adoptante
    </DialogContentText>
    <TextField
    onChange={emailAdoptanteChange}
      autoFocus
      margin="dense"
      id="name"
      label="Email Address"
      type="email"
      fullWidth
      variant="standard"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handlerClickadopted}>Completado</Button>
  </DialogActions>
</Dialog></>  */
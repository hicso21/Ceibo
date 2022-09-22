import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import {
  TextField,
  Typography,
  Switch,
  FormControl,
  Divider,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import axios from "axios";
import {useLocation} from 'react-router-dom'

export default function ResponsiveDialog({ buttonStyle, pet }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {pathname} = useLocation()

  const [age, setAge] = useState(pet?.age);
  const [name, setName] = useState(pet?.name);
  const [gender, setGender] = useState(pet?.gender);
  const [location, setLocation] = useState(pet?.location);
  const [neutered, setNeutered] = useState(pet?.neutered);
  const [vaccinated, setVaccinated] = useState(pet?.vaccinated);
  const [size, setSize] = useState(pet?.size);

  //Switch Vacinated
  const handleVaccinated = (e) => {
    vaccinated ? setVaccinated(false) : setVaccinated(true);
  };
  //Switch Neutered
  const handleNeutered = (e) => {
    neutered ? setNeutered(false) : setNeutered(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReturn = () => {
    setOpen(false);
    setName(pet.name);
    setAge(pet.age);
    setGender(pet.gender);
    setLocation(pet.location);
    setNeutered(pet.neutered);
    setVaccinated(pet.vaccinated);
    setSize(pet.size);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleAge = (e) => {
    setAge(e.target.value)
  };

  const handleSubmit = (e) => {
    axios.put(`http://localhost:3001/api/pets/update/${pathname.substring(10)}`, {
      age, 
      name, 
      gender, 
      location, 
      vaccinated, 
      neutered, 
      size,
    })
  }

  useEffect(() => {
    console.log(age, name, gender, location, vaccinated, neutered, size);
  }, [handleClose, handleReturn]);

  return (
    <div>
      <Button
        color="inherit"
        fullWidth
        sx={buttonStyle}
        onClick={handleClickOpen}
      >
        Editar
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Modificar Datos de ${pet?.name}`}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <Box
              id="name"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "end",
                pb: 3,
              }}
            >
              <Typography>Nombre: </Typography>
              <TextField
                defaultValue={pet?.name}
                id="standard-basic"
                variant="standard"
                sx={{ pl: 5 }}
                onChange={handleName}
              />
            </Box>
            <Box
              id="location"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "end",
                pb: 3,
              }}
            >
              <Typography>Ubicacion: </Typography>
              <TextField
                defaultValue={pet?.location}
                id="standard-basic"
                variant="standard"
                sx={{ pl: 5 }}
                onChange={handleLocation}
              />
            </Box>
            <Box
              id="vaccinated"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                pb: 3,
              }}
            >
              <Typography>Vacunado: </Typography>
              <Switch
                checked={vaccinated}
                onChange={handleVaccinated}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Typography sx={{ pl: 5 }}>Castrado: </Typography>
              <Switch
                checked={neutered}
                onChange={handleNeutered}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>
            <Box
              id="size"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "end",
                pb: 5,
              }}
            >
              <Typography>Tamaño: </Typography>
              <FormControl variant="standard" sx={{ pl: 1 }}>
                <Select
                  defaultValue={pet?.size}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                  onChange={handleSize}
                >
                  <MenuItem value={"Chico"}>Chico</MenuItem>
                  <MenuItem value={"Mediano"}>Mediano</MenuItem>
                  <MenuItem value={"Grande"}>Grande</MenuItem>
                </Select>
              </FormControl>
              <Typography sx={{ pl: 2 }}>Genero: </Typography>
              <FormControl variant="standard" sx={{ width: "30%", pl: 1 }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  onChange={handleGender}
                >
                  <MenuItem value={"macho"}>Macho</MenuItem>
                  <MenuItem value={"hembra"}>Hembra</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              id="gender"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>Edad:</Typography>
              <Slider
                sx={{ width: "70%", ml: 6 }}
                onChange={handleAge}
                size="small"
                aria-label="Small"
                valueLabelDisplay="auto"
                max={20}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleReturn();
              handleSubmit();
            }}
          >
            Cancelar
          </Button>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
              handleSubmit();
              window.location.reload()
            }}
          >
            Realizar cambios
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

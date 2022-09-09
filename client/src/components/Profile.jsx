import React from "react";
import axios from "axios";
import {
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import MuiAlert from '@mui/material/Alert';
import { Box } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 55,
}));

const Profile = () => {
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [birth, setBirth] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [secondAddress, setSecondAddress] = React.useState('')

    const handleFirstName = (e)=>{
        setFirstName(e.target.value)
        setOpen(true);
    }

    const handleLastName = (e)=>{
        setLastName(e.target.value)
        setOpen(true);
    }

    const handleBirth = (e)=>{
        setBirth(e.target.value)
        setOpen(true);
    }

    const handleAddress = (e)=>{
        setAddress(e.target.value)
        setOpen(true);
    }

    const handleSecondAddress = (e)=>{
        setSecondAddress(e.target.value)
        setOpen(true);
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
    
    
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpen(false);
    };

  return (
    <>
      <Box sx={{p:3}}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Item>
              <Typography sx={{ paddingTop: 1 }}>Firstname</Typography>
            </Item>
          </Grid>
          <Grid item xs={5}>
              <TextField
          />
          </Grid>
          <Grid item xs={3}>
            <Button sx={{ marginTop: 1, marginLeft: 2 }} onClick={handleFirstName}>
              <CheckIcon />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography sx={{ paddingTop: 1 }}>Lastname</Typography>
            </Item>
          </Grid>
          <Grid item xs={5}>
            <TextField

  />
          </Grid>
          <Grid item xs={3}>
            <Button sx={{ marginTop: 1, marginLeft: 2 }} onClick={handleLastName}>
              <CheckIcon />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography sx={{ paddingTop: 1 }}>BirthDate</Typography>
            </Item>
          </Grid>
          <Grid item xs={5}>
            <TextField

  />
          </Grid>
          <Grid item xs={3}>
            <Button sx={{ marginTop: 1, marginLeft: 2 }} onClick={handleBirth}>
              <CheckIcon />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography>First Address</Typography>
            </Item>
          </Grid>
          <Grid item xs={5}>
            <TextField

  />
          </Grid>
          <Grid item xs={3}>
            <Button sx={{ marginTop: 1, marginLeft: 2 }} onClick={handleAddress}>
              <CheckIcon />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography>Second Address</Typography>
            </Item>
          </Grid>
          <Grid item xs={5}>
            <TextField

  />
          </Grid>
          <Grid item xs={3}>
            <Button sx={{ marginTop: 1, marginLeft: 2 }} onClick={handleSecondAddress}>
              <CheckIcon />
            </Button>
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            The change was succesfully!!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Profile

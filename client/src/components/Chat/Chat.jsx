
import {Fragment} from "react";
import {Container, Paper, Typography, Divider, Grid , List, ListItem, ListItemText, FormControl, TextField, IconButton} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import {Box } from "@mui/system"
import { useState } from "react";
import "./Chat.css"
import { useSelector } from "react-redux";
const { io } = require("socket.io-client");




export default function Chat() {

    const socket = io();

    socket.on("connect", () => {
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      });
      
      socket.on("disconnect", () => {
        console.log(socket.id); // undefined
      });





const { user } = useSelector((state) => state);    

const [chatMessages , setChatMessages] = useState([])
const [message , setMessage] = useState("")
const listChatMessages= chatMessages.map((chatMessageDto ,index)=>{
    <ListItem key={index}>
        <ListItemText primary={`${chatMessageDto.user}:${chatMessageDto.message}`}/>
    </ListItem>
})

const handlerMessageChange = (event)=>{
setMessage(event.target.value)
}

const sendMessage = () =>{
if(user&& message){
    console.log("send msn");
}
}


    return (
      <>
    <Fragment>
        <Container>
            <Paper elevation ={5}>
                <Box p={8}>
                    <Typography variant="h5" gutterBottom>
                        Chat con la fundacion
                    </Typography>
                    <Divider/>
                    <Grid container spacing={4} alignItems="center">
                        <Grid id="chat-window"xs={12}item>
                            <List id="chat-window-messages">
                                {listChatMessages}
                            </List>
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <TextField value={user.name}  variant = "outlined"/>
                            </FormControl>
                        </Grid>
                        <Grid xs={10}item>
                        <FormControl fullWidth>
                                <TextField onChange={handlerMessageChange} 
                                value={message} label="Escribe tu mensaje"  variant = "outlined"/>
                            </FormControl>
                        </Grid>
                        <Grid xs={1}item>
                            <IconButton  aria-label='Enviar' onClick={sendMessage} >
                                <SendIcon/>
                            </IconButton>
                        </Grid>
                    
                    </Grid>
                </Box>
            </Paper>
        </Container>
    </Fragment>
      </>
    );
  }
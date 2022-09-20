import io from "socket.io-client";
import { Fragment } from "react";
import {
  Container,
  Paper,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import { useLocation } from "react-router";

const socket = io("http://localhost:3001");

export default function Chat() {
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });

  const { pathname } = useLocation();
  const fId = pathname.split("/")[2];
  const { user } = useSelector((state) => state);

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handlerMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (user && message) {
      socket.emit("message", { message, user });
      setMessage("");
    }
  };

  useEffect(() => {
    const receiveMessage = (message) => {
      setChatMessages([...chatMessages, message]);
      console.log("receive message", message);
    };
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [chatMessages]);

  return (
    <>
      <Fragment>
        <Container>
          <Paper elevation={5}>
            <Box p={8}>
              <Typography variant="h5" gutterBottom>
                Chat con la fundacion
              </Typography>
              <Divider />
              <Grid container spacing={4} alignItems="center">
                <Grid id="chat-window" xs={12} item>
                  <List id="chat-window-messages">
                    {chatMessages.map((chat, index) => {
                      return (
                        <ListItem key={index}>
                          <ListItemText
                            key={chat.user}
                            primary={`${chat.user}: ${chat.message}`}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
                {/*  <Grid item>
                  <FormControl fullWidth>
                    <TextField value={user.name} variant="outlined" />
                  </FormControl>
                </Grid> */}
                <Grid xs={10} item>
                  <FormControl fullWidth>
                    <TextField
                      onChange={handlerMessageChange}
                      value={message}
                      label="Escribe tu mensaje"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
                <Grid xs={1} item>
                  <IconButton aria-label="Enviar" onClick={handlerSubmit}>
                    <SendIcon />
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

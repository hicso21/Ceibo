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
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import "./Chat.css";
import axios from "axios";

const connectionOptions = {
  "force new connection": true,
  reconnection: true,
  reconnectionDelay: 2000, //starts with 2 secs delay, then 4, 6, 8, until 60 where it stays forever until it reconnects
  reconnectionDelayMax: 60000, //1 minute maximum delay between connections
  reconnectionAttempts: "Infinity", //to prevent dead clients, having the user to having to manually reconnect after a server restart.
  timeout: 10000, //before connect_error and connect_timeout are emitted.
  transports: ["websocket"], //forces the transport to be only websocket. Server needs to be setup as well/
};
const socket = require("socket.io-client")(
  "http://localhost:3001",
  connectionOptions
);

export default function Chat() {
  socket.on("connect", () => {
    //console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("disconnect", () => {
    //console.log(socket.id); // undefined
  });

  const { pathname } = useLocation();

  const { user } = useSelector((state) => state);

  const fId = user._id;
  const uId = pathname.split("/")[2];
  const username = user.name;

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handlerMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (user && message) {
      socket.emit("send-message", { message, uId, fId, username });
      setMessage("");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/messages/${fId}/${uId}`)
      .then((res) => {
        console.log(res.data);
        setChatMessages(res.data);
      });
  }, []);

  useEffect(() => {
    /* socket.on("load-messages", (prevMessages) => {
      console.log("MENSAJES ANTERIORES", prevMessages);
    }); */
    const receiveMessage = (message) => {
      setChatMessages([...chatMessages, message]);
      //console.log("receive message", message);
    };

    socket.on("new-message", receiveMessage);

    return () => {
      socket.off("new-message", receiveMessage);
    };
  }, [chatMessages]);

  return (
    <>
      <Fragment>
        <Container>
          <Paper elevation={5}>
            <Box p={8}>
              <Typography variant="h5" gutterBottom>
                Chat con un usuario
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

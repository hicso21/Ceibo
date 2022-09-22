import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Box } from "@mui/material";
import useMatches from "../hooks/useMatches";

export default function Messages() {
  const [foundations, setFoundations] = useState([]);
  const matches = useMatches();

  let pL
  let pR

  if(matches){
    pL = 10
    pR = 10
  }else{
    pL = 5
    pR = 5
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/foundation/")
      .then((res) => setFoundations(res.data));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "90%",
        width: "100%",
        paddingLeft: pR,
        paddingRight: pL,
      }}
    >
      <Typography
        variant="h4"
        sx={{ justifyContent: "center", display: "flex", mb: 2 }}
      >
        Conversaciones
      </Typography>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          bgcolor: "background.paper",
          pb:0
        }}
      >
        {foundations.map((fundacion) => (
          <Link key={fundacion._id}
            to={`/chat/${fundacion._id}`}
            style={{
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={fundacion.profile_picture} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography ><strong>{fundacion.name}</strong></Typography>}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Último mensaje
                    </Typography>
                    {" — Gracias por contactarte! Te responderemos..."}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Link>
        ))}
      </List>
    </Box>
  );
}

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

export default function Messages() {
  const [foundations, setFoundations] = useState([]);

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
        height: "100%",
        width: "100%",
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 2,
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
        }}
      >
        {foundations.map((fundacion) => (
          <Link
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
                primary={fundacion.name}
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

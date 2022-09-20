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

export default function Messages() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user/all")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        paddingLeft: 30,
        paddingRight: 30,
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
          maxWidth: 360,
          bgcolor: "background.paper",
          mb: 10,
        }}
      >
        {users.map((user) => (
          <Link
            to={`/chat`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="User" src="" />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.name} ${user.last_name}`}
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
                    {" — Hola, buenas tardes! Me gustaría consultar por..."}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Link>
        ))}
      </List>
    </div>
  );
}

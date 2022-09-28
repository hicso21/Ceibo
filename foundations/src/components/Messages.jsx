import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const [users, setUsers] = useState([]);
  const matches = useMatches();
  const user = useSelector((state) => state.user);

  let pL;
  let pR;

  if (matches) {
    pL = 10;
    pR = 10;
  } else {
    pL = 5;
    pR = 5;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/messages/foundation/${user._id}`)
      .then((res) => {
        const reversedData = res.data.reverse();
        console.log(reversedData);
        let result = [];

        reversedData.forEach((item) => {
          let id = item.uId._id;
          let ids = result.map((e) => e.uId._id);
          if (!ids.includes(id)) {
            result.push(item);
          }
        });

        setUsers(result);
      });
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
          pb: 0,
        }}
      >
        {users.map((item) => (
          <Link
            key={item._id}
            to={`/chat/${item.uId._id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="" src={item.uId.profile_picture} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography>
                    <strong>{`${item.uId.name} ${item.uId.last_name}`}</strong>
                  </Typography>
                }
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
                    {` — ${item.user}: ${item.message}`}
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
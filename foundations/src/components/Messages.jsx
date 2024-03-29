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
import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const titulo = {
  display: 'flex',
  borderTop: '4px dotted rgb(238, 197, 84)',
  borderBottom: '4px dotted rgb(238, 197, 84)',
  backgroundColor: 'rgb(255, 255, 234)',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}

export default function Messages() {
  const [foundations, setFoundations] = useState([]);
  const [users, setUsers] = useState([]);
  const matches = useMatches();
  const user = useSelector((state) => state.user);
  

  let pL;
  let pR;
  let typography

  if (matches) {
    pL = 10;
    pR = 10;
    typography = 'h3'
  } else {
    pL = 5;
    pR = 5;
    typography = 'h4'
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/messages/foundation/${user._id}`)
      .then((res) => {
        const reversedData = res.data.reverse();
        let result = [];

        reversedData.forEach((item) => {
          let id = item.uId._id;
          let ids = result.map((e) => e.uId._id);
          if (!ids.includes(id)) {
            result.push(item);
          }
        });
        
        setUsers(result);
        console.log(reversedData)
      });
  }, []);

  return (
    <Box
      sx={{
        minHeight:530,
        paddingTop:6,
        width: "100%",
        paddingLeft: pR,
        paddingRight: pL,
      }}
    >
      <Typography
        variant={typography}
        sx={{ justifyContent: "center", display: "flex", mb: 2 }}
        style={titulo}
      >
        Conversaciones
      </Typography>
      {users ? (
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
          {users?.map((item, i) => (
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
                    <strong>{item.uId.name}</strong>
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
            {users.length-1 === i?<></>:<Divider variant="inset" component="li" />}
          </Link>
          ))}
        </List>
      ) : (
        <div>
          <Typography
            variant="h4"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          >
            Aún no tienes conversaciones
          </Typography>
        </div>
      )}
      {matches?<></>:<DrawerHeader/>}
    </Box>
  );
}
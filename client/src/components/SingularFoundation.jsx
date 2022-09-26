import {
  Card,
  CardMedia,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useEffect } from "react";
import { getFoundation } from "../state/foundations";
import { useLocation, useNavigate } from "react-router";
import Carousel from "./Carousel";
import { getPetsByFoundation } from "../state/pets";
import useMatches from "../hooks/useMatches";
import { Link } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";

const SingularFoundation = () => {
  const navigate = useNavigate();
  const foundation = useSelector((state) => state.foundations[0]);
  const pets = useSelector((state) => state.pets);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user);

  //false = mobile  ---  true = desktop
  const matches = useMatches();

  //style variables
  let ImageStyle;
  let BoxStyle;

  if (matches) {
  } else {
    BoxStyle = {
      p: 2,
      pt: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto 0px",
      width: "100%",
    };
    ImageStyle = {
      width: 327,
      height: 235,
      display: "flex",
      flexDirection: "column",
    };
  }

  function ImageListPets({ items, type }) {
    return (
      <ImageList sx={ImageStyle}>
        {items?.map((item, i) => {
          return (
            <Link
              to={`/${type}/${item._id}`}
              style={{ color: "inherit", textDecoration: "none" }}
              key={i}
            >
              <ImageListItem sx={{ width: "100%", justifyContent: "center" }}>
                <img
                  src={item.photos}
                  alt={item.name}
                  loading="lazy"
                  width={"100%"}
                />
                <ImageListItemBar
                  title={`Haz click aqui para conocer a ${item.name}!!`}
                  subtitle={<span>{item.foundation.name}</span>}
                  position="below"
                />
              </ImageListItem>
            </Link>
          );
        })}
      </ImageList>
    );
  }

  const handleContact = (fundationId) => {
    if (!user.email) navigate("/login");
    else navigate(`/chat/${fundationId}`);
  };

  useEffect(() => {
    dispatch(getFoundation(pathname.substring(13)));
    dispatch(getPetsByFoundation(pathname.substring(13)));
  }, []);

  return (
    <>
      <br />
      <Container>
        <CardMedia sx={{ padding: 0, borderRadius: 10 }}>
          <img
            alt=""
            src={foundation?.profile_picture}
            width="100%"
            id="petPhoto"
          />
        </CardMedia>
        <br />
        <Card sx={{ borderRadius: 5 }}>
          <Stack padding={2}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h4" width={"100%"} paddingLeft={2}>
                {foundation?.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="body" paddingLeft={10}>
                {foundation?.size}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", paddingLeft: 1 }}>
              <Typography>
                <LocationOnIcon sx={{ paddingTop: 1 }} />
                {foundation?.location}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", paddingLeft: 1 }}>
              <Typography variant="body2">
                <AlternateEmailIcon sx={{ paddingTop: 1 }} />
                {foundation?.email}
              </Typography>
            </Box>
          </Stack>
        </Card>
        <Card sx={{ borderRadius: 5, marginTop: 3 }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6">
              <AssignmentIcon sx={{ paddingTop: 1, width: 30 }} /> Descripcion:
            </Typography>
            <Typography sx={{ pt: 2, pl: 2 }}>{foundation?.history}</Typography>
          </Box>
        </Card>
        <Card sx={{ borderRadius: 5, marginTop: 3 }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h5">
              <PetsIcon sx={{ paddingTop: 1, width: 30 }} /> Mascotas:
            </Typography>
            <ImageListPets items={pets} type={"mascotas"} />
          </Box>
        </Card>
        <Button
        fullWidth
          color="inherit"
          sx={{
            bgcolor: "#FFD640",
            mt: 2,
            borderRadius: 3,
          }}
          onClick={() => handleContact(foundation?._id)}
        >
          {`Contactar con la fundación ${foundation?.name}`}
        </Button>
        <br />
        <br />
      </Container>
    </>
  );
};

export default SingularFoundation;

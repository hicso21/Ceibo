import axios from "axios";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  Box,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useMatches from "../../hooks/useMatches";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/material/styles";
import logoGatito from "../../assets/gatitoLogo.png";
import logoPerrito from "../../assets/perritoLogo.png";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import "./Pets.css";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const ShowPets = () => {
  const [pets, setPets] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //false = mobile  ---  true = desktop
  const matches = useMatches();

  let bottom;
  let gridStyle;

  if (matches) {
    bottom = <DrawerHeader />;
    gridStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    };
  } else {
    bottom = <></>;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/foundation/${user._id}/pets`)
      .then((res) => {
        setPets(res.data);
      });
  }, [user]);

  return (
    <>
      <Box
        sx={{
          p: 5,
          borderRadius: 1,
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          sx={{ display: "flex", justifyContent: "center", pb:3 }}
        >
          Mascotas
        </Typography>
        <Box className="gridContainer">
          {pets?.map((mascota) => {
            let empty
            if(!mascota) empty = <></>
            return (
              <>
                <Link
                  to={`/mascotas/${mascota._id}`}
                  key={mascota._id}
                  style={{ textDecoration: "none" }}
                >
                  <Grid item xs={12} p={2} key={mascota._id}>
                    <Card className="superCard">
                      <CardMedia>
                        <img id="imgPet" src={mascota.photos[0]} alt="" />
                      </CardMedia>
                      <div className="petCard">
                        {mascota?.adopted ? (
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="span"
                            className="petName"
                          >
                            {`${mascota.name} - ADOPTADO`}
                          </Typography>
                        ) : (
                          <Typography
                            gutterBottom
                            variant="h4"
                            component="span"
                            className="petName"
                          >
                            {mascota.name}
                          </Typography>
                        )}

                        <div className="petIconsContainer">
                          <Typography className="icon">
                            {mascota.specie === "perro" ? (
                              <img
                                src={logoPerrito}
                                width="40"
                                height="40"
                                alt="perrito"
                              />
                            ) : (
                              <img
                                src={logoGatito}
                                width="40"
                                height="40"
                                alt="gatito"
                              />
                            )}
                          </Typography>

                          <Typography className="icon">
                            {mascota.gender === "hembra" ? (
                              <FemaleIcon sx={{ width: 40, height: 40 }} />
                            ) : (
                              <MaleIcon sx={{ width: 40, height: 40 }} />
                            )}
                          </Typography>

                          {mascota?.adopted ? (
                            <HomeIcon
                              className="icon"
                              sx={{ width: 40, height: 40 }}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                        {/* <Typography variant="body2" color="text.secondary">
                                  {mascota.foundation}
                                  </Typography> */}
                      </div>
                    </Card>
                  </Grid>
                </Link>
              </>
            );
          })}
        </Box>
      </Box>
      {bottom}
    </>
  );
};

export default ShowPets;

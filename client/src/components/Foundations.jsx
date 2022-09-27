import axios from "axios";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import useMatches from "../hooks/useMatches";
import { getAllFoundations } from "../state/foundations";

const ShowFoundations = () => {
  const foundations = useSelector(state=>state.foundations)
  const dispatch = useDispatch();

  //false = mobile  ---  true = desktop
  const matches = useMatches()

  let imgStyle

  if(matches){
    imgStyle = {objectFit:'cover', minWidth:500}
  }
  else{}

  useEffect(() => {
    dispatch(getAllFoundations())
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
        }}
        >
        <Container sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}>
          <Typography variant="h3" sx={{display:'flex', justifyContent:'center'}}>Fundaciones</Typography>
          <Box container my={4} sx={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
            {foundations?.map((fundacion) => {
              return(
              <Link to={`/fundaciones/${fundacion._id}`} key={fundacion._id} style={{textDecoration:'none', display:'flex', flexDirection:'row', flexWrap:'wrap', alignItems:'center',  maxWidth:576}}>
                <Grid item xs={12} p={2}>
                  <Card>
                    <CardMedia>
                      <img src={fundacion.profile_picture} alt="" style={imgStyle} width='100%'/>
                    </CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {fundacion.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {fundacion.history}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Link>
              )
            })}
          </Box>
        </Container>
      </div>
    </>
  );
};

export default ShowFoundations;

import axios from "axios";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
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

  if(matches){}
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
          <Grid container my={4}>
            {foundations?.map((fundacion) => {
              return(
              <Link to={`/fundaciones/${fundacion._id}`} key={fundacion._id} style={{textDecoration:'none', margin:'0px auto', minWidth:295}}>
                <Grid item xs={12} p={2}>
                  <Card>
                    <CardMedia>
                      <img src={fundacion.profile_picture} alt="" width='100%'/>
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
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default ShowFoundations;

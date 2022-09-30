import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useMatches from "../../hooks/useMatches";
import "./Comentarios.css";
import backgroundImage from '../../assets/fondo-huellas - Edited.png'
import { styled, useTheme, alpha } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Comentarios() {
  const matches = useMatches();

  let typography;
  let secondTypo;
  const user = useSelector((state) => state.user);
  const [comentarios, setComentarios] = useState([]);

  const titulo = {
    display: 'flex',
    borderTop: '4px dotted rgb(238, 197, 84)',
    borderBottom: '4px dotted rgb(238, 197, 84)',
    backgroundColor: 'rgb(255, 255, 234)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/foundation/comments/get/${user._id}`)
      .then((res) => {
        setComentarios(res.data);
      });
  }, []);

  if (matches) {
    typography = "h3";
    secondTypo = 'h4';
  } else {
    typography = "h4";
    secondTypo = "h5";
  }

  return (
    <>
      <div id="comentarios">
        <div className="box" style={{backgroundImage}}>
          <Typography
            className="title"
            variant={typography}
            sx={{ display: "flex", justifyContent: "center", marginBottom:3 }}
            style={titulo}
          >
            Comentarios
          </Typography>
          {!comentarios[0]?<Typography variant={secondTypo} sx={{width:'100%', display:'flex', justifyContent:'center', pt:14}}>Aun no tienes comentarios...</Typography>:comentarios.map((comment, index) => {
            const comentarioSpliteado = comment.split(",");
            return (
              <Accordion key={index} className="accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{comentarioSpliteado[0]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography style={{ wordWrap: "break-word" }}>
                    {comentarioSpliteado[1]}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </>
  );
}

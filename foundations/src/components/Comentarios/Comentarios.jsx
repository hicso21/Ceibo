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
import "./Comentarios.css"

export default function Comentarios() {
  const matches = useMatches();

  let typography;
  const user = useSelector((state) => state.user);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/foundation/comments/get/${user._id}`)
      .then((res) => {
        setComentarios(res.data);
      });
  }, []);
  if (matches) {
    typography = "h3";
  } else {
    typography = "h4";
  }

  return (
    <div className="comentarios">
      <div className="box">
        <Typography
          variant={typography}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Comentarios
        </Typography>
        {comentarios?.map((comment, index) => {
          const comentarioSpliteado = comment.split(",");
          return (
            <Accordion key={index}  className="accordion">
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
  );
}

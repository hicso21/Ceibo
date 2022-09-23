import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from '@mui/system';
import { Box } from '@mui/material';
import useMatches from '../hooks/useMatches';

export default function History() {

    //false = mobile  ---  true = desktop
    const matches = useMatches()

    if(matches){}
    else{}

    return (
      <>
        <Box sx={{p:3}}>
          <Typography variant='h5'>Adopted Pets</Typography>     
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              >
              <Typography>Firulais</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Name: Firulais</Typography>
              <Typography>Date: 7/06/22</Typography>
              <Typography>Breed: Chow Chow</Typography>
              <Typography>Foundation: AyudaCan</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </>
    );
  }
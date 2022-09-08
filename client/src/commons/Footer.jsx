import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  py: 2,
  mt: 'auto',
  boxShadow: 'none',
  backgroundColor: (theme) =>
  theme.palette.mode === 'light'
  ? theme.palette.color = '#1e244b'
      : theme.palette.color = '#04092A',
  color: (theme) =>
  theme.palette.mode === 'light'
  ? theme.palette.color = '#FBFBFA'
  :theme.palette.color = '#FBFBFA'
}

const style2 = {
  py: 5,
  mt: 'auto',
  boxShadow: 'none',
  backgroundColor: (theme) =>
  theme.palette.mode === 'light'
  ? theme.palette.color = '#1e244b'
      : theme.palette.color = '#04092A',
  color: (theme) =>
  theme.palette.mode === 'light'
  ? theme.palette.color = '#FBFBFA'
  :theme.palette.color = '#FBFBFA'
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={style}>
      {'Copyright © '}
      <br/>
      <Link color="inherit" href="https://ceibo.digital/">
        Ceibo Digital
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
    
      <Box>
        <CssBaseline />
        <Box
          component="footer"
          sx={style}
          >
          <Container>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8} >
                <Item sx={style}  className='gridFooter' 
                >
                  <Copyright/>
                </Item>
              </Grid>
              <Grid item xs={6} md={4} >
                <Item sx={style2}
                className='gridFooter'
                >
                  <Link href="https://www.instagram.com/ceibodigital/?hl=es" color='inherit'><InstagramIcon sx={{marginLeft:2}}/></Link>
                  <Link href="https://twitter.com/ceibodigital?lang=es" color='inherit'><TwitterIcon sx={{marginLeft:2}}/></Link>
                  <Link href="https://www.facebook.com/ceibo.digital/" color='inherit'><FacebookIcon sx={{marginLeft:2}}/></Link>
                  </Item>
              </Grid>
            </Grid>
          </Box>
            
          </Container>
        </Box>
      </Box>
    </>
  );
}
import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Grid, ImageList, ImageListItem, ImageListItemBar, ListItemIcon } from '@mui/material';
import logo from '../assets/logoCeibo.png'
import Home from '@mui/icons-material/Home';
import Pets from '@mui/icons-material/Pets';
import Profile from '@mui/icons-material/Person';
import Favorite from '@mui/icons-material/StarRate';
import History from '@mui/icons-material/History';
import Message from '@mui/icons-material/Message';

let loginMenu;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function TitlebarBelowImageList({items}) {
  return (
    <ImageList sx={{ width: 370, height: 235 }} style={{gridTemplateColumns: 340}}>
      {items.map((item, i) => (
        <Link to={`/${item.name}`} style={{color: 'inherit', textDecoration:'none'}} key={i}>
          <ImageListItem >
            <img
              src={item.img}
              alt={item.name}
              loading="lazy"
              />
            <ImageListItemBar
              title={`Click here to know more about ${item.name}!!`}
              subtitle={<span>{item.fundation}</span>}
              position="below"
              />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    name: 'Chicho',
    fundation: 'fundation name',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    name: 'Firu',
    fundation: 'fundation name',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    name: 'Tito',
    fundation: 'fundation name',
  }
];

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const navigate = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    navigate(`/search/${search}`)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  if(!'user') loginMenu = <></>
  else{
    loginMenu =  <>
                  <Link style={{color: 'inherit', textDecoration:'none'}} to={'/favorites'} >
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Favorite/>
                        </ListItemIcon>
                        <ListItemText primary={'Favorites'}/>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link style={{color: 'inherit', textDecoration:'none'}} to={'/history'} >
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <History/>
                        </ListItemIcon>
                        <ListItemText primary={'History'}/>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <Link style={{color: 'inherit', textDecoration:'none'}} to={'/messages'} >
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Message/>
                        </ListItemIcon>
                        <ListItemText primary={'Messages'}/>
                      </ListItemButton>
                    </ListItem>
                  </Link>
                </>
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{backgroundColor:'yellow'}}>
        <Toolbar style={{color:'black'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <form onSubmit={handleSubmit}>
            <Search style={{border:'solid 1px' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
                />
            </Search>
          </form>
          <Button onClick={()=>{navigate('/')}}>            
            <ImageListItem style={{paddingLeft:25}}>
            <img
              src={logo}
              loading="lazy"
              />
            </ImageListItem>
            </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{backgroundColor:'yellow'}}>
          <Typography>{'Nombre de usuario'}</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <List>
          {['Pets', 'Fundations', 'Profile'].map((text, i) => (
            <Link style={{color: 'inherit', textDecoration:'none'}} to={`/${text.toLowerCase()}`} key={i}>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {
                      <>
                      {i == 0 ? <Pets /> : <></>}
                      {i == 1?<Home/> : <></>}
                      {i == 2?<Profile/> : <></>}
                      </>
                    }
                  </ListItemIcon>
                  <ListItemText primary={text}/>
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          {loginMenu}
        </List>
        <Divider/>
        <Grid container spacing={{ xs: 9}}>
          <Grid item><Button onClick={()=>{navigate('/login')}}>Log in</Button></Grid>
          <Grid item><Button onClick={()=>{navigate('/register')}}>Register</Button></Grid>
        </Grid>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography variant='h4' >
          Some Pets
        </Typography>
        <TitlebarBelowImageList items={itemData}/>
        <Typography variant='h4' >
          Some Fundations
        </Typography>
        <TitlebarBelowImageList items={itemData}/>
      </Main>
    </Box>
  );
}

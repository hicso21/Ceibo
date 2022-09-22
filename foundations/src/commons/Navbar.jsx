import * as React from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  ImageListItem,
  ListItemIcon,
  Stack,
} from "@mui/material";
import logo from "../assets/logoCeibo.png";
import Pets from "@mui/icons-material/Pets";
import Home from "@mui/icons-material/Home";
import History from "@mui/icons-material/History";
import Message from "@mui/icons-material/Message";
import Footer from "./Footer";
import {useDispatch, useSelector} from 'react-redux'
import useMatches from "../hooks/useMatches";
import AddIcon from '@mui/icons-material/Add';
import { sendLogoutRequest } from "../state/user";
import { search } from "../state/search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha((theme.palette.color = "#FFD600"), 0.15),
  "&:hover": {
    backgroundColor: alpha((theme.palette.color = "#FFD600"), 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  borderRadius: 20,
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

//paddingRight
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ prop }) {
  //false = mobile  ---  true = desktop
  const matches = useMatches()
  let {pathname} = useLocation()

  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [busqueda, setBusqueda] = React.useState("");
  const user = useSelector((state)=>state.user)
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?search=${busqueda}`);
    dispatch(search(busqueda))
  };

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  const handleLogOut = () => {
    dispatch(sendLogoutRequest())
    navigate('/')
    handleDrawerClose()
  };

  React.useEffect(()=>{if(matches) setOpen(true)},[])

  //style variables
  let appBarStyle 
  let drawerHeader
  let DrawerList
  let SearchStyle
  let ToolbarStyle
  let IconButtonStyle
  let UserNameStyle
  let ButtonLogoStyle
  let DrawerStyle
  let LogoStyle
  let logoutStack
  let logoutButton
  let top
  let openDrawer
  let marginDrawer
  let drawerButton
  let navbarContent
  let PCTStyle
  let DrawerContent
  let main

  //desktop or mobile
  if(matches){
    drawerButton = <></>
    if(pathname = '/') {
      openDrawer = false
      marginDrawer = false
    }
    marginDrawer = true
    openDrawer = true
    logoutButton = {
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#1e244b")
          : (theme.palette.color = "#04092A"),
    }
    logoutStack = {height:'70%', justifyContent:'end'}
    LogoStyle = { padding: 0, maxWidth: 56, justifyContent:'end'}
    ButtonLogoStyle = { paddingLeft: 0,width:'100%' ,display:'flex',justifyContent: "end"}
    PCTStyle = { paddingLeft: 0,width:'100%' ,display:'flex',justifyContent:'start' }
    UserNameStyle = {display:'flex',justifyContent:'center', width:'100%'}
    ToolbarStyle= { paddingRight: 0, maxHeight: 67, display:'flex' }
    IconButtonStyle = { mr: 2, ...(open && { display: "none" }) }
    DrawerStyle = {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
      },
    }
    appBarStyle = {
      position:"fixed",
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#FFFFFF")
          : (theme.palette.color = "#FFFFFF"),
    }
    SearchStyle = {
      borderRadius: 10,
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#F1F2F1")
          : (theme.palette.color = "#1e244b"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#000000")
          : (theme.palette.color = "#000000"),
    }
    DrawerList = {
      height: "100%",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#1e244b")
          : (theme.palette.color = "#04092A"),
    }
    drawerHeader = {
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#000000")
          : (theme.palette.color = "#FFFFFF"),
    }
    top = <>
            <Typography sx={UserNameStyle}>{user.name?user.name:''}</Typography>
          </> 
    if(user.name){
      navbarContent =   <>
                          {drawerButton}
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Search sx={SearchStyle} id='searchDisplay'>
                              <StyledInputBase
                                id="search"
                                placeholder="Buscar…"
                                inputProps={{ "aria-label": "search" }}
                                onChange={handleSearch}
                              />
                            </Search>
                            <Button sx={{ padding: 0 }} onClick={handleSubmit}>
                              <SearchIcon sx={{ color: "black" }} />
                            </Button>
                          </Box>
                          <Button
                            onClick={() => {
                              navigate("/mascotas");
                            }}
                            sx={ButtonLogoStyle}
                          >
                            <ImageListItem
                              sx={LogoStyle}
                            >
                              <img alt="" src={logo} loading="lazy" />
                            </ImageListItem>
                          </Button>
                        </>
    }else{
      navbarContent =   <>
                          <Typography variant='h6' sx={PCTStyle}>
                            Patitas Con Techo
                          </Typography>
                          <Button sx={ButtonLogoStyle}>
                            <ImageListItem sx={LogoStyle}>
                              <img alt="" src={logo} loading="lazy" />
                            </ImageListItem>
                          </Button>
                        </>
    }
    if(user.email){
        DrawerContent = <List sx={DrawerList}>
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to={"/mascotas"}
                            onClick={()=>{if(!matches)handleDrawerClose()}}
                          >
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <Pets />
                                </ListItemIcon>
                                <ListItemText primary={"Mascotas"} />
                              </ListItemButton>
                            </ListItem>
                          </Link>
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to={"/add"}
                            onClick={()=>{if(!matches)handleDrawerClose()}}
                          >
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Agregar Mascotas"} />
                              </ListItemButton>
                            </ListItem>
                          </Link>
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to={"/profile"}
                            onClick={()=>{if(!matches)handleDrawerClose()}}
                          >
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <Home />
                                </ListItemIcon>
                                <ListItemText primary={"Perfil"} />
                              </ListItemButton>
                            </ListItem>
                          </Link>
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to={"/history"}
                            onClick={()=>{if(!matches)handleDrawerClose()}}
                          >
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <History />
                                </ListItemIcon>
                                <ListItemText primary={"Historial"} />
                              </ListItemButton>
                            </ListItem>
                          </Link>
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to={"/messages"}
                            onClick={()=>{if(!matches)handleDrawerClose()}}
                          >
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <Message />
                                </ListItemIcon>
                                <ListItemText primary={"Mensajes"} />
                              </ListItemButton>
                            </ListItem>
                          </Link>
                          <Stack sx={logoutStack}>
                            <Divider/>
                            <Button onClick={handleLogOut} sx={logoutButton}>
                              Cerrar Sesion
                            </Button>
                          </Stack>
                        </List>
    }else{
      DrawerContent = <List sx={DrawerList}>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <Pets />
                                </ListItemIcon>
                                <ListItemText primary={"Mascotas"} />
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Agregar Mascotas"} />
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <Home />
                                </ListItemIcon>
                                <ListItemText primary={"Perfil"} />
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <History />
                                </ListItemIcon>
                                <ListItemText primary={"Historial"} />
                              </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>
                                  <Message />
                                </ListItemIcon>
                                <ListItemText primary={"Mensajes"} />
                              </ListItemButton>
                            </ListItem>
                        </List>
    }
    main =  <>
              <DrawerHeader/>
                {prop}
              <DrawerHeader/>
            </>
  }
  else{
    if(user.email){
      if(!open){
        drawerButton =
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={IconButtonStyle}
                    >
                      <MenuIcon />
                    </IconButton>
      }else{
        drawerButton=<></>
      }
    }
    
    marginDrawer = false
    openDrawer = open
    LogoStyle = { padding: 0, maxWidth: 56}
    ButtonLogoStyle = { paddingLeft: 0,width:'50%' ,justifyContent: "center"}
    UserNameStyle = {display:'flex',justifyContent:'center', width:'100%'}
    ToolbarStyle= { paddingRight: 0, maxHeight: 67, display:'flex' }
    IconButtonStyle = { mr: 2, ...(open && { display: "none" }) }
    PCTStyle = { p:2 }
    DrawerStyle = {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
      },
    }
    appBarStyle = {
      position:"fixed",
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#FFFFFF")
          : (theme.palette.color = "#FFFFFF"),
    }
    SearchStyle = {
      borderRadius: 10,
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#F1F2F1")
          : (theme.palette.color = "#1e244b"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#000000")
          : (theme.palette.color = "#000000"),
    }
    DrawerList = {
      pt:'0px',
      height: "100%",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#1e244b")
          : (theme.palette.color = "#04092A"),
    }
    drawerHeader = {
      height:73.48,
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? (theme.palette.color = "##FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#000000")
          : (theme.palette.color = "#FFFFFF"),
    }
    top = <>
            <Typography sx={UserNameStyle}>{user.name?user.name:''}</Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </> 
    if(user.name){
      navbarContent =   <>
                          {drawerButton}
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Search sx={SearchStyle} id='searchDisplay'>
                              <StyledInputBase
                                id="search"
                                placeholder="Buscar…"
                                inputProps={{ "aria-label": "search" }}
                                onChange={handleSearch}
                              />
                            </Search>
                            <Button sx={{ padding: 0 }} onClick={handleSubmit}>
                              <SearchIcon sx={{ color: "black" }} />
                            </Button>
                          </Box>
                          <Button
                            onClick={() => {
                              navigate("/mascotas");
                            }}
                            sx={ButtonLogoStyle}
                          >
                            <ImageListItem
                              sx={LogoStyle}
                            >
                              <img alt="" src={logo} loading="lazy" />
                            </ImageListItem>
                          </Button>
                        </>
    }else{
      navbarContent =   <>
                          <Typography variant='h6' sx={PCTStyle}>
                            Patitas Con Techo
                          </Typography>
                          <Button sx={ButtonLogoStyle}>
                            <ImageListItem sx={LogoStyle}>
                              <img alt="" src={logo} loading="lazy" />
                            </ImageListItem>
                          </Button>
                        </>
    }
    DrawerContent = <List sx={DrawerList}>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to={"/mascotas"}
                        onClick={()=>{if(!matches)handleDrawerClose()}}
                      >
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <Pets />
                            </ListItemIcon>
                            <ListItemText primary={"Mascotas"} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to={"/add"}
                        onClick={()=>{if(!matches)handleDrawerClose()}}
                      >
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Agregar Mascotas"} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to={"/profile"}
                        onClick={()=>{if(!matches)handleDrawerClose()}}
                      >
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <Home />
                            </ListItemIcon>
                            <ListItemText primary={"Fundacion"} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to={"/history"}
                        onClick={()=>{if(!matches)handleDrawerClose()}}
                      >
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <History />
                            </ListItemIcon>
                            <ListItemText primary={"Historial"} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to={"/messages"}
                        onClick={()=>{if(!matches)handleDrawerClose()}}
                      >
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <Message />
                            </ListItemIcon>
                            <ListItemText primary={"Mensajes"} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      <Stack sx={logoutStack}>
                        <Divider/>
                        <Button onClick={handleLogOut} sx={logoutButton}>
                          Cerrar Sesion
                        </Button>
                      </Stack>
                    </List>
    main =  <>
              {prop}
            </>
  }


  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar open={openDrawer} sx={appBarStyle}>
          <Toolbar
            style={{ color: "black" }}
            sx={ToolbarStyle}
          >
            {navbarContent}
          </Toolbar>
        </AppBar>
        <Drawer
          sx={DrawerStyle}
          variant="persistent"
          anchor="left"
          open={openDrawer}
        >
          <DrawerHeader sx={drawerHeader}>
            {top}
          </DrawerHeader>
          {DrawerContent}
        </Drawer>
        <Main open={marginDrawer}>
          <DrawerHeader/>
          {main}
          <DrawerHeader/>
          <DrawerHeader/>
          <Footer/>
        </Main>
      </Box>
    </>
  );
}

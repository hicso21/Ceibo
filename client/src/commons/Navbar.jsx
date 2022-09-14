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
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  ImageListItem,
  ListItemIcon,
  Stack,
} from "@mui/material";
import logo from "../assets/logoCeibo.png";
import Home from "@mui/icons-material/Home";
import Pets from "@mui/icons-material/Pets";
import Profile from "@mui/icons-material/Person";
import Favorite from "@mui/icons-material/StarRate";
import History from "@mui/icons-material/History";
import Message from "@mui/icons-material/Message";
import Footer from "./Footer";
import {useDispatch, useSelector} from 'react-redux'
import useMatches from "../hooks/useMatches";
import HomeIcon from '@mui/icons-material/Home';
import { sendLogoutRequest } from "../state/user";
import { useEffect } from "react";

let loginMenu;

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

const drawerWidth = 300;

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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const user = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //false = mobile  ---  true = desktop
  const matches = useMatches()

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

  //desktop or mobile
  if(matches){
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
      height: "100%",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? (theme.palette.color = "#FFD600")
          : (theme.palette.color = "#FFD600"),
      color: (theme) =>
        theme.palette.mode === "light"
          ? (theme.palette.color = "#000000")
          : (theme.palette.color = "#FFFFFF"),
    }
  }
  else{
    LogoStyle = { padding: 0, maxWidth: 56}
    ButtonLogoStyle = { paddingLeft: 0,width:'100%' ,justifyContent: "center"}
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
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?search=${search}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleLogOut = async () => {
    dispatch(sendLogoutRequest())
  };

  !user.email
    ? (loginMenu = (
        <>
          <Divider/>
          <Grid container>
            <Grid item>
              <Button
                onClick={() => {
                  navigate("/login");
                  handleDrawerClose();
                }}
                sx={DrawerList}
              >
                Iniciar Sesion
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  navigate("/register");
                  handleDrawerClose();
                }}
                sx={DrawerList}
              >
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </>
      ))
    : (loginMenu = (
        <>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={"/profile"}
            onClick={()=>{handleDrawerClose()}}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Profile />
                </ListItemIcon>
                <ListItemText primary={"Mi perfil"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={"/favorites"}
            onClick={()=>{handleDrawerClose()}}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary={"Mis favoritos"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={"/history"}
            onClick={()=>{handleDrawerClose()}}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                <ListItemText primary={"Historial de adopción"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={"/messages"}
            onClick={()=>{handleDrawerClose()}}
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
          <Stack>
            <Divider/>
            <Button onClick={()=>{handleLogOut();handleDrawerClose()}} sx={DrawerList}>
              Cerrar Sesion
            </Button>
          </Stack>
        </>
      ));

      

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar open={open} sx={appBarStyle}>
          <Toolbar
            style={{ color: "black" }}
            sx={ToolbarStyle}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={IconButtonStyle}
            >
              <MenuIcon />
            </IconButton>
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
                navigate("/");
              }}
              sx={ButtonLogoStyle}
            >
              <ImageListItem
                sx={LogoStyle}
              >
                <img alt="" src={logo} loading="lazy" />
              </ImageListItem>
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={DrawerStyle}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader sx={drawerHeader}>
            <Typography sx={UserNameStyle}>{`${user.name}`}</Typography>
            <Divider
              sx={{ backgroundColor: "tan" }}
              orientation="vertical"
              variant="middle"
              flexItem
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <List sx={DrawerList}>
            <Link style={{ color: "inherit", textDecoration: "none" }} to={"/"} onClick={()=>{handleDrawerClose()}}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary={"Menu Principal"} />
                </ListItemButton>
              </ListItem>
            </Link>
            {["Mascotas", "Fundaciones"].map((text, i) => (
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={`/${text.toLowerCase()}`}
                onClick={()=>{handleDrawerClose()}}
                key={i}
              >
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {
                        <>
                          {i === 0 ? <Pets /> : <></>}
                          {i === 1 ? <Home /> : <></>}
                        </>
                      }
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            {loginMenu}
          </List>
        </Drawer>
        <Main /* open={open} */sx={{display:'flex', flexDirection:'column'}}>
          <DrawerHeader />
          {prop}
          <Footer sx={{alignItems:'end'}}/>
        </Main>
      </Box>
    </>
  );
}

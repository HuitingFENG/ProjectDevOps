import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.jpg";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import { Menu } from "@mui/icons-material";

const drawerWidth = 240;
const navItems = ["Accueil", "Rechercher"];

const Navbar = (props) => {
  const navigate = useNavigate();

  const loggedin = Boolean(localStorage.getItem("logsuccess"));

  const logoutbtn = () => {
    localStorage.clear();
    navigate("/");
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="headerbar">
      <Box
        onClick={handleDrawerToggle}
        sx={{ textAlign: "center" }}
        component={"div"}
      >
        <NavLink to="/">
          <img className="logo" src={logo} alt="Logo dmax" />
        </NavLink>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                components={Link}
                to={`/${item}`}
                sx={{ textAlign: "center", color: "primary.contrastText" }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
          {loggedin ? (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  components="Add"
                  to={`/Ajouter`}
                  sx={{ textAlign: "center", color: "primary.contrastText" }}
                >
                  <ListItemText primary="Ajouter" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <Button
                  sx={{
                    mx: 2,
                    borderBottom: 2,
                    "&:hover": { borderBottom: 0 },
                  }}
                  component={Link}
                  onClick={logoutbtn}
                  color={"secondary"}
                >
                  {"Se déconnecter"}
                </Button>
              </ListItem>
            </>
          ) : (
            <ListItem disablePadding>
              <ListItemButton
                components="login"
                to={`/Se-connecter`}
                sx={{ textAlign: "center", color: "primary.contrastText" }}
              >
                <ListItemText primary="Se connecter" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} component={"div"}>
      <AppBar component="nav" color={"primary"} position={"static"}>
        <Toolbar sx={{ display: "flex" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <NavLink to="/">
            <img className="logo" src={logo} alt="Logo dmax" />
          </NavLink>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            component={"div"}
          >
            {navItems.map((item) => (
              <Button
                sx={{
                  mx: 2,
                  borderBottom: 2,
                  "&:hover": { borderBottom: 0 },
                }}
                component={Link}
                to={`/${item}`}
                color={"secondary"}
                key={item}
              >
                {item}
              </Button>
            ))}
            {loggedin ? (
              <>
                <Button
                  sx={{
                    mx: 2,
                    borderBottom: 2,
                    "&:hover": { borderBottom: 0 },
                  }}
                  component={Link}
                  to={`/Ajouter`}
                  color={"secondary"}
                >
                  {"Ajouter"}
                </Button>
                <Button
                  sx={{
                    mx: 2,
                    borderBottom: 2,
                    "&:hover": { borderBottom: 0 },
                  }}
                  component={Link}
                  onClick={logoutbtn}
                  color={"secondary"}
                >
                  {"Se déconnecter"}
                </Button>
              </>
            ) : (
              <Button
                sx={{
                  mx: 2,
                  borderBottom: 2,
                  "&:hover": { borderBottom: 0 },
                }}
                component={Link}
                to={`/Se-connecter`}
                color={"secondary"}
              >
                {"Se connecter"}
              </Button>
            )}
          </Box>
          <Button color={"primary"}></Button>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "primary.main",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;

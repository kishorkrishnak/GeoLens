import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

import { logoutUser } from "../../api/auth";
import GoogleLogin from "../GoogleLogin";
import toast from "react-hot-toast";

const pages = [
  {
    label: "Explore",
    link: "/lenses",
  },
  {
    label: "About",
    link: "/about",
  },
];

const Navbar = ({ home }) => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      setting: "Profile",
      action: () => navigate(`/user/${user?._id}`),
    },
    {
      setting: "Your Lenses",
      action: () => navigate(`/user/${user?._id}/lenses`),
    },
    {
      setting: "Logout",
      action: async () => {
        const response = await logoutUser();
        if (response.data.status === "success") {
          setUser(null);
          window.location.reload();
          toast.success("Successfully logged out");
        } else {
          toast.error("Error while logging out");
        }
      },
    },
  ];
  return (
    <AppBar
      color="info"
      elevation={0}
      position="static"
      sx={{
        py: 0.5,
        position: home ? "sticky" : "",
        top: home ? 0 : "",
        zIndex: 100,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="a"
            href="/"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <img
              src="/logo.svg"
              alt="description"
              style={{ width: "30px", height: "auto", borderRadius: "8px" }}
            />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 1,
              mr: 3,
              display: { xs: "none", md: "flex" },
              fontWeight: 500,
              color: "white",
              textDecoration: "none",
            }}
          >
            GeoLens
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => {
                    navigate(page.link);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            component="a"
            href="/"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          >
            <img
              src="/logo.svg"
              alt="description"
              style={{ width: "30px", height: "auto", borderRadius: "8px" }}
            />
          </Box>
          <Typography
            component="a"
            href="/"
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 500,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GeoLens
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => {
                  navigate(page.link);
                  handleCloseNavMenu();
                }}
                sx={{
                  mt: 0.4,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, border: "2px solid white" }}
                >
                  <Avatar alt={user?.name} src={user?.image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.setting}
                    onClick={() => {
                      setting.action();
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textTransform={"none"} textAlign="center">
                      {setting.setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <GoogleLogin />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

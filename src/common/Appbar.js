import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import "./Appbar.css";

import store from 'src/store';
import { persistor } from "src/index"; 

const pages = [
  {
    name: "화물의뢰하기",
    to: "ShipperRequire"
  },
  {
    name: "이용내역보기",
    to: "UseList"
  },
  {
    name: "고객센터",
    to: "Customer"
  },
];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const TOKEN = store.getState().token;
  const USER = store.getState().user;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = async () => {
    await persistor.purge()

    navigate("/", { replace: true })
    alert("로그아웃 되었습니다.")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                싼차만차
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="Open drawer"
                sx={{ mr: 2 }}
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                  <Typography textAlign="center">메인</Typography>
                </MenuItem>

                <MenuItem onClick={() => navigate("/ShipperRequire")}>
                  <Typography textAlign="center">화물의뢰하기</Typography>
                </MenuItem>

                <MenuItem onClick={() => navigate("/UseList")}>
                  <Typography textAlign="center">이용내역보기</Typography>
                </MenuItem>

                <MenuItem onClick={() => navigate("/Customer")}>
                  <Typography textAlign="center">고객센터</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              싼차만차
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.to}
                  onClick={() => navigate(`/${page.to}`)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            {
              TOKEN.accessToken === "" ? 
              <Button color="inherit" href="/LogIn">
                로그인
              </Button>
              :
              <PopupState variant="popover" popupId="login-user-menu">
                {(popupState) => (
                  <>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                      { USER.name }
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>Profile(예시)</MenuItem>
                      <MenuItem onClick={popupState.close}>My account(예시)</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout(예시)</MenuItem>
                    </Menu>
                  </>
                )}                
              </PopupState>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default ResponsiveAppBar;

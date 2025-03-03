import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ background: "#000", minHeight: "48px" }}>
      <Toolbar sx={{ minHeight: "48px", paddingX: "12px", justifyContent: "space-between" }}>
        {/* App Logo */}
        <Typography variant="h6" sx={{ fontSize: "1rem", color: "white" }}>🎧 MoodSyncing</Typography>

        {isMobile ? (
          <>
            {/* 🍔 3-Bar (Hamburger) Menu */}
            <IconButton onClick={handleMenuOpen} sx={{ color: "white", padding: "6px" }}>
              <MenuIcon fontSize="large" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ "& .MuiPaper-root": { backgroundColor: "#191414" } }}>
              <MenuItem onClick={handleMenuClose} component={Link} to="/playlists" sx={menuItemStyle}>Playlists</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/mood" sx={menuItemStyle}>Mood Search</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/logout" sx={{ ...menuItemStyle, color: "#e63946" }}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          /* 🖥️ Desktop Navigation */
          <Box sx={{ display: "flex", gap: "15px" }}>
            <Link to="/playlists" style={navLinkStyle} onMouseOver={hoverEffect} onMouseOut={resetEffect}>Playlists</Link>
            <Link to="/mood" style={navLinkStyle} onMouseOver={hoverEffect} onMouseOut={resetEffect}>Mood Search</Link>
            <Link to="/logout" style={logoutStyle} onMouseOver={logoutHover} onMouseOut={resetEffect}>Logout</Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

// 🌟 Desktop Navigation Styling
const navLinkStyle: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "1rem",
  padding: "6px 10px",
  borderRadius: "6px",
  transition: "all 0.3s ease-in-out",
};

const logoutStyle = { ...navLinkStyle, color: "#e63946" };

// 🌟 Mobile Menu Items Styling
const menuItemStyle = {
  color: "white",
  "&:hover": { backgroundColor: "#1db954" },
};

const hoverEffect = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.backgroundColor = "#1db954";
};

const logoutHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.backgroundColor = "#e63946";
};

const resetEffect = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.backgroundColor = "transparent";
};

export default Header;

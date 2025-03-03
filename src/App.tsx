import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, getAccessToken } from "./SpotifyAuth";
import { Container, Typography, Button, Box, CssBaseline, useMediaQuery } from "@mui/material";

function App() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      navigate("/playlists");
    }
  }, [navigate]);

  return (
    <>
      <CssBaseline /> {/* ✅ Removes default margins & paddings globally */}
      <style>
        {`
          /* ✅ Fix all layout issues */
          *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body, #root {
            width: 100vw;
            height: 100vh;
            overflow: hidden; /* 🚀 No more scrollbars */
            background: linear-gradient(to right, #1db954, #191414);
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "linear-gradient(to right, #1db954, #191414)",
          color: "white",
        }}
      >
        {/* Left Section - Text */}
        <Box
          sx={{
            flex: 1,
            textAlign: "center",
            maxWidth: isMobile ? "100%" : "100%",
            padding: isMobile ? 3 : 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant={isMobile ? "h4" : "h2"} fontWeight="bold" gutterBottom>
            🎵 Mood-Sync
          </Typography>
          <Typography variant={isMobile ? "body1" : "h5"} gutterBottom>
            Your personalized mood-based music playlist generator.
          </Typography>
        </Box>

        {/* Right Section - Button */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={login}
            sx={{
              fontWeight: "bold",
              fontSize: isMobile ? "1rem" : "1.2rem",
              padding: isMobile ? "10px 20px" : "15px 30px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
              "&:hover": {
                backgroundColor: "#0a9d48",
              },
            }}
          >
            🎧 Authorize with Spotify
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default App;

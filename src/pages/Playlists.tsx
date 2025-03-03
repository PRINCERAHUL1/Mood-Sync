import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAccessToken } from "../SpotifyAuth";
import Header from "../components/Header";
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box, CssBaseline, useMediaQuery } from "@mui/material";

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
}

function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = getAccessToken();
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (!token) return;

    const fetchPlaylists = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch playlists.");

        const data = await response.json();
        setPlaylists(data.items);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchPlaylists();
  }, [token]);

  if (error)
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  return (
    <>
      <CssBaseline />
      <style>
        {`
          /* ✅ Removes margins & fixes layout */
          *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body, #root {
            width: 100vw;
            height: 100vh;
            background: linear-gradient(to right, #1db954, #191414);
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
          }
          /* ✅ Hides scrollbar but allows scrolling */
          ::-webkit-scrollbar {
            width: 0px;
            display: none;
          }
          body {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE/Edge */
          }
        `}
      </style>
      <Header />

      {/* ✅ Smooth Background & No Scrollbar on Desktop */}
      <Container
        maxWidth={false}
        sx={{
          flex: 1,
          width: "100%",
          overflowY: "auto",
          padding: "1.5rem",
          background: "transparent",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" gutterBottom>
          🎶 Your Playlists
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {playlists.map((playlist) => (
            <Grid item key={playlist.id} xs={12} sm={4} md={3} lg={3}> {/* ✅ Mobile: 1 card per row, Desktop: 4 per row */}
              <Card
                sx={{
                  backgroundColor: "rgba(40, 40, 40, 0.9)",
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.3)",
                  "&:hover": { transform: "scale(1.03)", transition: "0.2s ease-in-out" },
                  width: "100%", 
                  aspectRatio: "1 / 1",  // ✅ Square card
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {playlist.images.length > 0 && (
                  <CardMedia
                    component="img"
                    image={playlist.images[0].url}
                    alt={playlist.name}
                    sx={{
                      width: "80%",  // ✅ Makes image smaller inside square card
                      height: "auto",
                      marginTop: "15px",
                      borderRadius: "5px",
                    }}
                  />
                )}
                <CardContent
                  sx={{
                    textAlign: "center",
                    padding: "2px",
                    flexGrow: 1, // ✅ Ensures proper spacing inside square card
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: "0.8rem" }}>
                    {playlist.name}
                  </Typography>
                  <Box mt={1}>
                    <Button
                      component={Link}
                      to={`/playlist/${playlist.id}`}
                      variant="contained"
                      color="success"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                        padding: "5px 10px",
                        "&:hover": { backgroundColor: "#0a9d48" },
                      }}
                    >
                      View
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Playlists;

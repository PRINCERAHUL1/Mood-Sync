import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../SpotifyAuth";
import Header from "../components/Header";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CssBaseline,
  Box,
} from "@mui/material";

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

interface Playlist {
  name: string;
}

function PlaylistDetails() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);

  const token = getAccessToken();

  useEffect(() => {
    if (!token || !id) return;

    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch playlist details.");

        const data = await response.json();
        setPlaylist({ name: data.name });
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const fetchTracks = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch playlist tracks.");

        const data = await response.json();
        setTracks(data.items.map((item: any) => item.track));
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchPlaylist();
    fetchTracks();
  }, [token, id]);

  const removeTrack = async (trackId: string) => {
    if (!token || !id) return;

    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tracks: [{ uri: `spotify:track:${trackId}` }],
        }),
      });

      if (!response.ok) throw new Error("Failed to remove track.");

      setTracks((prevTracks) => prevTracks.filter((track) => track.id !== trackId));
    } catch (err) {
      setError((err as Error).message);
    }
  };

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
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {playlist ? playlist.name : "Loading..."}
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {tracks.map((track) => (
            <Grid item key={track.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  backgroundColor: "rgba(40, 40, 40, 0.9)",
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.3)",
                  "&:hover": { transform: "scale(1.03)", transition: "0.2s ease-in-out" },
                  width: "100%",
                  aspectRatio: "1 / 1.2",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {track.album.images.length > 0 && (
                  <CardMedia
                    component="img"
                    image={track.album.images[0].url}
                    alt={track.name}
                    sx={{
                      width: "80%",
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
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: "0.8rem" }}>
                    {track.name}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </Typography>
                  <Box mt={1}>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                        padding: "5px 10px",
                        "&:hover": { backgroundColor: "#d32f2f" },
                      }}
                      onClick={() => removeTrack(track.id)}
                    >
                      Remove
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

export default PlaylistDetails;

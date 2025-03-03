import { useState } from "react";
import { getAccessToken } from "../SpotifyAuth";
import Header from "../components/Header";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const moodToGenre: { [key: string]: string } = {
  happy: "pop",
  sad: "blues",
  energetic: "rock",
  calm: "acoustic",
  relaxed: "chill",
  workout: "workout",
  study: "study",
};

function MoodInput() {
  const [mood, setMood] = useState("");
  const [songs, setSongs] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setSongs([]);

    const token = getAccessToken();
    if (!token) {
      setError("Please log in to Spotify first.");
      return;
    }

    const genre = moodToGenre[mood.toLowerCase()];
    if (!genre) {
      setError("Invalid mood. Try moods like happy, sad, energetic, etc.");
      return;
    }

    const apiUrl = `https://api.spotify.com/v1/recommendations?seed_genres=${genre}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("🎵 Fetched Songs:", data.tracks);
      setSongs(data.tracks);
    } catch (err) {
      setError("Error fetching songs. Please try again later.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1db954, #191414)",
        color: "white",
        paddingBottom: "40px",
        overflow: "hidden",
        width: "100vw",
      }}
    >
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body, html {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            margin: 0;
            padding: 0;
          }
          body::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <Header />
      <Container maxWidth="md">
        <Box textAlign="center" py={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
          🎶 Mood-Based Song Recommendations 
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8 }}>
            Enter your mood and get the perfect playlist!
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems="center"
            mt={3}
          >
            <TextField
              label="Enter your mood..."
              variant="outlined"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                width: { xs: "100%", sm: "60%" },
                mr: { xs: 0, sm: 2 },
                mb: { xs: 2, sm: 0 },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                backgroundColor: "#1db954",
                color: "white",
                fontWeight: "bold",
                width: { xs: "100%", sm: "auto" },
                "&:hover": { backgroundColor: "#17a74b" },
              }}
            >
              Search
            </Button>
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2, fontWeight: "bold" }}>
              {error}
            </Typography>
          )}

          {songs.length > 0 && (
            <Box mt={5}>
              <Typography variant="h4" fontWeight="bold">
                Recommended Songs 🎵
              </Typography>
              <Grid container spacing={3} mt={3}>
                {songs.map((song, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ backgroundColor: "#282828", color: "white" }}>
                      <CardMedia
                        component="img"
                        height="150"
                        image={song.album.images[0]?.url || ""}
                        alt={song.name}
                      />
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold">
                          {song.name}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {song.artists
                            .map((artist: any) => artist.name)
                            .join(", ")}
                        </Typography>
                        <Box mt={2}>
                          <Button
                            variant="contained"
                            color="secondary"
                            href={song.external_urls.spotify}
                            target="_blank"
                            fullWidth
                            sx={{
                              backgroundColor: "#1db954",
                              "&:hover": { backgroundColor: "#17a74b" },
                            }}
                          >
                            Listen on Spotify
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default MoodInput;

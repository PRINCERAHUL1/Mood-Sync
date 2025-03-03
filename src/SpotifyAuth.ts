export const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const REDIRECT_URI = "http://localhost:5173/";
export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const RESPONSE_TYPE = "token";
const EXPIRATION_TIME = 3600 * 1000; // 1 hour in milliseconds

// Login function
export function login() {
  window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-public&show_dialog=true`;
}

// Function to get the access token and set expiration
export function getAccessToken() {
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const token = hashParams.get("access_token");

  if (token) {
    const expirationTime = Date.now() + EXPIRATION_TIME; // Set expiration timestamp
    localStorage.setItem("spotify_access_token", token);
    localStorage.setItem("spotify_token_expiration", expirationTime.toString());
    window.history.replaceState({}, document.title, "/playlists");
  }

  return getValidToken();
}

// Function to check if the token is still valid
export function getValidToken() {
  const storedToken = localStorage.getItem("spotify_access_token");
  const expiration = localStorage.getItem("spotify_token_expiration");

  if (!storedToken || !expiration) {
    return null; // No token or expiration timestamp found
  }

  if (Date.now() > parseInt(expiration)) {
    logout(); // Token expired, clear it
    return null;
  }

  return storedToken;
}

// Logout function
export function logout() {
  localStorage.removeItem("spotify_access_token");
  localStorage.removeItem("spotify_token_expiration");
  window.location.href = "/";
}

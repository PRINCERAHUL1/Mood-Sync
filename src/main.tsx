import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Playlists from "./pages/Playlists";
import MoodInput from "./pages/MoodInput";
import PlaylistDetails from "./pages/PlaylistDetails";
import Logout from "./pages/Logout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router basename="/Mood-Sync">  {/* ✅ Added basename */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/mood" element={<MoodInput />} />
        <Route path="/playlist/:id" element={<PlaylistDetails />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

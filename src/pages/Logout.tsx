import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("spotify_access_token");
    setTimeout(() => navigate("/"));
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
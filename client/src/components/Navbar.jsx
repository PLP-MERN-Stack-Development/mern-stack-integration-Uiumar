import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <Link to="/">MERN Blog</Link>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>Hi, {user.name}</span>
            <Link to="/editor">Create Post</Link>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{ marginLeft: "10px" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

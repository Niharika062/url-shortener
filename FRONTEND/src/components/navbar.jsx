import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      borderBottom: "1px solid #ccc"
    }}>
      <Link to="/" style={{ textDecoration: "none", fontWeight: "bold", fontSize: "20px" }}>
        Shortly
      </Link>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/">Home</Link>
        {user ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const res = await API.get("/api/url/my-urls");
      setUrls(res.data.urls);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(shortUrl);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Welcome, {user?.username} 👋</h2>
        <button onClick={handleLogout} style={{ padding: "8px 16px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <h3>Your Links ({urls.length})</h3>

      {urls.length === 0 ? (
        <p>No links yet. Go to home and shorten your first URL!</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>Original URL</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Short URL</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Clicks</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Copy</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  <a href={url.originalUrl} target="_blank" rel="noreferrer">
                    {url.originalUrl}
                  </a>
                </td>
                <td style={{ padding: "10px" }}>
                  <a href={`http://localhost:4000/${url.shortCode}`} target="_blank" rel="noreferrer">
                    {`localhost:4000/${url.shortCode}`}
                  </a>
                </td>
                <td style={{ padding: "10px" }}>{url.clickCount}</td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => handleCopy(`http://localhost:4000/${url.shortCode}`)}
                    style={{ padding: "5px 10px", cursor: "pointer" }}
                  >
                    {copied === `http://localhost:4000/${url.shortCode}` ? "Copied!" : "Copy"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
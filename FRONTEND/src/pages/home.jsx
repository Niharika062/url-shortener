import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();

  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");
    try {
      const res = await API.post("/api/url/shorten", { originalUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "100px auto", padding: "20px" }}>
      <h1>URL Shortener</h1>
      <p>Shorten your long URLs instantly</p>

      {!user && (
        <p>
          <Link to="/login">Login</Link> to track your links.
        </p>
      )}

      <form onSubmit={handleShorten}>
        <input
          type="url"
          placeholder="Paste your long URL here..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px", cursor: "pointer" }}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {shortUrl && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc" }}>
          <p>Your short URL:</p>
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
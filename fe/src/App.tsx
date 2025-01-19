import { useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShortenUrl = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/shorten`,
        {
          longUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShortUrl(response.data.shortUrl);
      setError("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
      setShortUrl("");
    }
  };

  return (
    <>
      <h1>URL Shortener</h1>
      <div className="card">
        <input
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          style={{
            padding: "0.6em 1.2em",
            borderRadius: "8px",
            fontSize: "1em",
            fontWeight: "500",
            color: "#000",
            border: "1px solid black",
            marginRight: "10px",
          }}
        />
        <button onClick={handleShortenUrl}>Shorten URL</button>
      </div>
      {shortUrl && (
        <p>
          Short URL:{" "}
          <a href={`http://${shortUrl}`} target="_blank">
            {shortUrl}
          </a>
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default App;

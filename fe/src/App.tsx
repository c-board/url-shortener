import { useState } from "react";
import axios from "axios";
import { Bars } from "react-loading-icons";
import "./App.css";

import LoginPage from "./app/login/page";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleShortenUrl = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoginPage />
      <div className="card">
        <input
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="url-input"
        />
        <button
          onClick={handleShortenUrl}
          disabled={isLoading}
          className="shorten-button"
        >
          {isLoading ? (
            <Bars style={{ width: "1em", height: "1em" }} />
          ) : (
            "Shorten URL"
          )}
        </button>
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

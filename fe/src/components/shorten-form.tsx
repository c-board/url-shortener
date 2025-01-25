import { useState } from "react";
import axios from "axios";
import { Bars } from "react-loading-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Copy } from "lucide-react";

export function ShortenForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

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
        if (err.response?.status === 429) {
          setError("Too many requests. Please try again later.");
        } else {
          setError(err.response?.data?.error || "An error occurred");
        }
      } else {
        setError("An unexpected error occurred");
      }
      setShortUrl("");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Paste your long URL to get a short URL
                </p>
              </div>
              <div className="grid gap-2">
                <Input
                  type="text"
                  placeholder="example.com"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  className="url-input"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                onClick={handleShortenUrl}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Bars style={{ width: "1em", height: "1em" }} />
                ) : (
                  "Shorten it!"
                )}
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://w.wallhaven.cc/full/jx/wallhaven-jx2o3w.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
            <div className="relative z-10 flex h-full w-full items-center justify-center">
              {shortUrl && (
                <div className="flex flex-col items-center text-center">
                  <div className="flex flex-col items-center text-center mb-4">
                    <p className="text-lg font-bold text-white">
                      Your short URL
                    </p>
                  </div>
                  <div className="flex  items-center space-x-2 text-white bg-black/50">
                    <Input type="email" placeholder="Email" value={shortUrl} />
                    <Button onClick={handleCopy}>
                      {isCopied ? <Check /> : <Copy />}
                    </Button>
                  </div>
                </div>
              )}
              {error && (
                <div className="block rounded-lg bg-destructive/50 p-4 text-center">
                  <p className="text-sm text-white">{error}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {shortUrl && (
        <div className="block space-y-2 rounded-lg bg-secondary/10 text-center md:hidden">
          <p className="text-sm text-muted-foreground">Short URL generated:</p>

          <div className="flex w-full gap-2">
            <Input
              type="email"
              placeholder="Email"
              value={shortUrl}
              className="flex-1"
            />
            <Button onClick={handleCopy}>
              {isCopied ? <Check /> : <Copy />}
            </Button>
          </div>
        </div>
      )}
      {error && (
        <div className="block rounded-lg bg-destructive/10 p-4 text-center md:hidden">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
}

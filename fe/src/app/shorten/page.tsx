import { ShortenForm } from "@/components/shorten-form";

export default function ShortenPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {/* Links */}
        <a href="/same-page">anchor with data attribute</a>

        {/* Links with target _blank */}
        <a target="_blank" href="https://www.google.com">
          anchor with target _blank and data attribute
        </a>

        {/* Images */}
        <img
          src="https://w.wallhaven.cc/full/6l/wallhaven-6l5kp7.jpg"
          alt="image with data attribute"
          data-mlre-image="this is the image text"
        />
        <img
          src="https://w.wallhaven.cc/full/6l/wallhaven-6l5kp7.jpg"
          alt="image without data attribute"
        />

        {/* Divs */}
        <div
          data-mlre-annotate-title="this is the div title"
          data-mlre-annotate-text="this is the div text"
        >
          div with data attribute
        </div>
        <div>div without data attribute</div>

        {/* Buttons */}
        <button
          data-mlre-annotate-title="this is the button title"
          data-mlre-annotate-text="this is the button text"
        >
          button with data attribute
        </button>
        <button>button without data attribute</button>

        <ShortenForm />
      </div>
    </div>
  );
}

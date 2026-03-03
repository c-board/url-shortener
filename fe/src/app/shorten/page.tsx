import { ShortenForm } from "@/components/shorten-form";

export default function ShortenPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <a href="/data-attribute" data-mlre-link="this is the link text">
          anchor with data attribute
        </a>
        <a href="/no-data-attribute">without data attribute</a>
        <a
          data-mlre-link="this is the link text with target _blank"
          target="_blank"
        >
          anchor with target _blank and data attribute
        </a>

        <div
          data-mlre-annotate-title="this is the div title"
          data-mlre-annotate-text="this is the div text"
        >
          div with data attribute
        </div>
        <div>div without data attribute</div>

        <button data-mlre-button="this is the button text">
          button with data attribute
        </button>
        <button>button without data attribute</button>

        <img
          src="https://w.wallhaven.cc/full/6l/wallhaven-6l5kp7.jpg"
          alt="image with data attribute"
          data-mlre-image="this is the image text"
        />
        <img
          src="https://w.wallhaven.cc/full/6l/wallhaven-6l5kp7.jpg"
          alt="image without data attribute"
        />

        <ShortenForm />
      </div>
    </div>
  );
}

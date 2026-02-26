import { ShortenForm } from "@/components/shorten-form";

export default function ShortenPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <a href="/data-attribute" data-mlre="link">with data attribute</a>
        <a href="/no-data-attribute">without data attribute</a>
        <ShortenForm />
      </div>
    </div>
  );
}

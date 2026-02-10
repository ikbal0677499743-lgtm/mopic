import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
          Mopic
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Create your custom photobook
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/wizard"
            className="rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
          >
            Start Creating
          </Link>
          <Link
            href="/editor"
            className="rounded-md border border-gray-300 px-6 py-3 transition-colors hover:bg-gray-100"
          >
            Open Editor
          </Link>
        </div>
      </div>
    </div>
  );
}

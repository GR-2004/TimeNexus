import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <div className="max-w-7xl">
      <Navbar />
      <h1 className="text-4xl text-underline text-center text-white">
        Hello World!
        </h1>
    </div>
  );
}

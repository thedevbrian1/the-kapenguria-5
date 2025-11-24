import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import type { Route } from "../+types/dashboard";

export default function UserDashboard({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard Home</h1>
      <p>Welcome to your dashboard. This is the main dashboard page.</p>
      {/* You can add dashboard widgets and summary information here */}
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.error(error);
    return (
      <div className="flex flex-col items-center bg-red-50 w-full h-screen">
        <div className="w-80">
          {/* TODO: Use svg sprite */}
          <img src="/no-data-bro.svg" alt="" />
        </div>
        <h1 className="text-red-500 text-2xl md:text-4xl font-bold">
          {error.status} {error.statusText}
        </h1>
        <p className="text-red-500 mt-4">{error.data}</p>
        <Link
          to="."
          className="mt-4 bg-slate-700 hover:bg-orange-700 focus-visible:ring-3 focus-visible:ring-offset-2  focus-visible:ring-white active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white max-w-fit capitalize flex gap-2 items-center group"
        >
          <RotateCcw />
          Try again
        </Link>
      </div>
    );
  } else if (error instanceof Error) {
    console.error(error);
    return (
      <div className="flex flex-col items-center bg-red-50 w-full h-screen">
        <div className="w-80">
          <img src="/no-data-bro.svg" alt="" />
        </div>
        <h1 className="text-red-500 text-2xl md:text-4xl font-bold">Error</h1>
        <p className="text-red-500 mt-4">{error.message}</p>
        <Link
          to="."
          className="mt-4 bg-slate-700 hover:bg-orange-700 focus-visible:ring-3 focus-visible:ring-offset-2  focus-visible:ring-white active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white max-w-fit capitalize flex gap-2 items-center group"
        >
          <RotateCcw />
          Try again
        </Link>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

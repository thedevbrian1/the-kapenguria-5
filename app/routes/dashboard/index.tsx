import { Bike, BookOpen, RotateCcw } from "lucide-react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { DashboardCard } from "~/components/DashboardCard";
import type { Route } from "../+types/dashboard";

export async function loader() {
  return { courses: 20 };
}
export default function IndexUserDashboard({
  loaderData,
}: Route.ComponentProps) {
  let { courses } = loaderData;

  return (
    <div className="md:max-w-xl lg:max-w-6xl">
      <div className="flex justify-end">
        <Link
          to="/dashboard/learning"
          className="bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white flex gap-2 items-center"
        >
          <BookOpen className="group-hover:rotate-90 transition ease-out duration-300" />
          View courses
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {/* <DashboardCard title="Total bikes" body={bikes} /> */}
        <DashboardCard
          title="Total courses"
          body={20}
          borderColor="border-t-purple-500"
        />
        {/* <DashboardCard
          title="Available bikes"
          body={availableBikes}
          borderColor="border-t-green-500"
        /> */}
        <DashboardCard
          title="Total courses"
          body={10}
          borderColor="border-t-yellow-500"
        />
      </div>
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

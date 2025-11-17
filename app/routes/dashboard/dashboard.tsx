import {
  Blocks,
  BookCheck,
  BookOpen,
  Mail,
  RotateCcw,
  User,
} from "lucide-react";
import {
  isRouteErrorResponse,
  Link,
  NavLink,
  Outlet,
  useRouteError,
} from "react-router";
import type { Route } from "../+types/dashboard";

export default function UserDashboard({ loaderData }: Route.ComponentProps) {
  //   let { user } = loaderData;

  let sideNavMenu = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Blocks />,
      id: 1,
    },

    {
      title: "Learning Hub",
      path: "/dashboard/learning",
      icon: <BookOpen />,
      id: 2,
    },

    {
      title: "Profile",
      path: "/dashboard/profile",
      icon: <User />,
      id: 4,
    },
  ];
  return (
    <main className="mt-20 overflow-x-hidden">
      <div className="hidden  md:block min-h-screen md:w-20 fixed top-0 z-20 lg:w-72 bg-gray-300">
        {/* Tablet and desktop nav */}
        <div className="p-6">
          <Link
            to="/"
            className="flex focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-yellow-500 transition ease-in-out duration-300"
          >
            <img src="/logo.png" alt="" />
          </Link>
        </div>
        <ul className="divide-solid divide-y divide-gray-400 w-full flex flex-col overflow-y-auto h-full text-gray-800">
          {sideNavMenu.map((item, index) => (
            <li key={index} className="p-4">
              <NavLink
                to={item.path}
                end
                prefetch="intent"
                className={({ isActive }) =>
                  `w-full flex p-3 gap-2 hover:bg-purple-50 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300 rounded-lg ${
                    isActive
                      ? "bg-green-700 hover:bg-green-700 hover:text-yellow-300 text-white"
                      : ""
                  }`
                }
              >
                {item.icon} {""}{" "}
                <span className="hidden lg:flex">{item.title}</span>
              </NavLink>
            </li>
          ))}

          <li className="mt-auto w-full p-4">
            <NavLink
              to="/contact"
              end
              prefetch="intent"
              className={({ isActive }) =>
                `w-full flex p-3 gap-2 hover:text-orange-500 transition ease-in-out duration-300 ${
                  isActive ? "bg-brand-dark-gray text-white" : ""
                }`
              }
            >
              <Mail /> {""} <span className="hidden lg:flex">Contact us</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="fixed z-10 left-0 right-0 bottom-0 md:hidden landscape:hidden bg-gray-300">
        {/* Mobile nav */}
        <ul className="divide-solid divide-x divide-gray-400 text-gray-800 flex justify-items-center w-full gap-2 overflow-x-auto scrollbar">
          {sideNavMenu.map((item, index) => (
            <li key={index} className="flex-1">
              <NavLink
                to={item.path}
                end
                prefetch="intent"
                className={({ isActive }) =>
                  `w-full flex justify-center p-3 hover:text-orange-500 transition ease-in-out duration-300 ${
                    isActive
                      ? "bg-purple-700 hover:bg-purple-700 hover:text-yellow-300 text-white"
                      : ""
                  }`
                }
              >
                {item.icon}
              </NavLink>
            </li>
          ))}

          <li className="flex-1">
            <NavLink
              to="/contact"
              end
              prefetch="intent"
              className={({ isActive }) =>
                `w-full flex justify-center p-3  hover:text-orange-500 transition ease-in-out duration-300 ${
                  isActive
                    ? "bg-purple-700 hover:bg-purple-700 hover:text-yellow-300 text-white"
                    : ""
                }`
              }
            >
              <Mail />
            </NavLink>
          </li>
        </ul>
      </div>
      <div
        className={`w-full 2xl:max-w-7xl min-h-screen flex-1 px-6  md:ml-24  lg:ml-80 pb-16`}
      >
        {/* <div className="mt-12">
          <p className="capitalize">Hi {user.firstName}</p>
        </div> */}
        <div className="mt-16">
          <Outlet />
        </div>
      </div>
    </main>
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

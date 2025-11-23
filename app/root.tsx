import {
  data,
  Form,
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useNavigation,
} from "react-router";
import toast, { Toaster } from "react-hot-toast";

import type { Route } from "./+types/root";
import "./app.css";
import { getUser } from "./.server/supabase";
import { getSession, sessionStorage } from "./.server/session";
import { useEffect } from "react";
import { getUserByUserId } from "./models/user";
import { ArrowRight, LogOut, Menu, User, X } from "lucide-react";
import { Button } from "./components/ui/button";
import { navLinks } from "./utils";
import { LoaderIcon } from "./components/Icons";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  let session = await getSession(request);
  let toastMessage = session.get("toastMessage");

  let { user, headers: userHeaders } = await getUser(request);
  let userId = user?.id;
  let userEmail = user?.email;

  let role = "USER";

  if (userId) {
    let dbUser = await getUserByUserId(userId);

    console.log({ dbUser });
    // role = dbUser?.role;
  }

  let allHeaders = {
    ...Object.fromEntries(userHeaders.entries()),
    "Set-Cookie": await sessionStorage.commitSession(session),
  };
  return data(
    { toastMessage, userId, userEmail, role },
    {
      headers: allHeaders,
    }
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  let loaderData = useLoaderData();

  let role = loaderData?.role;
  let isAdminUser = role === "ADMIN";

  let navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";
  let isLoading = navigation.state === "loading";

  let location = useLocation();
  let pathName = location.pathname;

  useEffect(() => {
    if (!loaderData?.toastMessage) {
      return;
    }

    let { message, type } = loaderData?.toastMessage;

    switch (type) {
      case "success": {
        toast.success(message);
        break;
      }
      case "error": {
        toast.error(message);
        break;
      }
      default: {
        throw new Error(`${type} is not handled`);
      }
    }
  }, [loaderData?.toastMessage]);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <nav className="fixed right-0 left-0 top-0 z-10 flex items-center justify-between px-6 md:px-10 py-6 bg-gray-200/70 backdrop-blur-sm">
            <Link
              to="/"
              className="flex focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-yellow-500 transition ease-in-out duration-300"
            >
              <img src="/logo.png" alt="" className="w-44 md:w-60" />
            </Link>
            <div>
              <div className="flex items-center gap-4">
                {loaderData?.userId ? (
                  <div className="flex items-center gap-4">
                    <button
                      id="user-profile-toggle"
                      popoverTarget="user-profile"
                      className="w-12 h-12 grid place-items-center bg-slate-600 hover:bg-slate-800 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300 rounded-full"
                    >
                      <User className="text-white" />
                    </button>
                    <div className="hidden md:block">
                      {isAdminUser && pathName.includes("/dashboard") ? (
                        <Link
                          to="/admin"
                          prefetch="intent"
                          className="bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white   flex gap-2 items-center group max-w-fit"
                        >
                          Go to admin dashboard
                          <ArrowRight className="group-hover:translate-x-1 transition ease-out duration-300" />
                        </Link>
                      ) : !isAdminUser &&
                        pathName.includes("/dashboard") ? null : (
                        <Link
                          to="/dashboard"
                          prefetch="intent"
                          className="bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white flex gap-2 items-center group max-w-fit"
                        >
                          Go to dashboard
                          <ArrowRight className="group-hover:translate-x-1 transition ease-out duration-300" />
                        </Link>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* Desktop nav */}
                <ul className="hidden lg:flex gap-4">
                  {navLinks.map((item, index) => (
                    <li key={index} className="menu-list-item">
                      <NavLink
                        to={item.path}
                        prefetch="intent"
                        // viewTransition
                        className={({ isActive }) =>
                          `relative hover:text-yellow-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 ${
                            isActive
                              ? "after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:bg-brand-purple after:h-[2px]"
                              : ""
                          } `
                        }
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                {/* Mobile nav */}
                <button
                  id="menu-btn"
                  popoverTarget="mobile-menu"
                  className="lg:hidden focus:ring-2 focus:border-none focus:outline-none focus:ring-yellow-500 focus:rounded"
                >
                  <span className="sr-only">Open menu</span>
                  <Menu />
                </button>
              </div>

              <div id="mobile-menu" popover="auto" className="p-6 rounded-lg">
                <div className="flex justify-end">
                  <button
                    popoverTarget="mobile-menu"
                    popoverTargetAction="hide"
                    autoFocus
                    className="hover:text-red-500 transition ease-in-out duration-300 focus:ring-2 focus:border-none focus:outline-none focus:ring-yellow-500 focus:rounded"
                  >
                    <span className="sr-only">Close menu</span>
                    <X />
                  </button>
                </div>
                <ul className="space-y-4 mt-4">
                  {loaderData?.userId ? (
                    isAdminUser && pathName.includes("/dashboard") ? (
                      <Link
                        to="/admin"
                        prefetch="intent"
                        onClick={(e) => {
                          document.getElementById("mobile-menu")?.hidePopover();
                        }}
                        className="bg-purple-700 hover:bg-purple-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white   flex gap-2 items-center group max-w-fit"
                      >
                        Go to admin dashboard
                        <ArrowRight className="group-hover:translate-x-1 transition ease-out duration-300" />
                      </Link>
                    ) : !isAdminUser &&
                      pathName.includes("/dashboard") ? null : (
                      <Link
                        to="/dashboard"
                        prefetch="intent"
                        onClick={(e) => {
                          document.getElementById("mobile-menu")?.hidePopover();
                        }}
                        className="bg-purple-700 hover:bg-purple-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white flex gap-2 items-center group max-w-fit"
                      >
                        Go to dashboard
                        <ArrowRight className="group-hover:translate-x-1 transition ease-out duration-300" />
                      </Link>
                    )
                  ) : null}
                  {navLinks.map((item, index) => (
                    <li key={index}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `${isActive ? "text-brand-purple" : ""}`
                        }
                        onClick={(e) => {
                          document.getElementById("mobile-menu")?.hidePopover();
                        }}
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                popover="auto"
                id="user-profile"
                anchor="user-profile-toggle"
                className=" bg-gray-200"
              >
                <div className="flex justify-end">
                  <button
                    popoverTarget="user-profile"
                    popoverTargetAction="hide"
                    autoFocus
                    className="hover:bg-red-200 focus:ring-3 focus:border-none focus:outline-none focus:ring-yellow-500 focus:rounded rounded-full w-8 h-8 grid place-items-center"
                  >
                    <X className="text-red-500" />
                  </button>
                </div>
                <div className="divide-y divide-gray-300">
                  <p className="text-gray-800 py-3">
                    Logged in as:{" "}
                    <span className="font-semibold">
                      {loaderData?.userEmail}
                    </span>
                  </p>

                  <Link
                    to="/dashboard/profile"
                    prefetch="intent"
                    onClick={() => {
                      let popover = document.getElementById("user-profile");
                      popover?.hidePopover();
                    }}
                    className="py-3 inline-block text-gray-800 hover:text-orange-500 hover:underline focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500"
                  >
                    Go to profile
                  </Link>
                  <Form
                    action="/logout"
                    method="post"
                    className="py-3"
                    onSubmit={() => {
                      let popover = document.getElementById("user-profile");
                      popover?.hidePopover();
                    }}
                  >
                    <Button
                      type="submit"
                      variant="destructive"
                      className="hover:bg-red-700 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 group"
                    >
                      {isSubmitting ? (
                        <LoaderIcon />
                      ) : (
                        <>
                          <LogOut className="group-hover:translate-x-1 transition ease-out duration-300" />
                          Log out
                        </>
                      )}
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </nav>
        </header>
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

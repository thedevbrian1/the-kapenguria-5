import { LogIn, RotateCcw } from "lucide-react";
import {
  Form,
  isRouteErrorResponse,
  Link,
  useNavigation,
  useRouteError,
} from "react-router";
import { FormSpacer } from "~/components/FormSpacer";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types/login";
import { useSpinDelay } from "spin-delay";
import { LoaderIcon } from "~/components/Icons";

export default function Login({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  let navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";

  let showLoader = useSpinDelay(isSubmitting, { delay: 150, minDuration: 500 });
  return (
    <main className="mt-20 md:mt-24 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-center bg-black/60 bg-blend-overlay w-full min-h-screen text-white flex items-center p-6">
      <div className="p-6 md:p-12 w-full md:max-w-lg lg:max-w-xl mx-auto bg-orange-100/10 backdrop-blur-sm rounded-lg md:rounded-xl">
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
          Login
        </h1>
        <Form method="post" className="w-full mt-8">
          <fieldset className="space-y-4">
            <FormSpacer>
              <div className="flex gap-2 items-center">
                <Label htmlFor="email">Email</Label>
                {actionData?.fieldErrors?.email ? (
                  <span className="text-red-500">
                    {actionData.fieldErrors.email}
                  </span>
                ) : null}
              </div>
              <Input
                key="email"
                name="email"
                id="email"
                type="email"
                defaultValue={loaderData?.email}
                className={`focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300 ${actionData?.fieldErrors?.email ? "border border-red-500" : ""}`}
              />
            </FormSpacer>

            <FormSpacer>
              <div className="flex gap-2 items-center">
                <Label htmlFor="password">Password</Label>
                {actionData?.fieldErrors?.password ? (
                  <span className="text-red-500">
                    {actionData.fieldErrors.password}
                  </span>
                ) : null}
              </div>
              <Input
                key="password"
                name="password"
                id="password"
                type="password"
                // autoComplete="new-password"
                defaultValue={loaderData?.password}
                className={`focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300 ${actionData?.fieldErrors?.password ? "border border-red-500" : ""}`}
              />
            </FormSpacer>
            <Button
              type="submit"
              className=" w-full bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white capitalize flex gap-2 items-center group"
            >
              {showLoader ? (
                <LoaderIcon />
              ) : (
                <>
                  <LogIn />
                  Log In
                </>
              )}
            </Button>
          </fieldset>
          <Link
            to="/signup"
            className="underline text-gray-300 hover:text-blue-500 inline-flex mt-6 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300"
          >
            Don't have an account? Sign up here
          </Link>
          {/* TODO:Add forgot password */}
        </Form>
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

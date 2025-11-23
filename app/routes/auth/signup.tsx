import { RotateCcw, UserPlus } from "lucide-react";
import {
  Form,
  isRouteErrorResponse,
  Link,
  redirect,
  useRouteError,
  useSearchParams,
} from "react-router";
import { FormSpacer } from "~/components/FormSpacer";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types/signup";
import {
  badRequest,
  trimString,
  trimValue,
  validateEmail,
  validatePassword,
  validatePhone,
  validateText,
} from "~/.server/validation";
import { signUpUser } from "~/models/user";
import {
  getSession,
  sessionStorage,
  setSuccessMessage,
} from "~/.server/session";

export async function action({ request }: Route.ActionArgs) {
  let page = Number(new URL(request.url).searchParams.get("page")) || 1;
  let session = await getSession(request);

  let formData = await request.formData();
  let action = String(formData.get("_action"));

  let nextPage = page + (action === "next" ? 1 : -1);

  switch (page) {
    case 1: {
      let firstName = String(formData.get("first-name"));
      let lastName = String(formData.get("last-name"));
      let phone = String(formData.get("phone"));

      let trimmedFirstName = trimString(firstName);
      let trimmedLastName = trimString(lastName);
      let trimmedPhone = trimValue(phone);

      // Validation
      let fieldErrors = {
        firstName: validateText(trimmedFirstName),
        lastName: validateText(trimmedLastName),
        phone: validatePhone(trimmedPhone),
      };

      if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({ fieldErrors });
      }

      session.set("firstName", trimmedFirstName);
      session.set("lastName", trimmedLastName);
      session.set("phone", trimmedPhone);

      break;
    }

    case 2: {
      let email = String(formData.get("email"));
      let password = String(formData.get("password"));
      let confirmPassword = String(formData.get("confirm-password"));

      let trimmedEmail = trimString(email);

      if (action === "back") {
        session.set("email", trimmedEmail);
        session.set("password", password);
        session.set("confirmPassword", confirmPassword);
        break;
      }
      // Validation
      let fieldErrors = {
        email: validateEmail(trimmedEmail),
        password: validatePassword(password),
        confirmPassword: validatePassword(confirmPassword),
      };

      if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({ fieldErrors });
      }

      if (password !== confirmPassword) {
        return badRequest({ formError: "Passwords do not match!" });
      }

      let firstName = session.get("firstName") || "";
      let lastName = session.get("lastName") || "";
      let phone = session.get("phone") || "";

      //   Sign up user to supabase
      let { newUser, headers } = await signUpUser(
        request,
        trimmedEmail,
        password,
        firstName,
        lastName,
        phone
      );

      console.log({ newUser });

      if (newUser?.id) {
        setSuccessMessage(
          session,
          "Signed up successfully! Please check your email for verification"
        );

        session.unset("firstName");
        session.unset("lastName");
        session.unset("phone");
        session.unset("email");
        session.unset("password");
        session.unset("confirmPassword");
      }

      let allHeaders = {
        ...Object.fromEntries(headers.entries()),
        "Set-Cookie": await sessionStorage.commitSession(session),
      };

      return redirect("/login", {
        headers: allHeaders,
      });
      break;
    }
  }

  return redirect(`?page=${nextPage}`, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export default function Signup({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  let [searchParams] = useSearchParams();
  let page = Number(searchParams.get("page")) || 1;
  return (
    <main className="mt-20 md:mt-24 bg-[url('https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-center bg-black/40 bg-blend-overlay w-full min-h-screen text-white flex items-center p-6">
      <div className="p-6 md:p-12 w-full md:max-w-lg lg:max-w-xl mx-auto bg-orange-100/10 backdrop-blur-sm rounded-lg md:rounded-xl">
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
          Signup
        </h1>

        <Form method="post" className="w-full mt-8">
          {page === 1 ? (
            <fieldset className="space-y-4">
              <FormSpacer>
                <div className="flex gap-2 items-center">
                  <Label htmlFor="first-name">First Name</Label>
                  {actionData?.fieldErrors?.firstName ? (
                    <span className="text-red-500">
                      {actionData.fieldErrors.firstName}
                    </span>
                  ) : null}
                </div>
                <Input
                  key="first-name"
                  name="first-name"
                  id="first-name"
                  type="text"
                  defaultValue={loaderData?.firstName}
                  className={`focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300 ${actionData?.fieldErrors?.firstName ? "border border-red-500" : ""}`}
                />
              </FormSpacer>

              <FormSpacer>
                <div className="flex gap-2 items-center">
                  <Label htmlFor="last-name">Last Name</Label>
                  {actionData?.fieldErrors?.lastName ? (
                    <span className="text-red-500">
                      {actionData.fieldErrors.lastName}
                    </span>
                  ) : null}
                </div>
                <Input
                  key="last-name"
                  name="last-name"
                  id="last-name"
                  type="text"
                  defaultValue={loaderData?.lastName}
                  className={`focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300 ${actionData?.fieldErrors?.lastName ? "border border-red-500" : ""}`}
                />
              </FormSpacer>

              <FormSpacer>
                <div className="flex gap-2 items-center">
                  <Label htmlFor="phone">Phone</Label>
                  {actionData?.fieldErrors?.phone ? (
                    <span className="text-red-500">
                      {actionData.fieldErrors.phone}
                    </span>
                  ) : null}
                </div>
                <Input
                  key="phone"
                  name="phone"
                  id="phone"
                  type="text"
                  defaultValue={loaderData?.phone}
                  className={`focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300 ${actionData?.fieldErrors?.phone ? "border border-red-500" : ""}`}
                />
              </FormSpacer>
            </fieldset>
          ) : page === 2 ? (
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
                  autoComplete="new-password"
                  defaultValue={loaderData?.password}
                  className={`focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300 ${actionData?.fieldErrors?.password ? "border border-red-500" : ""}`}
                />
              </FormSpacer>

              <FormSpacer>
                <div className="flex gap-2 items-center">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  {actionData?.fieldErrors?.confirmPassword ? (
                    <span className="text-red-500">
                      {actionData.fieldErrors.confirmPassword}
                    </span>
                  ) : null}
                </div>
                <Input
                  key="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  defaultValue={loaderData?.confirmPassword}
                  className={`focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300 ${actionData?.fieldErrors?.confirmPassword ? "border border-red-500" : ""}`}
                />
              </FormSpacer>
            </fieldset>
          ) : null}

          {actionData?.formError ? (
            <p className="text-red-500 mt-2">{actionData.formError}</p>
          ) : (
            <>&nbsp;</>
          )}
          <div className="flex gap-2 justify-end mt-6">
            <Button
              type="submit"
              variant="outline"
              name="_action"
              value="back"
              disabled={page === 1}
              className=" focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-black capitalize flex gap-2 items-center"
            >
              Back
            </Button>

            {page === 2 ? (
              <Button
                type="submit"
                className=" bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white capitalize flex gap-2 items-center group"
              >
                <UserPlus />
                Sign Up
              </Button>
            ) : (
              <Button
                type="submit"
                name="_action"
                value="next"
                className=" bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white capitalize flex gap-2 items-center group"
              >
                Next
              </Button>
            )}
          </div>
          <Link
            to="/login"
            className="underline text-gray-300 hover:text-blue-500 inline-flex mt-6 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300"
          >
            Already have an account? Log in here
          </Link>
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

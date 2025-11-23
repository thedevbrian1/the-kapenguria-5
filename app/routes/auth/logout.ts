import { redirect } from "react-router";
import {
  getSession,
  sessionStorage,
  setSuccessMessage,
} from "~/.server/session";
import { logout } from "~/.server/supabase";
import type { Route } from "./+types/logout";

export async function action({ request }: Route.ActionArgs) {
  let session = await getSession(request);
  let { headers } = await logout(request);

  setSuccessMessage(session, "Logged out successfully!");

  let allHeaders = {
    ...Object.fromEntries(headers.entries()),
    "Set-Cookie": await sessionStorage.commitSession(session),
  };

  return redirect("/login", {
    headers: allHeaders,
  });
}

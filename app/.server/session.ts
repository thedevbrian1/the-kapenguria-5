import { createCookieSessionStorage, type Session } from "react-router";

import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "mazingira_session",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: true,
  },
});

export async function getSession(request: Request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export function setSuccessMessage(session: Session, message: string) {
  session.flash("toastMessage", { message, type: "success" });
}

export function setErrorMessage(session: Session, message: string) {
  session.flash("toastMessage", { message, type: "error" });
}

export function setWarningMessage(session: Session, message: string) {
  session.flash("toastMessage", { message, type: "warning" });
}

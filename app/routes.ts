import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("signup", "routes/auth/signup.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("logout", "routes/auth/logout.ts"),
  route("auth/confirm", "routes/auth/confirm.ts"),
  route("dashboard", "routes/dashboard/dashboard.tsx", [
    index("routes/dashboard/index.tsx"),

    route("learning", "routes/dashboard/learning.tsx"),
    route("learning/:title", "routes/dashboard/learning-path.tsx"),
    route("learning/:title/:id", "routes/dashboard/lesson.tsx"),
    route("user-actions", "routes/dashboard/user-actions.tsx"),
    route("user-actions/:id", "routes/dashboard/user-action.tsx"),
    route("user-actions/new", "routes/dashboard/new-user-action.tsx"),
    route("user-actions/:id/new", "routes/dashboard/new-follow-up-action.tsx"),

    route("reports", "routes/dashboard/reports.tsx"),
    route("reports/new", "routes/dashboard/new-report.tsx"),
  ]),
] satisfies RouteConfig;
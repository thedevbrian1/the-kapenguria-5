import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("signup", "routes/auth/signup.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("dashboard", "routes/dashboard/dashboard.tsx", [
    index("routes/dashboard/index.tsx"),
    route("learning", "routes/dashboard/learning.tsx"),
    route("learning/:title", "routes/dashboard/learning-path.tsx"),
    route("learning/:title/:id", "routes/dashboard/lesson.tsx"),
  ]),
] satisfies RouteConfig;

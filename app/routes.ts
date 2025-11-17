import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("signup", "routes/auth/signup.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("dashboard", "routes/dashboard/dashboard.tsx", [
    index("routes/dashboard/index.tsx"),
  ]),
] satisfies RouteConfig;

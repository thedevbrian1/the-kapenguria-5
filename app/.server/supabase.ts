// import { redirect } from "react-router";
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
// import { getUserByUserId } from "~/models/user";

export function createClient(request: Request, isAdmin = false) {
  // let cookies = parse(request.headers.get('Cookie') ?? '');
  let headers = new Headers();

  const API_KEY = isAdmin
    ? process.env.SUPABASE_SERVICE_ROLE_API_KEY
    : process.env.SUPABASE_PUBLIC_API_KEY;

  let supabase = createServerClient(process.env.SUPABASE_PROJECT_URL, API_KEY, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get("Cookie") ?? "");
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          headers.append(
            "Set-Cookie",
            serializeCookieHeader(name, value, options)
          )
        );
      },
      // remove(key, options) {
      //     headers.append('Set-Cookie', serialize(key, '', options))
      // },
    },
  });
  return { supabase, headers };
}

export async function getUser(request: Request) {
  let { supabase, headers } = createClient(request);

  let {
    data: { user },
  } = await supabase.auth.getUser();
  return { user, headers };
}

// export async function requireUser(
//   request: Request,
//   redirectTo = new URL(request.url).pathname
// ) {
//   let { supabase, headers } = createClient(request);
//   let {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (user) {
//     let userId = user.id;
//     let dbUser = await getUserByUserId(userId);

//     return { user, dbUser, headers };
//   }
//   let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
//   throw redirect(`/login?${searchParams}`);
// }

// export async function requireAdminUser(
//   request: Request,
//   redirectTo = new URL(request.url).pathname
// ) {
//   let { supabase, headers } = createClient(request);
//   let {
//     data: { user },
//   } = await supabase.auth.getUser();

//   let userId = user?.id;

//   if (userId) {
//     let dbUser = await getUserByUserId(userId);
//     if (user?.email === "brayomwas95@gmail.com" || dbUser.role === "ADMIN") {
//       return { user, dbUser, headers };
//     }
//   }
//   let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
//   throw redirect(`/login?${searchParams}`);
// }

export async function updatePassword(request: Request, password: string) {
  let { supabase, headers } = createClient(request);

  let {
    data: { user },
    error,
  } = await supabase.auth.updateUser({ password });

  if (error) {
    throw error;
  }

  return { user, headers };
}

export async function login(request: Request, email: string, password: string) {
  let { supabase, headers } = createClient(request);
  let { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }
  return { headers };
}

export async function logout(request: Request) {
  let { supabase, headers } = createClient(request);
  await supabase.auth.signOut();

  return { headers };
}

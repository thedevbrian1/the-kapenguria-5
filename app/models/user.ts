// import { prisma } from "~/.server/db";
import { createClient } from "~/.server/supabase";
import { badRequest } from "~/.server/validation";

export async function signUpUser(
  request: Request,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string,
  role = "USER"
) {
  let { supabase, headers } = createClient(request);
  let { data: userData, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  // Check if email is used
  if (
    userData &&
    userData.user.identities &&
    userData.user.identities.length === 0
  ) {
    return badRequest({
      formError: "Email address already in use. Try another email",
    });
  }

  let userId = userData.user?.id;
  if (userId) {
    let newUser = await createUser(
      firstName,
      lastName,
      email,
      phone,
      userId,
      role
    );
    return { newUser, headers };
  }
}

async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  userId: string,
  role: string
) {
  let reqBody = JSON.stringify({
    email,
    phone_number: phone,
    first_name: firstName,
    last_name: lastName,
    user_id: userId,
    role,
  });

  let res = await fetch(`${process.env.BASE_URL_ENDPOINT}/api/auth/register/`, {
    method: "post",
    body: reqBody,
  });

  let user = await res.json();

  return user;
}

export async function getUserByUserId(userId: string) {
  let res = await fetch(
    `${process.env.BASE_URL_ENDPOINT}/api/auth/users/${userId}`
  );
  let user = await res.json();

  return user;
}

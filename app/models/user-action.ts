export async function createUserAction(userActionObj) {
  let reqBody = JSON.stringify(userActionObj);
  let res = await fetch(
    `${process.env.BASE_URL_ENDPOINT}/api/v1/actions/create/`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody,
    }
  );

  let result = await res.json();

  return result;
}

export async function getUserActionById(id) {
  let res = await fetch(`${process.env.BASE_URL_ENDPOINT}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  let userAction = await res.json();

  return userAction;
}

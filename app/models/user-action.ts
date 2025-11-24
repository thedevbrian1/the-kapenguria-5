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

export async function getUserActionById(id: string) {
  let res = await fetch(
    `${process.env.BASE_URL_ENDPOINT}/api/v1/actions/${id}/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let userAction = await res.json();

  return userAction;
}

export async function getUserActions(id: string) {
  let res = await fetch(
    `${process.env.BASE_URL_ENDPOINT}/api/v1/actions/user/${id}/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let userActions = await res.json();

  return userActions;
}

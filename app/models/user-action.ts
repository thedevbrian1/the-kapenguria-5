export async function createUserAction(userActionObj) {
  let reqBody = JSON.stringify(userActionObj);
  let res = await fetch(`${process.env.BASE_URL_ENDPOINT}`, {
    method: "post",
    body: reqBody,
  });

  let result = await res.json();

  return result;
}

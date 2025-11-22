export async function getCourses() {
  let res = await fetch(
    `http://wm-hack-env.eba-pyegadkw.us-west-2.elasticbeanstalk.com/api/v1/courses/`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Host: "wm-hack-env.eba-pyegadkw.us-west-2.elasticbeanstalk.com",
      },
    }
  );
  console.log(`${res}`);
  let courses = await res.json();

  return { courses };
}

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

export async function enrolToCourse(userId: string) {
  let reqBody = JSON.stringify({ user_id: userId });

  let res = await fetch(
    `http://wm-hack-env.eba-pyegadkw.us-west-2.elasticbeanstalk.com/api/v1/courses/{3a86da16-22f1-4453-ab1e-62d107a42767}/enroll/`,
    {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Host: "wm-hack-env.eba-pyegadkw.us-west-2.elasticbeanstalk.com",
      },
      body: reqBody,
    }
  );
  console.log(`${res}`);
  let courses = await res.json();
}

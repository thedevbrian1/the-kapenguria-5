import { ArrowRight, CirclePlus } from "lucide-react";
import { Form, Link, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/learning";

export async function action({ request }: Route.ActionArgs) {
  return redirect("/dashboard/learning/1");
}

export default function Learning() {
  return (
    <div className="md:max-w-xl lg:max-w-6xl">
      <h1 className="font-semibold text-3xl">Learning paths</h1>

      <div className="mt-8 bg-[url('https://img.youtube.com/vi/S9hcOuLYKBI/maxresdefault.jpg')] bg-cover bg-center  relative rounded-lg">
        <div className="w-full h-full  bg-linear-to-r from-green-800 from-30% flex items-center rounded-lg">
          <div className="text-white p-6 max-w-4/5 md:max-w-[60%] lg:max-w-1/2">
            <h2 className="font-semibold text-2xl">Recycling</h2>
            <p className="mt-4 text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
              quae quaerat accusamus nihil vel eaque commodi tenetur quam
              tempore exercitationem.
            </p>

            <Form method="post">
              <Button className=" mt-4 bg-[#93731a] hover:bg-[#765c15] focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white capitalize flex gap-2 items-center group">
                <CirclePlus />
                Enrol now
              </Button>
            </Form>
          </div>
        </div>
        {/* TODO: Add sub categories e.g Recycling, renewable energy, sustainable living */}
        {/* <h3>Basic</h3>
        <h3>Intermediate</h3>
        <h3>Advanced</h3> */}

        {/* <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div>
              <img
                src="https://img.youtube.com/vi/S9hcOuLYKBI/maxresdefault.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">What is recycling?</h3>
            <Link
              to={`4`}
              className="bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white flex gap-2 items-center max-w-fit"
            >
              View lesson
              <ArrowRight />
            </Link>
          </div>

          <div className="space-y-2">
            <div>
              <img
                src="https://img.youtube.com/vi/S9hcOuLYKBI/maxresdefault.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">What is recycling?</h3>
            <Link
              to={`4`}
              className="bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white flex gap-2 items-center max-w-fit"
            >
              View lesson
              <ArrowRight />
            </Link>
          </div>
          <div className="space-y-2">
            <div>
              <img
                src="https://img.youtube.com/vi/S9hcOuLYKBI/maxresdefault.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">What is recycling?</h3>
            <Link
              to={`4`}
              className="bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white flex gap-2 items-center max-w-fit"
            >
              View lesson
              <ArrowRight />
            </Link>
          </div>
        </div> */}
      </div>

      {/* TODO: Have a course of the day */}
      {/* TODO: List courses and an overview / description and a CTA. When one enrols, they are taken to the courses page */}
      {/* TODO: Content is locked until a user unlocks by completing the previous course */}
      {/* TODO: Sort the courses by the creation time */}
      {/* TODO: Unlock the first lesson after one enrols.
      Unlock the next lesson after one finishes the quiz
      */}
      {/* TODO: Award points based on the no of correct answers */}
      <div className="mt-8">
        <h2 className="font-semibold text-xl">Renewable energy (locked)</h2>
        {/* TODO: Add sub categories e.g Recycling, renewable energy, sustainable living */}
        <h3>Basic</h3>
        <h3>Intermediate</h3>
        <h3>Advanced</h3>

        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div>
              <img
                src="https://img.youtube.com/vi/S9hcOuLYKBI/maxresdefault.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">What is recycling?</h3>
            <Link
              to={`4`}
              className="bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white flex gap-2 items-center max-w-fit"
            >
              View lesson
              <ArrowRight />
            </Link>
          </div>

          <div className="space-y-2">
            <div>
              <img
                src="https://img.youtube.com/vi/S9hcOuLYKBI/maxresdefault.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">What is recycling?</h3>
            <Link
              to={`4`}
              className="bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white flex gap-2 items-center max-w-fit"
            >
              View lesson
              <ArrowRight />
            </Link>
          </div>
          <div className="space-y-2">
            <div>
              <img
                src="https://img.youtube.com/vi/S9hcOuLYKBI/maxresdefault.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">What is recycling?</h3>
            <Link
              to={`4`}
              className="bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white flex gap-2 items-center max-w-fit"
            >
              View lesson
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// }Build a complete multi-page HTML-only website for “Safari Horizon Tours,” a Kenyan safari company, consisting of at least four linked HTML files (index.html, about.html, tours.html,  and contact.html, plus an optional gallery.html); every page must have an identical header navigation menu (Home • About Us • Tours • Gallery • Contact) and a consistent footer with the company name, copyright © 2025, fake Nairobi address, phone number, and email; use semantic HTML tags, real online image URLs, proper forms on the contact page, tables or lists for tour comparisons and itineraries, internal anchors

//

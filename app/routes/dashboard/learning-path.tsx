import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router";

export default function LearningPath() {
  return (
    <div className="md:max-w-xl lg:max-w-6xl">
      <h1 className="font-semibold text-3xl">Recycling</h1>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2 bg-[#e6e6e6] rounded-lg">
          <div>
            <img
              src="https://img.youtube.com/vi/S9hcOuLYKBI/maxresdefault.jpg"
              alt=""
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg">What is recycling?</h3>
            <Link
              to={`4`}
              className="bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white flex gap-2 items-center max-w-fit mt-4"
            >
              View lesson
              <ArrowRight />
            </Link>
          </div>
        </div>

        <div className="  relative">
          <div className="space-y-2 opacity-30 border border-red-500">
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
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-bold">Locked</p>
            <Lock />
          </div>
        </div>

        <div className="  relative">
          <div className="space-y-2 opacity-30 border border-red-500">
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
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-bold">Locked</p>
            <Lock />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router";
import type { Route } from "./+types/user-actions";
import { Calendar, Plus } from "lucide-react";

export async function loader() {
  let userActions = [
    {
      title: "Planted tree",
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EYAWXNVFO-RODlmTbCGSBNVMIqTf1D1rgQ&s",
      id: 1,
    },
    {
      title: "Planted tree",
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EYAWXNVFO-RODlmTbCGSBNVMIqTf1D1rgQ&s",
      id: 2,
    },
    {
      title: "Planted tree",
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EYAWXNVFO-RODlmTbCGSBNVMIqTf1D1rgQ&s",
      id: 3,
    },
    {
      title: "Planted tree",
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EYAWXNVFO-RODlmTbCGSBNVMIqTf1D1rgQ&s",
      id: 4,
    },
  ];
  return { userActions };
}
export default function UserActions({ loaderData }: Route.ComponentProps) {
  let { userActions } = loaderData;
  return (
    <div className="md:max-w-xl lg:max-w-6xl">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">My Actions</h1>
        <Link
          to="new"
          className="bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white flex gap-2 items-center group"
        >
          <Plus className="group-hover:rotate-90 transition ease-out duration-300" />
          Take action
        </Link>
      </div>

      {userActions.length === 0 ? (
        <div className="flex flex-col gap-4 items-center mt-20">
          <div className="w-60">
            <img src="/empty-illustration.svg" alt="" />
          </div>
          <p className="text-gray-600">No actions yet</p>
          <Link
            to="new"
            className="bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white flex gap-2 items-center group"
          >
            <Plus className="group-hover:rotate-90 transition ease-out duration-300" />
            Take action
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userActions.map((item) => (
              <li key={item.id} className="bg-gray-100 p-6 rounded-lg">
                <Link to={`${item.id}`} className="hover:underline">
                  <h2 className="font-semibold text-xl text-green-800">
                    {item.title}
                  </h2>
                </Link>

                <p className="flex gap-2 items-center mt-2 text-gray-700">
                  <Calendar />
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    // hour: "2-digit",
                    // minute: "2-digit",
                    // second: "2-digit",
                    // hour12: false,
                  }).format(new Date())}
                </p>
                <div className="mt-4">
                  <img
                    src={item.imageSrc}
                    alt=""
                    className="w-full h-full rounded-lg"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// import { getUserActionById } from "~/models/user-action";
import { Calendar } from "lucide-react";
import type { Route } from "./+types/user-action";

// export async function loader({ params }: Route.LoaderArgs) {
//   let userActionId = params.id;

//   let userAction = await getUserActionById(userActionId);

//   return { userAction };
// }

export default function UserAction({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1 className="font-semibold text-3xl">Planting tree</h1>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EYAWXNVFO-RODlmTbCGSBNVMIqTf1D1rgQ&s"
          alt=""
        />
      </div>
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
    </div>
  );
}

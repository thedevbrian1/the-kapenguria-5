import { getUserActionById } from "~/models/user-action";
import { ArrowLeft, Calendar, MapPin, Plus } from "lucide-react";
import type { Route } from "./+types/user-action";
import { Button } from "~/components/ui/button";
import {
  Form,
  Link,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router";
import { useSpinDelay } from "spin-delay";
import { LoaderIcon } from "~/components/Icons";

export async function loader({ params }: Route.LoaderArgs) {
  let userActionId = params.id;

  let userAction = await getUserActionById(userActionId);

  return { userAction };
}

export default function UserAction({ loaderData }: Route.ComponentProps) {
  let { userAction } = loaderData;
  console.log({ userAction });

  let [searchParams] = useSearchParams();
  let action = searchParams.get("_action");

  let navigate = useNavigate();

  let navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";

  let showLoader = useSpinDelay(isSubmitting, { delay: 150, minDuration: 500 });

  let canUpdate = true;

  return (
    <div className="w-full md:max-w-xl lg:max-w-2xl 2xl:max-w-5xl">
      <Button
        className="flex gap-2 items-center border border-green-700 hover:bg-green-100 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300 active:scale-[.97] group"
        variant="outline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="group-hover:-translate-x-1 transition ease-out duration-300" />
        Back to My Actions
      </Button>
      <div className="mt-8 space-y-4">
        <h1 className="font-semibold text-3xl text-green-700">
          {userAction.title}
        </h1>
        <div className="h-48 lg:h-64">
          <img
            src={userAction.uploaded_images[0]?.image_url || "/placeholder.svg"}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex gap-4 items-center mt-2">
          <p className="flex gap-2 items-center text-gray-700">
            <Calendar className="w-5" />
            {new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              // hour: "2-digit",
              // minute: "2-digit",
              // second: "2-digit",
              // hour12: false,
            }).format(new Date(userAction.date))}
          </p>
          <p className="flex gap-2 items-center">
            <MapPin className="w-5" />
            <span>{userAction.location}</span>
          </p>
        </div>
        <p>{userAction.description}</p>
      </div>

      <div className="mt-8 bg-gray-50 border border-gray-300 shadow-xs p-4 lg:p-8 rounded-xl">
        <div className="space-y-4">
          <h2 className="font-semibold text-2xl">Want to earn more points?</h2>
          <p className="">
            You can earn more points by adding a follow up showing progress
            after every 30 days
          </p>

          {/* TODO: Show 3 cards: 30 day progress, 60 day, and 90 days. The cards are opened in succession */}
          <div className="grid lg:grid-cols-3 gap-4">
            <div className=" bg-gray-200 space-y-4 pb-4 rounded-lg">
              <div className="flex flex-col gap-2">
                <h3 className="order-1 text-center font-semibold">
                  30 day progress
                </h3>

                <div className="bg-[#617bc5] rounded-t-lg p-6 text-white">
                  <p className="font-bold text-2xl text-center">5X</p>
                </div>
              </div>
              <Button
                type="submit"
                name="_action"
                value="add-bike"
                className="w-full bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white capitalize flex gap-2 items-center group max-w-fit mx-auto"
              >
                {showLoader ? (
                  <LoaderIcon />
                ) : (
                  <>
                    <Plus className="group-hover:rotate-90 transition ease-out duration-300" />
                    Get points
                  </>
                )}
              </Button>
            </div>

            <div className=" bg-gray-200 space-y-4 pb-4 rounded-lg">
              <div className="flex flex-col gap-2">
                <h3 className="order-1 text-center font-semibold">
                  60 day progress
                </h3>

                <div className="bg-[#617bc5] rounded-t-lg p-6 text-white">
                  <p className="font-bold text-2xl text-center">10X</p>
                </div>
              </div>
              {canUpdate ? (
                <Link
                  to={`new?progress=60`}
                  className="w-full bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white capitalize flex gap-2 items-center group max-w-fit mx-auto text-sm"
                >
                  <Plus className="group-hover:rotate-90 transition ease-out duration-300 w-4" />
                  Get points
                </Link>
              ) : (
                <Button
                  type="button"
                  disabled
                  name="_action"
                  value="create-follow-up"
                  className="w-full bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white capitalize flex gap-2 items-center group max-w-fit mx-auto"
                >
                  {navigation.state === "loading" &&
                  navigation.formData?.get("_action") === "create-follow-up" ? (
                    <LoaderIcon />
                  ) : (
                    <>
                      <Plus className="group-hover:rotate-90 transition ease-out duration-300" />
                      Get points
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className=" bg-gray-200 space-y-4 pb-4 rounded-lg">
              <div className="flex flex-col gap-2">
                <h3 className="order-1 text-center font-semibold">
                  90 day progress
                </h3>

                <div className="bg-[#617bc5] rounded-t-lg p-6 text-white">
                  <p className="font-bold text-2xl text-center">50X</p>
                </div>
              </div>
              <Button
                type="submit"
                name="_action"
                value="add-bike"
                className="w-full bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white capitalize flex gap-2 items-center group max-w-fit mx-auto"
              >
                {showLoader ? (
                  <LoaderIcon />
                ) : (
                  <>
                    <Plus className="group-hover:rotate-90 transition ease-out duration-300" />
                    Get points
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="w-40 lg:w-60 border border-red-500">
            <MoneyReceived />
          </div> */}
      </div>
    </div>
  );
}

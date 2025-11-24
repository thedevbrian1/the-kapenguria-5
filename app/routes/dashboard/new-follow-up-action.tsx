import { ArrowLeft, Plus } from "lucide-react";
import { Form, useNavigate, useNavigation } from "react-router";
import { useSpinDelay } from "spin-delay";
import { FormSpacer } from "~/components/FormSpacer";
import { LoaderIcon, NewEntriesIllustration } from "~/components/Icons";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

export default function NewFollowUpAction() {
  let navigate = useNavigate();

  let navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";
  let showLoader = useSpinDelay(isSubmitting, { delay: 150, minDuration: 500 });

  return (
    <div className="w-full md:max-w-xl lg:max-w-2xl 2xl:max-w-6xl">
      <Button
        className="flex gap-2 items-center border border-green-700 hover:bg-green-100 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300 active:scale-[.97] group"
        variant="outline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="group-hover:-translate-x-1 transition ease-out duration-300" />
        Back to My Action
      </Button>
      <div className="mt-8 grid xl:grid-cols-2 gap-6 w-full">
        <div className=" text-gray-800 border bg-gray-50 border-gray-200 shadow p-4 lg:p-6 rounded-xl">
          <h2 className="font-semibold text-2xl">Create follow up</h2>
          <Form
            method="post"
            encType="multipart/form-data"
            className="mt-8 space-y-6 w-full"
          >
            <FormSpacer>
              <Label htmlFor="user-action-image">Upload Image</Label>
              <input
                type="file"
                name="user-action-image"
                id="user-action-image"
                // multiple
                accept="image/*"
                className="w-full file:rounded-full file:border-0 file:bg-yellow-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-yellow-700 hover:file:bg-orange-100 dark:file:bg-orange-600 dark:file:text-orange-100 dark:hover:file:bg-orange-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 transition ease-in-out duration-300"
              />
            </FormSpacer>
            <Button
              type="submit"
              name="_action"
              value="add-bike"
              className="w-full bg-green-700 hover:bg-green-500 focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 active:scale-[.97] transition ease-in-out duration-300 px-4 py-2 rounded-lg text-white capitalize flex gap-2 items-center group"
            >
              {showLoader ? (
                <LoaderIcon />
              ) : (
                <>
                  <Plus className="group-hover:rotate-90 transition ease-out duration-300" />
                  Add Follow Up Action
                </>
              )}
            </Button>
          </Form>
        </div>
        <div className="max-h-48 md:max-h-72">
          <NewEntriesIllustration />
        </div>
      </div>
    </div>
  );
}

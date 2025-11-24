import {
  type FileUpload,
  MaxFilesExceededError,
  MaxFileSizeExceededError,
  parseFormData,
} from "@remix-run/form-data-parser";

import { ArrowLeft, Plus } from "lucide-react";
import { Form, redirect, useNavigate, useNavigation } from "react-router";
import { useSpinDelay } from "spin-delay";
import { FormSpacer } from "~/components/FormSpacer";
import { LoaderIcon, NewEntriesIllustration } from "~/components/Icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import type { Route } from "./+types/new-user-action";
import { uploadImage } from "~/.server/cloudinary";
import { badRequest, validateDate, validateText } from "~/.server/validation";
import { createUserAction } from "~/models/user-action";
import {
  getSession,
  sessionStorage,
  setSuccessMessage,
} from "~/.server/session";
import { requireUser } from "~/.server/supabase";

export async function action({ request }: Route.ActionArgs) {
  let session = await getSession(request);
  let { dbUser } = await requireUser(request);

  let userId = dbUser.id;

  let uploadHandler = async (fileUpload: FileUpload) => {
    if (
      fileUpload.fieldName === "user-action-image" &&
      fileUpload.type.startsWith("image/")
    ) {
      // console.log("File type:", fileUpload.type, "Size:", fileUpload.size);

      let img = await uploadImage(fileUpload.stream());
      return img.secure_url;

      // let uuid = crypto.randomUUID();
      // let storageKey = getStorageKey(uuid);

      // FileUpload objects are not meant to stick around for very long (they are
      // streaming data from the request.body); store them as soon as possible.

      // await fileStorage.set(storageKey, fileUpload);

      // Return a File for the FormData object. This is a LazyFile that knows how
      // to access the file's content if needed (using e.g. file.stream()) but
      // waits until it is requested to actually read anything.

      // return fileStorage.get(storageKey);
    }
  };

  let formData;

  try {
    formData = await parseFormData(
      request,
      {
        maxFileSize: 10 * 1024 * 1024,
        maxFiles: 5,
      },
      uploadHandler
    );
  } catch (error) {
    if (error instanceof MaxFilesExceededError) {
      console.error(`Request may not contain more than 5 files`);
    } else if (error instanceof MaxFileSizeExceededError) {
      console.error(`Files may not be larger than 10 MiB`);
      throw new Response("Files may not be larger than 10 MiB", {
        status: 400,
        statusText: "Bad Request",
      });
    } else {
      console.error(`An unknown error occurred:`, error);
    }
  }

  let title = String(formData?.get("title"));
  let date = String(formData?.get("date"));
  let location = String(formData?.get("location"));
  let description = String(formData?.get("description"));

  //   Validation
  let fieldErrors = {
    title: validateText(title),
    date: validateDate(date),
    location: validateText(location),
    description: validateText(description),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors });
  }

  let uploadedUrls = [];

  if (formData) {
    for (let [key, value] of formData.entries()) {
      if (key === "user-action-image" && value) {
        uploadedUrls.push(value);
      }
    }
  }

  let mediaRecords = uploadedUrls.map((item) => ({
    url: item,
  }));

  let userActionObj = {
    user: userId,
    title,
    date,
    location,
    description,
    images: uploadedUrls,
  };

  let result = await createUserAction(userActionObj);

  console.log({ result });

  if (result.id) {
    setSuccessMessage(session, "Created successfully!");

    return redirect(`/dashboard/user-actions/${result.id}`, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  //   {
  //     title: 'Tree planting',
  //     date: new Date(),
  //     location: 'Nairobi',
  //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, accusamus?"
  //     image_urls: [
  //         {url: "https://res.cloudinary.com/organic-zones/image/upload/v1753273473/pexels-photo-5940828_ckqiaw.jpg"},
  //         {url: "https://res.cloudinary.com/organic-zones/image/upload/v1753273473/pexels-photo-5940828_ckqiaw.jpg"},
  //         {url: "https://res.cloudinary.com/organic-zones/image/upload/v1753273473/pexels-photo-5940828_ckqiaw.jpg"},

  //     ]
  //   }

  return null;
}

export default function NewUserAction({ actionData }: Route.ComponentProps) {
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
        Back to My Actions
      </Button>
      <div className="mt-8 grid xl:grid-cols-2 gap-6 w-full">
        <div className="text-gray-800 border border-gray-200 shadow p-4 lg:p-6 rounded-xl">
          <h1 className="font-semibold text-3xl">Create new action</h1>
          <Form
            method="post"
            encType="multipart/form-data"
            className="mt-8 space-y-6 w-full"
          >
            <FormSpacer>
              <div className="flex gap-2 items-center">
                <Label htmlFor="title">Title</Label>
                {actionData?.fieldErrors?.title ? (
                  <span className="text-red-500">
                    {actionData.fieldErrors.title}
                  </span>
                ) : null}
              </div>
              <Input
                name="title"
                id="title"
                type="text"
                placeholder="e.g Tree planting"
                className={`focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 ${actionData?.fieldErrors?.title ? "border border-red-500" : ""}`}
              />
            </FormSpacer>
            <FormSpacer>
              <div className="flex gap-2 items-center">
                <Label htmlFor="date">Date</Label>
                {actionData?.fieldErrors?.date ? (
                  <span className="text-red-500">
                    {actionData.fieldErrors.date}
                  </span>
                ) : null}
              </div>
              <input
                name="date"
                id="date"
                type="date"
                className={`w-full border focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 ${actionData?.fieldErrors?.date ? "border border-red-500" : "border-gray-300 rounded-lg p-2"}`}
              />
            </FormSpacer>
            <FormSpacer>
              <div className="flex gap-2 items-center">
                <Label htmlFor="location">Location</Label>
                {actionData?.fieldErrors?.location ? (
                  <span className="text-red-500">
                    {actionData.fieldErrors.location}
                  </span>
                ) : null}
              </div>
              <Input
                name="location"
                id="location"
                type="text"
                className={`focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 ${actionData?.fieldErrors?.location ? "border border-red-500" : ""}`}
              />
            </FormSpacer>
            <FormSpacer>
              <div className="flex gap-2 items-center">
                <Label htmlFor="description">Description</Label>
                {actionData?.fieldErrors?.description ? (
                  <span className="text-red-500">
                    {actionData.fieldErrors.description}
                  </span>
                ) : null}
              </div>
              <Textarea
                name="description"
                id="description"
                className={`focus-visible:ring-4 focus-visible:ring-offset-2  focus-visible:ring-yellow-500 ${actionData?.fieldErrors?.description ? "border border-red-500" : ""}`}
              />
            </FormSpacer>
            <FormSpacer>
              <Label htmlFor="user-action-image">Upload Image(s)</Label>
              <input
                type="file"
                name="user-action-image"
                id="user-action-image"
                multiple
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
                  Add Action
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

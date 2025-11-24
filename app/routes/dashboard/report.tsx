import { Link } from "react-router";
import type { Route } from "./+types/dashboard/report";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Report an Incident | Mazingira 360" },
    { name: "description", content: "Report an environmental incident." },
  ];
}

export default function ReportPage() {
  return (
    <div className="p-2 md:p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Report an Environmental Incident
      </h1>
      <div className="max-w-3xl">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
          <form method="post" className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Incident Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="e.g., Illegal Logging in Mau Forest"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Detailed Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Please provide as much detail as possible about the incident, including what you observed, when it occurred, and any other relevant information."
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="e.g., Kakamega Forest, near the Isecheno entrance"
              />
            </div>

            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                Upload Evidence (Photo/Video)
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*,video/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export function DashboardCard({
  title,
  body,
  borderColor = "border-t-[#006572]",
}) {
  return (
    <div
      className={`bg-gray-50 rounded py-10 px-6 text-center border-t-4 rounded-t-lg  ${borderColor}`}
    >
      <h2 className="uppercase text-sm text-gray-500">{title}</h2>
      <p className="text-4xl font-semibold mt-2">{body}</p>
    </div>
  );
}

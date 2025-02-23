import EditEventForm from "@/components/EditForm";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const event = {
    eventName: "TechSphere 2025",
    description:
      "A premier technology conference bringing together innovators, developers, and industry leaders to discuss the future of tech.",
    organizer: "InnovateTech Solutions",
    venue: "Grand Convention Center, San Francisco, CA",
    startDate: "2025-09-15T09:00:00Z",
    endDate: "2025-09-17T18:00:00Z",
    eventStatus: "Upcoming",
    image:
      "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg",
    theme: "Shaping the Future with AI & Blockchain",
  };

  return (
    <div className="max-w-5xl rounded-lg border mx-auto w-full my-2">
      <h1 className="text-2xl font-bold p-4 text-center my-5">Edit Event</h1>
      <EditEventForm event={event} />
    </div>
  );
}

import { getEvent } from "@/app/actions/actions";
import EditEventForm from "@/components/EditForm";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const event = await getEvent(slug);
  return (
    <div className="max-w-5xl rounded-lg border mx-auto w-full my-2  bg-card">
      <h1 className="text-2xl font-bold p-4 text-center my-5">Edit Event</h1>
      <EditEventForm event={event} />
    </div>
  );
}

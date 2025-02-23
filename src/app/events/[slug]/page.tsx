import { getEvent } from "@/app/actions/actions";
import { auth } from "@/lib/auth";
import IndividualEventClient from "./client";

export type EventData = Awaited<ReturnType<typeof getEvent>>;

export default async function IndividualEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  const slug = (await params).slug;
  const event = await getEvent(slug);
  if (!event) {
    return <div>Event not found</div>;
  }
  console.log({ event });

  return <IndividualEventClient session={session} event={event} />;
}

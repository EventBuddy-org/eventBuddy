import Image from "next/image";
import { Card } from "./ui/card";
import Link from "next/link";
import { getEvents } from "@/app/actions/actions";

export default async function Explore() {
  const eventsData = await getEvents();
  console.log(eventsData);
  return (
    <div className="max-w-5xl mx-auto w-full px-4">
      <div className="grid grid-cols-3 gap-8 w-full">
        {eventsData.map((eventData, index) => (
          <EventCard
            key={index}
            eventData={{
              id: eventData.id,
              eventName: eventData.title,
              description: eventData.description,
              organizer: eventData.organizerId, // Assuming organizerId is the organizer's name
              venue: eventData.venue,
              startDate: eventData.startDate.toString(),
              endDate: eventData.endDate.toString(),
              image: eventData.image,
              theme: eventData.theme,
            }}
          />
        ))}
      </div>
    </div>
  );
}
function EventCard({
  eventData,
}: {
  eventData: {
    id: string;
    eventName: string;
    description: string;
    organizer: string;
    venue: string;
    startDate: string;
    endDate: string;
    image: string;
    theme: string;
  };
}) {
  return (
    <Link href={`/events/${eventData.id}`}>
      <Card className="rounded-xl overflow-hidden">
        <Image
          src={eventData.image}
          alt={eventData.eventName}
          width={400}
          height={400}
          className="aspect-square"
        />
        <div className="p-4">
          <h2 className="font-bold text-xl">{eventData.eventName}</h2>
          <p className="mt-2">{eventData.description.substring(0, 40)}...</p>

          <p className="mt-4">
            <span className="font-semibold">Organizer:</span>{" "}
            {eventData.organizer}
          </p>
        </div>
      </Card>
    </Link>
  );
}

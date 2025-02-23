import { Button } from "@/components/ui/button";
import { Calendar, PinIcon } from "lucide-react";
import Image from "next/image";

export default async function IndividualEventPage({
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
    image:
      "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg",
    theme: "Shaping the Future with AI & Blockchain",
  };

  return (
    <div className="max-w-5xl mx-auto px-5">
      <div className="grid grid-cols-2 gap-5 border shadow-md p-8 rounded-lg">
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="font-bold text-3xl">{event.eventName}</h1>
            <p className="mt-1">
              <strong>Organized By: </strong>
              {event.organizer}
            </p>
            <div className="mt-10 flex flex-col justify-between gap-5">
              <div className="flex gap-3 items-center">
                <Calendar size={24} />
                <div>
                  <p>{new Date(event.startDate).toDateString()}</p>
                  <p>{new Date(event.endDate).toDateString()}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <PinIcon size={24} />
                <p>{event.venue}</p>
              </div>
            </div>
          </div>
          <Button className="max-w-[200px] h-12 text-lg">Register</Button>
        </div>
        <Image
          src={event.image}
          alt={event.eventName}
          width={300}
          className="ml-auto rounded-lg"
          height={400}
        />
      </div>
      <div className="mt-10 border shadow-md rounded-lg">
        <h2 className="p-5 font-bold text-2xl">About the Event</h2>
        <p className="p-5">{event.description}</p>
      </div>
    </div>
  );
}

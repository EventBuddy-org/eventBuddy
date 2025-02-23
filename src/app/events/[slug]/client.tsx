"use client";
import { registerEvent } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import { Calendar, PinIcon } from "lucide-react";
import Image from "next/image";
import { EventData } from "./page";
import { Session } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function IndividualEventClient({
  event,
  session,
}: {
  event: EventData;
  session: Session | null;
}) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(
    event.attendees.some((s) => s.attendeeId == session?.user?.id)
  );

  async function handleRegister() {
    try {
      setIsRegistering(true);
      const data = await registerEvent(event.id);
      if (data?.error) return toast.error("Something went wrong");
      toast.success("Registered successfully");
      setIsRegistered(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRegistering(false);
    }
  }
  return (
    <div className="max-w-5xl mx-auto px-5">
      <div className="grid grid-cols-2 gap-5 border shadow-md p-8 rounded-lg">
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="font-bold text-3xl">{event.title}</h1>
            <p className="mt-1">
              <strong>Organized By: </strong>
              {event.organizer.name}
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
          {session?.user?.id === event.organizer.id ? (
            <Link href={`edit/${event.id}`}>
              <Button className="w-44 h-12 text-lg">Edit</Button>
            </Link>
          ) : (
            <Button
              className="w-44 h-12 text-lg"
              onClick={handleRegister}
              disabled={isRegistered || isRegistering}
            >
              {isRegistered ? "Registered" : "Register"}
            </Button>
          )}
        </div>
        <Image
          src={event.image}
          alt={event.title}
          width={300}
          className="ml-auto rounded-lg"
          height={400}
        />
      </div>
      <div className="mt-10 border shadow-md rounded-lg ">
        <h2 className="p-5 font-bold text-2xl">About the Event</h2>
        <p className="p-5">{event.description}</p>
      </div>

      <div className="mt-10 border shadow-md rounded-lg">
        <h2 className="p-5 font-bold text-2xl">Attendees</h2>
        <div className="p-5 flex flex-wrap gap-3">
          {event.attendees.map((att, index) => (
            <div key={index} className="flex flex-col">
              <Image
                alt={att.id}
                src={String(att.attendee.image)}
                width={300}
                height={300}
                className="size-10"
              />
              <span>{att.attendee.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

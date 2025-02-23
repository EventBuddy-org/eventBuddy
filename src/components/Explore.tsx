import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { getEvents } from "@/app/actions/actions";
import { EventCard } from "@/components/EventCard";

export default async function Explore() {
  const eventsData = await getEvents();

  return (
    <AnimatedPageWrapper>
      <div className="px-4 py-12">
        <div
          className="w-full relative flex flex-col items-center justify-center"
          style={{
            minHeight: "calc(100vh - 80px)",
          }}
        >
          <h1 className="text-[4.5vw] font-bold tracking-wide text-center">
            Explore Exciting Events
          </h1>
          <p className="text-center text-muted-foreground my-2.5 mb-8">
            Discover and join amazing events happening around you
          </p>
          <div
            className="absolute -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200 via-pink-300 to-amber-300 opacity-10 blur-[100px]"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-pink-100 via-yellow-300 to-amber-300 opacity-20 blur-[100px]"
            style={{
              top: "10%",
              left: "10%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {eventsData.map((eventData, index) => (
            <EventCard key={eventData.id} eventData={eventData} index={index} />
          ))}
        </div>
      </div>
    </AnimatedPageWrapper>
  );
}

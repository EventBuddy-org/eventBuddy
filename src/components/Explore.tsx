import Image from "next/image";
import { Card } from "./ui/card";
import Link from "next/link";

const eventsData = [
  {
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
  },
  {
    eventName: "Global Startup Summit",
    description:
      "A networking and pitch event for startups, investors, and industry leaders looking to connect and grow.",
    organizer: "Startup Connect",
    venue: "The Innovation Hub, New York, NY",
    startDate: "2025-10-05T10:00:00Z",
    endDate: "2025-10-07T17:00:00Z",
    image:
      "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg",
    theme: "Innovating for a Sustainable Future",
  },
  {
    eventName: "CodeFest Hackathon",
    description:
      "A 48-hour coding marathon where developers and designers collaborate to build innovative solutions.",
    organizer: "CodeGeeks",
    venue: "Tech Park, Bangalore, India",
    startDate: "2025-11-12T08:00:00Z",
    endDate: "2025-11-14T20:00:00Z",
    image:
      "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg",
    theme: "Building Smart Solutions for Tomorrow",
  },
  {
    eventName: "AI & Robotics Expo",
    description:
      "A showcase of the latest advancements in artificial intelligence and robotics from around the world.",
    organizer: "FutureTech Expo",
    venue: "Dubai Expo Center, UAE",
    startDate: "2025-12-01T09:00:00Z",
    endDate: "2025-12-03T18:00:00Z",
    image:
      "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg",
    theme: "Redefining Humanity with AI & Robotics",
  },
  {
    eventName: "CyberSecurity Con 2025",
    description:
      "A conference focused on the latest trends, threats, and advancements in cybersecurity.",
    organizer: "SecureNet Global",
    venue: "Berlin Tech Arena, Germany",
    startDate: "2025-08-20T09:30:00Z",
    endDate: "2025-08-22T17:00:00Z",
    image:
      "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg",
    theme: "Securing the Digital World",
  },
  {
    eventName: "Gaming World Summit",
    description:
      "A gathering of game developers, publishers, and enthusiasts to explore the latest gaming trends and technologies.",
    organizer: "GameDev Expo",
    venue: "Tokyo Game Arena, Japan",
    startDate: "2025-07-10T10:00:00Z",
    endDate: "2025-07-12T19:00:00Z",
    image:
      "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg",
    theme: "Next-Gen Gaming and the Metaverse",
  },
  {
    eventName: "Medical Innovation Forum",
    description:
      "A global summit discussing advancements in medical technology, biotech, and healthcare innovations.",
    organizer: "MediTech Global",
    venue: "London Health Expo, UK",
    startDate: "2025-06-15T09:00:00Z",
    endDate: "2025-06-17T17:00:00Z",
    image:
      "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg",
    theme: "Revolutionizing Healthcare with Technology",
  },
  {
    eventName: "EcoTech Conference",
    description:
      "An event focused on sustainable technology, green energy, and environmental innovation.",
    organizer: "GreenTech Alliance",
    venue: "Sydney Convention Center, Australia",
    startDate: "2025-05-25T09:30:00Z",
    endDate: "2025-05-27T16:00:00Z",
    image:
      "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg",
    theme: "Innovating for a Greener Planet",
  },
  {
    eventName: "Blockchain & Crypto Expo",
    description:
      "A premier event for blockchain and cryptocurrency enthusiasts, featuring keynotes, workshops, and networking.",
    organizer: "CryptoWorld",
    venue: "Singapore FinTech Hub",
    startDate: "2025-04-10T09:00:00Z",
    endDate: "2025-04-12T18:00:00Z",
    image:
      "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg",
    theme: "Decentralizing the Future",
  },
  {
    eventName: "Women in Tech Summit",
    description:
      "A global conference celebrating women in technology, entrepreneurship, and innovation.",
    organizer: "WomenTech Network",
    venue: "Toronto Innovation Center, Canada",
    startDate: "2025-03-08T10:00:00Z",
    endDate: "2025-03-10T16:30:00Z",
    image:
      "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg",
    theme: "Empowering Women in Technology",
  },
];

export default function Explore() {
  return (
    <div className="max-w-5xl mx-auto w-full px-4">
      <div className="grid grid-cols-3 gap-8 w-full">
        {eventsData.map((eventData, index) => (
          <EventCard key={index} eventData={eventData} />
        ))}
      </div>
    </div>
  );
}
function EventCard({
  eventData,
}: {
  eventData: {
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
    <Link href={`/events/${eventData.eventName}`}>
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

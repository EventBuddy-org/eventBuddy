import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No user found");
    return;
  }
  const dummyEvents = [
    {
      title: "Tech Conference 2025",
      description: "A conference about the latest in tech.",
      startDate: new Date("2025-03-01T10:00:00Z"),
      endDate: new Date("2025-03-01T18:00:00Z"),
      venue: "Tech Park",
      theme: "Technology",
      eventStatus: "PUBLISHED" as const,
      image: "https://via.placeholder.com/150?text=Tech+Conference",
      organizerId: user.id,
    },
    {
      title: "Art Expo",
      description: "An exhibition showcasing modern art.",
      startDate: new Date("2025-04-15T09:00:00Z"),
      endDate: new Date("2025-04-15T17:00:00Z"),
      venue: "Art Gallery",
      theme: "Art",
      eventStatus: "PUBLISHED" as const,
      image: "https://via.placeholder.com/150?text=Art+Expo",
      organizerId: user.id,
    },
    {
      title: "Music Festival",
      description: "A festival featuring live music performances.",
      startDate: new Date("2025-05-20T12:00:00Z"),
      endDate: new Date("2025-05-20T22:00:00Z"),
      venue: "City Park",
      theme: "Music",
      eventStatus: "PUBLISHED" as const,
      image: "https://via.placeholder.com/150?text=Music+Festival",
      organizerId: user.id,
    },
    {
      title: "Food Carnival",
      description: "A carnival with a variety of food stalls.",
      startDate: new Date("2025-06-10T11:00:00Z"),
      endDate: new Date("2025-06-10T20:00:00Z"),
      venue: "Downtown",
      theme: "Food",
      eventStatus: "PUBLISHED" as const,
      image: "https://via.placeholder.com/150?text=Food+Carnival",
      organizerId: user.id,
    },
    {
      title: "Book Fair",
      description: "A fair for book lovers with various book stalls.",
      startDate: new Date("2025-07-05T10:00:00Z"),
      endDate: new Date("2025-07-05T18:00:00Z"),
      venue: "Convention Center",
      theme: "Books",
      eventStatus: "PUBLISHED" as const,
      image: "https://via.placeholder.com/150?text=Book+Fair",
      organizerId: user.id,
    },
    {
      title: "Science Expo",
      description: "An expo showcasing scientific innovations.",
      startDate: new Date("2025-08-12T09:00:00Z"),
      endDate: new Date("2025-08-12T17:00:00Z"),
      venue: "Science Museum",
      theme: "Science",
      eventStatus: "PUBLISHED" as const,
      image: "https://via.placeholder.com/150?text=Science+Expo",
      organizerId: user.id,
    },
    {
      title: "Film Festival",
      description: "A festival screening various films.",
      startDate: new Date("2025-09-18T14:00:00Z"),
      endDate: new Date("2025-09-18T22:00:00Z"),
      venue: "Cinema Hall",
      theme: "Film",
      eventStatus: "PUBLISHED" as const,
      image: "https://via.placeholder.com/150?text=Film+Festival",
      organizerId: user.id,
    },
    {
      title: "Health & Wellness Fair",
      description: "A fair promoting health and wellness.",
      startDate: new Date("2025-10-25T10:00:00Z"),
      endDate: new Date("2025-10-25T18:00:00Z"),
      venue: "Community Center",
      theme: "Health",
      eventStatus: "PUBLISHED" as const,
      image: "https://via.placeholder.com/150?text=Health+Fair",
      organizerId: user.id,
    },
    {
      title: "Fashion Show",
      description: "A show featuring the latest fashion trends.",
      startDate: new Date("2025-11-15T18:00:00Z"),
      endDate: new Date("2025-11-15T21:00:00Z"),
      venue: "Fashion Plaza",
      theme: "Fashion",
      eventStatus: "PUBLISHED" as const,
      image: "https://via.placeholder.com/150?text=Fashion+Show",
      organizerId: user.id,
    },
    {
      title: "Charity Run",
      description: "A run to raise funds for charity.",
      startDate: new Date("2025-12-05T07:00:00Z"),
      endDate: new Date("2025-12-05T12:00:00Z"),
      venue: "City Stadium",
      theme: "Charity",
      eventStatus: "PUBLISHED" as const,
      image: "https://via.placeholder.com/150?text=Charity+Run",
      organizerId: user.id,
    },
  ];

  for (const eventData of dummyEvents) {
    await prisma.event.create({
      data: eventData,
    });
  }
	
  return NextResponse.json({ error: false });
};

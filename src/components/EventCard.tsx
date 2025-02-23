"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EventCardProps {
  eventData: any;
  index: number;
}

export function EventCard({ eventData, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/events/${eventData.id}`}>
        <Card className="rounded-lg overflow-hidden">
          <CardHeader className="p-0 overflow-hidden">
            <Image
              src={eventData.image || "/placeholder.svg"}
              alt={eventData.title}
              width={400}
              height={400}
              className="aspect-video object-cover w-full group-hover:scale-110 group-hover:brightness-90 transition-all duration-300 ease-in-out"
            />
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="text-2xl font-bold mb-2">
              {eventData.title}
            </CardTitle>
            <p className="text-muted-foreground mb-4">
              {eventData.description.substring(0, 100)}...
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(eventData.startDate).toLocaleDateString()}</span>
            </div>
          </CardContent>
          <CardFooter className="bg-muted p-4 flex justify-between items-center">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm">{eventData.organizer.name}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{eventData.venue}</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

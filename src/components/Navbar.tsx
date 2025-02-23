"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Profile } from "./Profile";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export default function Navbar() {
  const session = useSession();
  return (
    <div className="h-20 bg-gray-50 px-4 sm:px-8">
      <div className="w-full flex items-center justify-between">
        <Link href={"/"}>
          <Image src={"/logo.svg"} height={100} width={160} alt="logo" />
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-black hover:underline">
            Explore
          </Link>
          <Link href="/create" className="text-black hover:underline">
            Create Event
          </Link>
          {session.data?.user?.image ? (
            <Dialog>
              <DialogHeader>
                <DialogTitle className="sr-only">Profile</DialogTitle>
                <DialogDescription className="sr-only">
                  Profile Description
                </DialogDescription>
              </DialogHeader>
              <DialogTrigger className="flex-none">
                <Image
                  src={session.data.user.image}
                  alt="User profile"
                  width={300}
                  height={300}
                  className="size-9 object-cover aspect-square rounded-full hover:ring ring-inherit transition-all duration-200"
                />
              </DialogTrigger>
              <DialogContent>
                <Profile />
              </DialogContent>
            </Dialog>
          ) : (
            <Link href={"/login"} className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

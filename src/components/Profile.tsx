"use client";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Copy, User } from "lucide-react";
import { toast } from "sonner";

export function Profile() {
  const session = useSession();
  return (
    <Card>
      <CardHeader className="space-y-6">
        <div className="flex justify-center">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={session?.data?.user?.image as unknown as string}
              alt="Profile picture"
            />
            <AvatarFallback>
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-center text-2xl">Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              defaultValue="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled
              id="email"
              type="email"
              placeholder="Enter your email"
              defaultValue="john@example.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p>Telegram Key </p>
          <div
            onClick={async () => {
              await navigator.clipboard.writeText(
                session?.data?.user?.id as string
              );
              toast.info("Copied to clipboard");
            }}
            className="flex cursor-pointer items-center space-x-2"
          >
            <pre className="rounded-md p-2">{session?.data?.user?.id}</pre>
            <Copy size={16} />
          </div>
        </div>
        <div className="flex justify-between">
          <Button type="button" onClick={() => signOut()}>
            Logout
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const session = useSession();
  if (session.data?.user) return router.replace("/");
  return (
    <div
      className="flex"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      {/* Left column with company name */}
      <div className="hidden w-1/2 bg-background lg:flex items-center bg-gray-50 justify-center">
        <h1 className="text-4xl font-bold">
          <Image src={"/logo.svg"} height={500} width={500} alt="logo" />
        </h1>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Please sign in to your account
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  signIn("google");
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  signIn("github");
                }}
              >
                <Github className="mr-2 h-4 w-4" />
                Sign in with GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

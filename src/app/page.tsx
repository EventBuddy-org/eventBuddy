import CreateEvent from "@/components/CreateEvent";
import Explore from "@/components/Explore";
import { auth } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  console.log(session);
  return (
    <div>
      {/* <Explore /> */}
      <CreateEvent />
    </div>
  );
}

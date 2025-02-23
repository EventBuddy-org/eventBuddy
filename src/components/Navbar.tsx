import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="h-20 bg-gray-50">
      <div className="w-full flex items-center justify-between">
        <Link href={"/"}>
          <Image src={"/logo.svg"} height={100} width={160} alt="logo" />
        </Link>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#" className="text-white">
            About
          </a>
          <a href="#" className="text-white">
            Services
          </a>
          <a href="#" className="text-white">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}

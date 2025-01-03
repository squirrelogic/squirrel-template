import { Metadata } from "next";
import { Login } from "@/components/login";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login | SquirrelLogic Inventory",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 min-h-full flex-row justify-center">
      <div className="flex-1 hidden flex-col justify-center lg:flex ">
        <div className="justify-items-center">
          <div
            className="bg-black/50 rounded-3xl p-5"
            style={{ width: "15vw", height: "15vw" }}
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <h1
            style={{ lineHeight: 1.25 }}
            className="text-4xl  md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-[#33F9FA] via-[#8F6DFE] to-[#FE87FF] text-transparent bg-clip-text"
          >
            Squirrel
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <Login />
      </div>
    </div>
  );
}

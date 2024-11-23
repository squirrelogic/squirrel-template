import { Metadata } from "next";
import { registerAction } from "@/actions/auth/register-action";
import Image from "next/image";
import Registration from "@/components/registration";
export const metadata: Metadata = {
  title: "Register | SquirrelLogic Inventory",
  description: "Create a new account to manage your inventory",
};

export default async function RegisterPage() {
  return (
    <div className="flex min-h-full flex-row justify-center">
      <div className="flex-1 hidden flex-col justify-center lg:flex ">
        <div className="justify-items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "50%", height: "auto" }}
          />
          <h1
            style={{ lineHeight: 1.25 }}
            className="text-4xl  md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-[#33F9FA] via-[#8F6DFE] to-[#FE87FF] text-transparent bg-clip-text"
          >
            SquirreLogic
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        {/* <RegisterForm register={registerAction} /> */}
        <Registration />
      </div>
    </div>
  );
}

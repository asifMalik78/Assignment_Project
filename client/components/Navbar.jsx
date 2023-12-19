"use client";

import Image from "next/image";
import LogoIcon from "@/public/images/logo.svg";
import SettingIcon from "@/public/images/setting-icon.svg";
import BellIcon from "@/public/images/bell-icon.svg";
import HomeIconPrimary from "@/public/images/home-icon-primary.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const projectName = pathname.split("/")[2]?.split("-")[1];
  const projectFullName = pathname.split("/")[2];
  return (
    <nav className="flex items-center justify-between w-full h-16 px-8 py-2">
      <Image
        src={LogoIcon}
        alt="logo"
        width={150}
        className={`${pathname !== "/" && "hidden"} cursor-pointer`}
      />

      <div className={`${pathname === "/" ? "hidden" : "block"}`}>
        <ul className="flex items-end gap-2">
          <li className="flex items-end text-2xl">
            <Link href="/">
              <Image
                src={HomeIconPrimary}
                alt="logo"
                height={32}
                width={32}
                className="cursor-pointer"
              />
            </Link>
          </li>

          <li className="text-xl text-[#999999] font-semibold cursor-pointer">
            {pathname !== `/dashboard/${projectFullName}/account` ? `/ ${projectName?.split("_").join(" ")} /` : "/"}
          </li>

          <li className="text-xl font-semibold cursor-pointer text-primary">
            {pathname === `/dashboard/${projectFullName}/configuration` && "Widget Configuration"}
            {pathname === `/dashboard/${projectFullName}` && "Upload"}
            {pathname === `/dashboard/${projectFullName}/account` && "Account Settings"}
            {pathname === `/dashboard/${projectFullName}/edit` && "Transcript"}
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <Image
          src={SettingIcon}
          alt="logo"
          width={32}
          className="cursor-pointer"
        />
        <Image
          src={BellIcon}
          alt="logo"
          width={32}
          className="cursor-pointer"
        />
      </div>
    </nav>
  );
}

export default Navbar;

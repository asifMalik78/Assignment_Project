"use client";
import LogoIcon from "@/public/images/logo.svg";
import SettingIcon from "@/public/images/setting-dashboard.svg";
import SettingIconActive from "@/public/images/setting-dashboard-active.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();
  const projectId = pathname.split("/")[2]?.split("-")[0];
  const projectFullName = pathname.split("/")[2];
  return (
    <section className="flex flex-col justify-between w-full h-screen p-3 bg-secondary">
      <header className="flex flex-col gap-6">
        <Link href="/">
          <Image
            src={LogoIcon}
            alt="logo"
            width={150}
            className="cursor-pointer"
          />
        </Link>

        <main className="flex flex-col gap-3">
          <h1 className="text-[#49454F] text-lg font-semibold">
            Podcast Upload Flow
          </h1>

          <ul className="flex flex-col gap-3 py-2 border-b-2 border-gray-300">
            <Link href={`/dashboard/${projectFullName}`}>
              <li
                className={`flex items-center w-full gap-3 p-2  rounded-full cursor-pointer ${
                  pathname === `/dashboard/${projectFullName}` ||
                  pathname === `/dashboard/${projectFullName}/edit`
                    ? "bg-primary text-white hover:bg-none"
                    : "text-[#211933] hover:bg-[#e2d8ee]"
                }`}
              >
                <span
                  className={`w-7 h-7 text-sm rounded-full  flex justify-center items-center ${
                    pathname === `/dashboard/${projectFullName}` ||
                    pathname === `/dashboard/${projectFullName}/edit`
                      ? "bg-[#211935]"
                      : "bg-[#d9cfe4]"
                  }`}
                >
                  1
                </span>
                Projects
              </li>
            </Link>
            <Link href={`/dashboard/${projectFullName}/configuration`}>
              <li
                className={`flex items-center w-full gap-3 p-2  rounded-full   cursor-pointer ${
                  pathname === `/dashboard/${projectFullName}/configuration`
                    ? "bg-primary text-white hover:bg-none"
                    : "text-[#211933] hover:bg-[#e2d8ee]"
                }`}
              >
                <span
                  className={`w-7 h-7 text-sm rounded-full  flex justify-center items-center ${
                    pathname === `/dashboard/${projectFullName}/configuration`
                      ? "bg-[#211935]"
                      : "bg-[#d9cfe4]"
                  }`}
                >
                  2
                </span>
                Widget Configurations
              </li>
            </Link>
            <li className="flex items-center w-full gap-3 p-2 text-[#211933] rounded-full bg-transparent hover:bg-[#e2d8ee] cursor-pointer">
              <span className="w-7 h-7 text-sm rounded-full bg-[#d9cfe4] flex justify-center items-center">
                3
              </span>
              Deployment
            </li>
            <li className="flex items-center w-full gap-3 p-2 text-[#211933] rounded-full bg-transparent hover:bg-[#e2d8ee] cursor-pointer">
              <span className="w-7 h-7 text-sm rounded-full bg-[#d9cfe4] flex justify-center items-center">
                4
              </span>
              Pricing
            </li>
          </ul>
        </main>
      </header>

      <footer className="pt-4 border-t-2 border-gray-300">
        <Link href={`/dashboard/${projectFullName}/account`}>
          <div
            className={`flex items-center w-full gap-3 p-2  rounded-full  cursor-pointer ${
              pathname === `/dashboard/${projectFullName}/account`
                ? "bg-primary text-white hover:bg-none"
                : "text-[#211933] hover:bg-[#e2d8ee]"
            }`}
          >
            <span
              className={`w-7 h-7 text-sm rounded-full bg-[#211933] flex justify-center items-center ${
                pathname ===  `/dashboard/${projectFullName}/account`
                  ? "bg-[#211935]"
                  : "bg-[#d9cfe4]"
              }`}
            >
              {pathname ===  `/dashboard/${projectFullName}/account` ? (
                <Image src={SettingIconActive} alt="setting-icon" width={22} />
              ) : (
                <Image src={SettingIcon} alt="setting-icon" width={22} />
              )}
            </span>
            Settings
          </div>
        </Link>
      </footer>
    </section>
  );
}

export default Sidebar;

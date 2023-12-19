"use client";
import {formatDistanceToNow} from "date-fns"
import HomeIcon from "@/public/images/home-icon.svg";
import PodcastImage from "@/public/images/podcast.svg";
import AddIcon from "@/public/images/add-icon.svg";
import Image from "next/image";
import CreateProjectModal from "@/modals/CreateProjectModal";
import LoginModal from "@/modals/LoginModal";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getRandomColor, formatName } from "@/utlis/helper";
import { projectsData } from "@/utlis/constant";
import Link from "next/link";
import { useUserContext } from "@/provider/ContextProvider";
import { getUserProjects } from "@/utlis/apiCall";

export default function Home() {
  const { user, projects, setProjects } = useUserContext();

  const fetchProjects = async function () {
   if(user){
    const allProject = await getUserProjects(user._id);
    setProjects(allProject);
   }
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <section className="max-w-[94rem] w-full h-full mx-auto">
      <Navbar />
      <main className="px-32 pt-6 pb-10 w-full h-full max-w-[90rem] mx-auto">
        <button className="flex items-end gap-1 px-3 py-1 border-2 rounded-full  border-[#999999]  shadow-md shadow-slate-300">
          <Image src={HomeIcon} alt="home-icon" width={20} />
          <p className="text-[#3C3C3C] text-[0.79rem] font-semibold">
            Back to Home
          </p>
        </button>

        {projects?.length === 0 ? (
          <section className="flex flex-col items-center gap-6 mt-2">
            <h1 className="text-5xl font-semibold text-center text-primary">
              Create a New Project
            </h1>
            <Image src={PodcastImage} alt="podcast" width={400} />

            <p className="text-center text-[#838383] text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in
            </p>

            {user?.email ? (
              <CreateProjectModal>
                <button className="flex items-center bg-[#211935] py-3 px-4 rounded-md gap-4">
                  <Image src={AddIcon} alt="home-icon" width={30} height={30} />
                  <p className="text-[#ffffff] text-lg font-semibold">
                    Create New Project
                  </p>
                </button>
              </CreateProjectModal>
            ) : (
              <LoginModal>
                <button className="flex items-center bg-[#211935] py-3 px-4 rounded-md gap-4">
                  <p className="text-[#ffffff] text-lg font-semibold">
                    Create Account
                  </p>
                </button>
              </LoginModal>
            )}
          </section>
        ) : (
          <section className="mt-4">
            <div className="flex items-center justify-between ">
              <h1 className="text-5xl font-semibold text-primary">Projects</h1>
              <CreateProjectModal>
                <button className="flex items-center bg-[#211935] py-3 px-5 rounded-md gap-4">
                  <Image src={AddIcon} alt="home-icon" width={30} height={30} />
                  <p className="text-[#ffffff] text-lg font-semibold">
                    Create New Project
                  </p>
                </button>
              </CreateProjectModal>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-10">
              {projects?.map((curr, idx) => {
                const color = getRandomColor();
                const projectNameAndId = `${curr._id.toString()}-${curr.projectName
                  .split(" ")
                  .join("_")}`;

                return (
                  <Link
                    href={`/dashboard/${projectNameAndId}/`}
                    className="cursor-pointer border-2 border-[#999999] rounded-xl flex gap-5 p-2  items-center shadow-xl shadow-slate-200"
                    key={curr._id}
                  >
                    <div
                      className="flex items-center justify-center w-[6.5rem] h-24 text-5xl text-white bg-primary rounded-xl"
                      style={{ backgroundColor: `${color}` }}
                    >
                      {formatName(curr.projectName)}
                    </div>
                    <div className="flex flex-col gap-5">
                      <div>
                        <h3 className="text-[1.3rem] font-semibold text-primary">
                          {curr.projectName}
                        </h3>
                        <p className="text-sm text-black">
                          {curr.projectEpisodes.length} Episodes
                        </p>
                      </div>
                      <p className="text-xs text-[#999999]">
                        Last edited {formatDistanceToNow(new Date(curr.updatedAt))} ago
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </section>
  );
}

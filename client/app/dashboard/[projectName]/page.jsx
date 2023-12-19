"use client";

import Image from "next/image";
import YoutubeIcon from "@/public/images/youtube-icon.svg";
import CloudIcon from "@/public/images/cloud.svg";
import UploadModal from "@/modals/UploadModal";
import DataTable from "@/components/DataTable";
import { useUserContext } from "@/provider/ContextProvider";
import UploadCard from "@/components/UploadCard";
import { useEffect } from "react";
import { getAllEpisodes } from "@/utlis/apiCall";
import { usePathname } from "next/navigation";

function DashboardHome() {
  const pathname = usePathname();
  const projectId = pathname.split("/")[2]?.split("-")[0];
  const { episodes, setEpisodes } = useUserContext();

  const fetchData = async function () {
    const allEpisodes = await getAllEpisodes(projectId);
    setEpisodes(allEpisodes);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="mt-6 px-9">
      <h1 className="text-3xl font-semibold text-primary">Upload</h1>

      {episodes.length === 0 ? (
        <div className="grid grid-cols-[1fr_1fr_1fr] mt-5 gap-x-20 gap-y-8">
          <UploadCard text="Youtube Video" projectId={projectId} />
          <UploadCard text="Spotify Podcast" projectId={projectId} />
          <UploadCard text="RSS Feed" projectId={projectId} />
          <UploadCard text="Youtube Video" projectId={projectId} />
          <UploadCard text="Spotify Podcast" projectId={projectId} />
          <UploadCard text="RSS Feed" />
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_1fr_1fr] mt-5 gap-x-20 gap-y-8">
          <UploadCard text="Youtube Video" projectId={projectId} />
          <UploadCard text="Spotify Podcast" projectId={projectId} />
          <UploadCard text="RSS Feed" projectId={projectId} />
        </div>
      )}

      {episodes.length === 0 ? (
        <div>
          <div className="my-6 text-center text-[#999999] font-semibold text-2xl w-full">
            or
          </div>
          <div className="w-full border-dotted border-2 border-[#999999]  gap-2 rounded-2xl flex flex-col justify-center items-center py-6">
            <Image src={CloudIcon} alt="cloud-icon" width={65} />
            <div className="flex flex-col items-center">
              <p className="text-[#999999] text-lg font-semibold">
                Select a file or drag and drop here (Podcast Media or
                Transcription Text)
              </p>
              <p className="text-[#00000066] text-md">
                MP4, MOV, MP3, WAV, PDF, DOCX or TXT file{" "}
              </p>
            </div>
            <button className="px-6 py-2 border-2 rounded-full border-primary">
              Select File
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-8 ">
            <div className="flex items-center justify-between w-full px-5 py-3 rounded-lg bg-primary">
              <p className="text-lg font-semibold text-white">
                All files are processed! Your widget is ready to go!
              </p>
              <button className="px-4 py-2 font-semibold bg-white rounded-lg">
                Try it out!
              </button>
            </div>
          </div>

          <div className="pb-12 mt-8">
            <DataTable />
          </div>
        </div>
      )}
    </main>
  );
}

export default DashboardHome;

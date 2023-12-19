"use client";
import { useSearchParams } from "next/navigation";
import PencilIcon from "@/public/images/pencil.svg";
import SearchIcon from "@/public/images/search-icon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserContext } from "@/provider/ContextProvider";
import { getEpisode, updateEpisodeDesc } from "@/utlis/apiCall";
import { useRouter } from "next/navigation";

function EditPage() {
  const router = useRouter();
  const { setEpisodes } = useUserContext();
  const searchParams = useSearchParams();
  const episodeId = searchParams.get("eid");
  const [desc, setDesc] = useState("");
  const [savedDesc, setSavedDesc] = useState("");
  const [editable, setEditable] = useState(false);

  const fetchEpisode = async function () {
    const episode = await getEpisode(episodeId);
    setDesc(episode.desc);
    setSavedDesc(episode.desc);
  };

  const discardHandler = function () {
    setDesc(savedDesc);
    setEditable(!editable);
  };

  const saveHandler = async function () {
    const episode = await updateEpisodeDesc(episodeId , {desc});
    setEpisodes((prev) => {
      return prev.map((curr) => {
        if (curr._id === episodeId) {
          return episode;
        }

        return curr;
      });
    });
    
    router.back();
  };

  useEffect(() => {
    fetchEpisode();
  }, []);
  return (
    <main className="mt-6 px-9">
      <div className="flex items-center justify-between h-12 ">
        <h1 className="text-3xl font-semibold text-primary">Edit Transcript</h1>
        {editable && (
          <div className="flex items-center gap-2">
            <button
              className="px-10 py-2 font-semibold text-red-500 rounded-lg outline outline-2 outline-red-500"
              onClick={discardHandler}
            >
              Discard
            </button>
            <button
              className="px-6 py-2 text-white bg-black rounded-lg"
              onClick={saveHandler}
            >
              Save & Exit
            </button>
          </div>
        )}
      </div>

      <div className="w-full px-4 pb-4 mt-8 border-2 rounded-lg border-primary max-h-[32rem] overflow-y-hidden relative">
        <div className="sticky top-0 left-[-35%] right-0 flex items-center justify-between px-0 py-2 bg-white z-10">
          <button
            className="flex items-center gap-2 bg-[#3C3C3C] text-white px-3 py-2 rounded-full text-sm"
            onClick={() => setEditable(!editable)}
          >
            <Image src={PencilIcon} alt="pencil-icon" width={18} />
            Edit Mode
          </button>

          <Image
            src={SearchIcon}
            alt="search-icon"
            width={35}
            height={35}
            className="cursor-pointer"
          />
        </div>

        {editable ? (
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows="10"
            className={`w-full p-1 mt-2 bg-transparent  rounded-md resize-none h-96 -z-10 focus:outline-1 ${editable ?'border-2 border-primary outline-none' : 'border-none'} focus:ring-0`}
          ></textarea>
        ) : (
          <div className="p-1 mt-2 overflow-y-auto bg-transparent h-96 -z-10">
            <span className="w-full ">{savedDesc}</span>
          </div>
        )}
      </div>
    </main>
  );
}

export default EditPage;

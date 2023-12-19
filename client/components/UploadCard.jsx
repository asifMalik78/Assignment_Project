import UploadModal from "@/modals/UploadModal";
import Image from "next/image";
import Youtube from "@/public/images/youtube-icon.svg";
import RSS from "@/public/images/sound-cloud-icon.svg";
import Spotify from "@/public/images/spotify-icon.svg";

function UploadCard({ text, projectId }) {
  const IconName = text.split(" ")[0];
  return (
    <UploadModal text={IconName} projectId={projectId}>
      <div className="cursor-pointer border-2 border-[#999999] rounded-xl flex items-center py-3 px-4 shadow-md shadow-slate-300 gap-8  w-full">
        {IconName === "Youtube" && (
          <Image src={Youtube} alt="youtube-icon" width={72} />
        )}
        {IconName === "Spotify" && (
          <Image src={Spotify} alt="youtube-icon" width={72} />
        )}
        {IconName === "RSS" && (
          <Image src={RSS} alt="youtube-icon" width={72} />
        )}
        <div className="flex flex-col justify-between">
          <p className="text-xl text-[#3C3C3C] font-semibold">Upload</p>
          <p className="text-xl text-[#3C3C3C] font-semibold">{text}</p>
        </div>
      </div>
    </UploadModal>
  );
}

export default UploadCard;

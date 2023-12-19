"use client";
import { useUserContext } from "@/provider/ContextProvider";
import { usePathname, useRouter } from "next/navigation";
import { eposideTime } from "@/utlis/helper";
import { deleteEpisode } from "@/utlis/apiCall";

export default function DataTable() {
  const { episodes, setEpisodes } = useUserContext();
  const pathname = usePathname();
  const router = useRouter();
  const projectFullName = pathname.split("/")[2];

  const deleteEpisodeHandler = async function (episodeId) {
    await deleteEpisode(episodeId);
    setEpisodes((prev) => {
      return prev.filter((curr) => curr._id != episodeId);
    });
  };
  return (
    <section className="w-full py-2 border-2 border-gray-200 shadow-md rounded-xl shadow-slate-300">
      <table class="table-auto  w-full text-lg border-collapse ">
        <thead className="border-collapse">
          <tr>
            <th className="py-3 pl-10 text-left">Name</th>
            <th className="py-3 pr-10 text-center ">Upload Date & Time</th>
            <th className="py-3 pr-10 text-center ">Status</th>
            <th className="py-3 pr-10 text-right ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {episodes?.map((curr, idx) => {
            return (
              <tr key={idx}>
                <td className="border-t-2 border-bg-gray-300 pl-10 text-left py-3 text-[#3C3C3C] font-medium">
                  {curr.episodeName}
                </td>
                <td className="border-t-2 border-bg-gray-300 pr-10  text-center py-3 text-[#3C3C3C] font-medium">
                  {eposideTime(curr.updatedAt)}
                </td>
                <td className="border-t-2 border-bg-gray-300 pr-10 text-center py-3 text-[#3C3C3C] font-medium">
                  {curr.status}
                </td>
                <td className="border-t-2 border-bg-gray-300 pr-10 text-right py-3 text-[#3C3C3C] font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="px-4 py-1 border-2 rounded-md border-bg-gray-300"
                      onClick={() => {
                        router.push(`/dashboard/${projectFullName}/edit?eid=${curr._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-1 text-red-500 border-2 rounded-md border-bg-gray-300"
                      onClick={() => deleteEpisodeHandler(curr._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

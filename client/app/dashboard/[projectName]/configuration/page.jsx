"use client";
import DisplayForm from "@/components/DisplayConfigForm";
import GeneralForm from "@/components/GeneralConfigForm";
import { useUserContext } from "@/provider/ContextProvider";
import { getProject } from "@/utlis/apiCall";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

let tab = ["General", "Display", "Advanced"];

function WidgetConfiguration() {
  const pathname = usePathname();
  const projectId = pathname.split("/")[2]?.split("-")[0];
  const [selectedTab, setSelectedTab] = useState(tab[0]);
  const { setGeneralConfiguration, setDisplayConfiguration } = useUserContext();

  const fetchData = async function () {
    const project = await getProject(projectId);

    setGeneralConfiguration(project.generalConfiguration);
    setDisplayConfiguration(project.displayConfiguration);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="mt-6 px-9">
      <h1 className="text-3xl font-semibold text-primary">Configuration</h1>

      <ul className="flex gap-5 mt-8 text-lg font-medium border-b-[3px] border-[#dadada] pb-1">
        {tab.map((curr, idx) => {
          return (
            <li
              key={idx}
              onClick={() => setSelectedTab(curr)}
              className={`relative px-2 cursor-pointer w-fit ${
                curr === selectedTab
                  ? "text-primary font-semibold"
                  : "text-[#3C3C3C]"
              }`}
            >
              {curr}
              {curr === selectedTab ? (
                <motion.div
                  className="absolute left-[0] right-[0] bottom-[-26%] rounded-full h-[5px] bg-primary "
                  layoutId="underline"
                />
              ) : null}
            </li>
          );
        })}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          ></motion.div>
        </AnimatePresence>
      </ul>
      <main>
        {selectedTab === "General" && <GeneralForm />}
        {selectedTab === "Display" && (
          <div className="h-[71.4vh] pr-3 mt-2 scrollbar  overflow-y-auto scroll-m-0">
            <DisplayForm />
          </div>
        )}
      </main>
    </main>
  );
}

export default WidgetConfiguration;

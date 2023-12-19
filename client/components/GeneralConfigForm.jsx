"use client";
import { useUserContext } from "@/provider/ContextProvider";
import { updateGeneralConfig } from "@/utlis/apiCall";
import { useState } from "react";

function GeneralForm() {
  const { generalConfiguration , displayConfiguration } = useUserContext();

  const [data, setData] = useState({
    chatBotName: "",
    inputPlaceholder: "",
    welcomeMessage: "",
  });

  const saveHandler = async function () {
    if (!data.chatBotName && !data.inputPlaceholder && !data.welcomeMessage) {
      return;
    }

    const confgData = {};
    if (data.chatBotName != "") {
      confgData.chatBotName = data.chatBotName;
    }

    if (data.welcomeMessage != "") {
      confgData.welcomeMessage = data.welcomeMessage;
    }

    if (data.inputPlaceholder != "") {
      confgData.inputPlaceholder = data.inputPlaceholder;
    }

    await updateGeneralConfig(generalConfiguration._id, confgData);

    setData({ chatBotName: "", inputPlaceholder: "", welcomeMessage: "" });
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="chatbot-name"
          className="text-[#3C3C3C] text-xl font-semibold"
        >
          Chatbot Name
        </label>
        <input
          type="text"
          name="chatBotName"
          value={data.chatBotName}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          id="chatbot-name"
          className="px-2 py-1 border border-gray-400 rounded-md focus:outline-none "
        />
        <p className="text-[#646464]">
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="welcome-message"
          className="text-[#3C3C3C] text-xl font-semibold"
        >
          Welcome Message
        </label>
        <input
          type="text"
          id="welcome-message"
          name="welcomeMessage"
          value={data.welcomeMessage}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          className="px-2 py-1 border border-gray-400 rounded-md focus:outline-none "
        />
        <p className="text-[#646464]">
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="input-placeholder"
          className="text-[#3C3C3C] text-xl font-semibold"
        >
          Input Placeholder
        </label>
        <input
          type="text"
          id="input-placeholder"
          name="inputPlaceholder"
          value={data.inputPlaceholder}
          onChange={(e) =>
            setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          className="px-2 py-1 border border-gray-400 rounded-md focus:outline-none "
        />
        <p className="text-[#646464]">
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
      </div>
      <button
        className="px-10 py-2 mt-8 mr-auto text-white rounded-lg bg-primary"
        onClick={saveHandler}
      >
        Save
      </button>
    </div>
  );
}

export default GeneralForm;

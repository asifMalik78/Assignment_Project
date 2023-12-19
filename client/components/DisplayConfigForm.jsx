"use client";
import { Switch, Select, SelectItem } from "@nextui-org/react";
import UploadIcon from "@/public/images/upload-icon.svg";
import { useState } from "react";
import Image from "next/image";
import uploadOnAWSS3 from "@/utlis/fileUpload";
import { Progress } from "@nextui-org/react";
import { useUserContext } from "@/provider/ContextProvider";
import { updateDisplayConfig } from "@/utlis/apiCall";

function DisplayForm() {
  const { displayConfiguration } = useUserContext();

  const [showSources, setShowSources] = useState(true);
  const [color, setColor] = useState({
    primaryColor: "#7bd568",
    fontColor: "#000000",
  });
  const [distance, setDistance] = useState({
    bottomDistance: 20,
    horizontalDistance: 20,
  });
  const [fontSize, setFontSize] = useState(24);
  const [chatHeight, setChatHeight] = useState(50);
  const [chatIconSize, setChatIconSize] = useState({
    key: "Small (48 * 48)",
    value: "small",
  });
  const [screenPosition, setScreenPosition] = useState({
    key: "Bottom Left",
    value: "bottom left",
  });

  const [file, setFile] = useState(null);
  const [uploadImgUrl, setUploadImgUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFileHandler = async function () {
    if (file) {
      setLoading(true);
      const url = await uploadOnAWSS3(file, `${Date.now()}-bot-icon.png`);
      setUploadImgUrl(url);
      setLoading(false);
    }
  };
  const saveDataHandler = async function () {
    let displayConfigData = {
      primaryColor: color.primaryColor,
      fontColor : color.fontColor,
      fontSize,
      chatHeight,
      showSources,
      chatIconSize: chatIconSize.value,
      screenPosition: screenPosition.value,
      bottomDistance: distance.bottomDistance,
      horizontalDistance: distance.horizontalDistance,
    };

    if (uploadImgUrl != "") {
      displayConfigData = { ...displayConfigData, botIcon: uploadImgUrl };
    }

    await updateDisplayConfig(displayConfiguration._id, displayConfigData);
  };
  return (
    <div className="pb-16 mt-6">
      <div className="grid grid-cols-[1fr_1fr] gap-24 mb-6">
        <div>
          <label
            htmlFor="primary-color"
            className="text-[#3C3C3C] text-xl font-semibold"
          >
            Primary Color
          </label>
          <div className="flex items-center w-full gap-2">
            <input
              type="text"
              id="primary-color"
              value={color.primaryColor}
              onChange={(e) => {
                setColor((prev) => ({ ...prev, primaryColor: e.target.value }));
              }}
              className="w-full px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
              placeholder="#7BD568"
            />
            <input
              value={color.primaryColor}
              onChange={(e) => {
                setColor((prev) => ({ ...prev, primaryColor: e.target.value }));
              }}
              type="color"
            />
          </div>
          <p className="text-[#646464]">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </p>
        </div>

        <div>
          <label
            htmlFor="font-color"
            className="text-[#3C3C3C] text-xl font-semibold"
          >
            Font Color
          </label>
          <div className="flex items-center w-full gap-2">
            <input
              type="text"
              id="font-color"
              value={color.fontColor}
              onChange={(e) => {
                setColor((prev) => ({ ...prev, fontColor: e.target.value }));
              }}
              className="w-full px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
              placeholder="#3C3C3C"
            />
            <input
              type="color"
              className="w-10 h-10 bg-transparent border-none rounded-lg appearance-nonen"
              value={color.fontColor}
              onChange={(e) => {
                setColor((prev) => ({ ...prev, fontColor: e.target.value }));
              }}
            />
          </div>
          <p className="text-[#646464]">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-24 mb-6">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="font-size"
            className="text-[#3C3C3C] text-xl font-semibold"
          >
            Font Size (in px)
          </label>
          <div>
            <input
              type="number"
              id="font-size"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
              placeholder="25"
            />
          </div>
          <p className="text-[#646464]">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="chat-height"
            className="text-[#3C3C3C] text-xl font-semibold"
          >
            Chat Height (in % of total screen)
          </label>
          <div>
            <input
              type="number"
              id="chat-height"
              value={chatHeight}
              onChange={(e) => setChatHeight(e.target.value)}
              className="w-full px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
              placeholder="lorem ipsum"
            />
          </div>
          <p className="text-[#646464]">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <label className="text-[#3C3C3C] text-xl font-semibold">
            Show Sources
          </label>
          <p className="text-[#646464]">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </p>
        </div>

        <Switch
          isshowSources={showSources}
          onClick={() => setShowSources(!showSources)}
        />
      </div>

      <hr className="w-full bg-[#dadada] h-[3px]" />

      <div className="mt-6">
        <div className="text-xl font-semibold text-primary">Chat Icon</div>
        <div className="grid grid-cols-[1fr_1fr] gap-x-24 gap-y-6 mt-6 ">
          <div className="flex flex-col gap-1">
            <label className="text-[#3C3C3C] text-xl font-semibold">
              Chat Icon Size
            </label>
            <div>
              <Select
                variant={"bordered"}
                labelPlacement="outside-left"
                placeholder={chatIconSize.key}
                style={{
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                  padding: "0.22rem 0.5rem",
                }}
              >
                <SelectItem
                  value={"small"}
                  onClick={(e) => {
                    setChatIconSize({ key: "Small (48 * 48)", value: "small" });
                  }}
                >
                  Small (48 * 48)
                </SelectItem>
                <SelectItem
                  value={"medium"}
                  onClick={(e) => {
                    setChatIconSize({
                      key: "Medium (64 * 64)",
                      value: "medium",
                    });
                  }}
                >
                  Medium (64 * 64)
                </SelectItem>
                <SelectItem
                  value={"Large"}
                  onClick={(e) => {
                    setChatIconSize({ key: "Large (82 * 82", value: "large" });
                  }}
                >
                  Large (82 * 82)
                </SelectItem>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#3C3C3C] text-xl font-semibold">
              Position on Screen
            </label>
            <div>
              <Select
                variant={"bordered"}
                labelPlacement={screenPosition.key}
                placeholder="Bottom Right"
                style={{
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                  padding: "0.22rem 0.5rem",
                }}
              >
                <SelectItem
                  value={"top left"}
                  onClick={() => {
                    setScreenPosition({ key: "Top Left", value: "top left" });
                  }}
                >
                  Top Left
                </SelectItem>
                <SelectItem
                  value={"top right"}
                  onClick={() => {
                    setScreenPosition({ key: "Top Right", value: "top right" });
                  }}
                >
                  Top Right
                </SelectItem>
                <SelectItem
                  value={"bottom left"}
                  onClick={() => {
                    setScreenPosition({
                      key: "Bottom Left",
                      value: "bottom left",
                    });
                  }}
                >
                  Bottom Left
                </SelectItem>
                <SelectItem
                  value={"bottom right"}
                  onClick={() => {
                    setScreenPosition({
                      key: "Bottom Right",
                      value: "bottom right",
                    });
                  }}
                >
                  Bottom Right
                </SelectItem>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#3C3C3C] text-xl font-semibold">
              Distance from bottom (in px)
            </label>
            <div>
              <input
                type="number"
                name="bottomDistance"
                value={distance.bottomDistance}
                onChange={(e) => {
                  setDistance((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
                placeholder="20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#3C3C3C] text-xl font-semibold">
              Horizontal Distance (in px)
            </label>
            <div>
              <input
                type="number"
                name="horizontalDistance"
                value={distance.horizontalDistance}
                onChange={(e) => {
                  setDistance((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
                placeholder="20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-[#3C3C3C] text-xl font-semibold">
              Bot Icon
            </label>
            <div className="flex items-end gap-3">
              {file ? (
                <label
                  className="relative w-20 h-20 overflow-hidden rounded-full cursor-pointer"
                  htmlFor="upload-file"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="upload-img"
                    fill
                    className="object-cover w-full h-full"
                  />
                </label>
              ) : (
                <label
                  htmlFor="upload-file"
                  className="w-20 h-20 bg-gray-400 rounded-full cursor-pointer"
                ></label>
              )}
              <div className="flex flex-col gap-1">
                <input
                  type="file"
                  id="upload-file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
                <button
                  htmlFor="upload-file"
                  className="flex items-center gap-2 py-2 font-medium text-white rounded-md cursor-pointer px-7 bg-primary"
                  onClick={uploadFileHandler}
                >
                  {loading ? "Uploading" : "Upload"} Image
                  <Image src={UploadIcon} alt="upload-icon" width={24} />
                </button>
                <p className="text-xs">Recommended Size: 48x48px</p>
                {loading && (
                  <Progress
                    size="sm"
                    isIndeterminate
                    aria-label="Loading..."
                    className="max-w-md"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          className="px-10 py-2 mt-8 text-white rounded-lg bg-primary"
          onClick={saveDataHandler}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default DisplayForm;

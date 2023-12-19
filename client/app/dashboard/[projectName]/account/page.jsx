"use client";
import { useUserContext } from "@/provider/ContextProvider";
import Avatar from "@/public/images/avatar.svg";
import { updateUserAccount } from "@/utlis/apiCall";
import Image from "next/image";
import { useState } from "react";

function Account() {
  const { user, updateUser } = useUserContext();
  const [data, setData] = useState({
    username: user.username,
    email: user.email,
  });

  const updateAccountHandler = async function () {
    const updatedUser = await updateUserAccount(user._id, data);
    console.log(updatedUser)
    updateUser(updatedUser);
  };
  return (
    <div className="mt-6 px-9">
      <h1 className="text-3xl font-semibold text-primary">Account Settings</h1>
      <div className="flex items-center w-full gap-6 mt-6">
        <Image
          src={Avatar}
          alt="avatar"
          width={85}
          height={85}
          className="rounded-full"
        />
        <div className="flex-1">
          <label className="text-[#3C3C3C] text-xl font-semibold">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={(e) =>
              setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            className="w-full px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
            placeholder="alphauser"
          />
        </div>

        <div className="flex-1">
          <label className="text-[#3C3C3C] text-xl font-semibold">Email</label>
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            className="w-full px-2 py-1 border border-gray-500 rounded-md focus:outline-none"
            placeholder="alphauser@gmail.com"
          />
        </div>
      </div>

      <button
        className="px-6 py-1 mt-5 text-lg text-white rounded-lg bg-primary"
        onClick={updateAccountHandler}
      >
        Update
      </button>

      <h1 className="mt-10 mb-5 text-3xl font-semibold text-primary">
        Subscriptions
      </h1>
      <div className="flex items-center justify-between px-8 py-5 text-white rounded-lg bg-primary">
        <div className="text-2xl">
          You are currently on the{" "}
          <span className="font-semibold">Ques AI Basic Plan!</span>
        </div>
        <button className="px-6 py-2 font-semibold bg-white rounded-lg text-primary">
          Upgrade
        </button>
      </div>

      <div className="mt-5 font-semibold text-red-500 underline">
        Cancel Subscription
      </div>
    </div>
  );
}

export default Account;

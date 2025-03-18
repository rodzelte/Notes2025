import React from "react";

import AddButton from "./addButton";
import NoteCard from "./noteCard";

export default function Header({ userName }) {
  return (
    <div className="bg-gray-200 h-screen">
      <div className="flex justify-between p-4 px-8 ">
        <h1 className="font-bold font-stretch-expanded text-xl">
          Welcome to myNotes!
        </h1>
        <p>Welcome Back! {userName} </p>
      </div>
      <div className="flex flex-col gap-10">
        <div className="">
          <AddButton />
        </div>
        <div className="bg-gray-400 ">
          <div className="grid grid-cols-4 gap-4 p-4">
            <NoteCard />
          </div>
        </div>
      </div>
    </div>
  );
}

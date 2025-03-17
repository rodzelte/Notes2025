import React from "react";

import addNote from "./addNote";
import AddNote from "./addNote";

export default function Header({ userName }) {
  return (
    <div className="bg-gray-200 h-screen">
      <div className="flex justify-between p-4 px-8 ">
        <h1 className="font-bold font-stretch-expanded text-xl">
          Welcome to myNotes!
        </h1>
        <p>Welcome Back! {userName} </p>
      </div>
      <div className="">
        <AddNote />
      </div>
    </div>
  );
}

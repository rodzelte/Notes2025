import { SquarePlus } from "lucide-react";
import React from "react";

export default function AddNote() {
  return (
    <>
      <div className="">
        <button className="flex cursor-pointer border border-black bg-green-400 rounded-full p-5">
          <SquarePlus />
          Add Note
        </button>
      </div>
    </>
  );
}

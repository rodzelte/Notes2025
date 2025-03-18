import { SquarePlus } from "lucide-react";
import React from "react";

export default function AddButton({ onHandleClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("Add note button clicked");
    onHandleClick();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex gap-2 cursor-pointer justify-self-center"
      >
        <SquarePlus />
        Add note
      </button>
    </div>
  );
}

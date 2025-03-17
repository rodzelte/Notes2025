import React from "react";

export default function NoteCard({
  title,
  description,
  isCompleted,
  onHandleSubmit,
}) {
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            isCompleted
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      <button
        onClick={onHandleSubmit}
        className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isCompleted ? "M5 13l4 4L19 7" : "M12 6v6m0 0v6m0-6h6m-6 0H6"}
          />
        </svg>
        {isCompleted ? "Mark Pending" : "Mark Complete"}
      </button>
    </div>
  );
}

import React, { useState } from "react";

export default function AddNote() {
  const [form, setIsForm] = useState(true);
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, description, isComplete);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4"
      >
        <h1 className="text-center">Add a Note</h1>
        <h2 className="text-2xl font-bold text-gray-800 text-center">Title</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength="2"
            autoFocus
          />

          <input
            type="text"
            placeholder="Enter your description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            minLength="2"
            autoFocus
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

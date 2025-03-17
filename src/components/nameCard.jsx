import React from "react";

export default function CardName({ onHandleSubmit }) {
  const [name, setName] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) return;

    onHandleSubmit(trimmedName);
    setName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          What's your name?
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

import React from "react";
import CardName from "./components/nameCard";
import Header from "./components/Header";
import NoteCard from "./components/noteCard";
import addNote from "./components/addNote";
import AddNote from "./components/addNote";

export default function App() {
  const [name, setName] = React.useState("");
  const [card, setCard] = React.useState(true);

  const handleSubmit = (name) => {
    setName(name);
    setCard(false);
  };

  return (
    <>
      {/* {name && <Header userName={name} />}
      {card && <CardName onHandleSubmit={handleSubmit} />}
      {card && <CardName onHandleSubmit={handleSubmit} />} */}

      <Header />
      <AddNote />
      {}
    </>
  );
}

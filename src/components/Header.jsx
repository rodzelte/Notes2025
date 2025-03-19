"use client";

import { Search, Plus, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddNote } from "./AddNote";
import { useState } from "react";

export default function Header({ onSearch, onFilterChange }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSaveNote = (note) => {
    // Here you would typically save the note to your state or database
    console.log("New note created:", note);
    // For demonstration purposes, we're just logging the note
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Propagate the search query change to the parent component
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    onFilterChange({ status, tags: selectedTags });
  };

  const handleTagChange = (tags) => {
    setSelectedTags(tags);
    onFilterChange({ status: selectedStatus, tags });
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background px-4 py-3">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">My Notes</h1>
        </div>

        <div className="flex flex-1 items-center gap-2 sm:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button size="icon" variant="ghost">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-1 h-4 w-4" />
            New Note
          </Button>
        </div>
      </div>
      <AddNote
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveNote}
      />
    </header>
  );
}

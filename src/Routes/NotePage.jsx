"use client";

import { useState, useMemo } from "react";
import NotesHeader from "@/components/Header";
import { NoteCard } from "@/components/NoteCards";

// Sample tags
const sampleTags = [
  { id: "1", name: "Work", color: "#ef4444" },
  { id: "2", name: "Personal", color: "#3b82f6" },
  { id: "3", name: "Ideas", color: "#10b981" },
  { id: "4", name: "Important", color: "#f59e0b" },
  { id: "5", name: "Later", color: "#8b5cf6" },
];

// Sample notes
const initialNotes = [
  {
    id: "1",
    title: "Meeting Notes",
    content:
      "Discussion points from the team meeting on project timeline and resource allocation.",
    isComplete: false,
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    tags: [sampleTags[0], sampleTags[3]],
  },
  {
    id: "2",
    title: "Ideas for New Project",
    content: "Brainstorming potential features and implementation strategies.",
    isComplete: true,
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    tags: [sampleTags[2]],
  },
  {
    id: "3",
    title: "Weekly Goals",
    content: "Tasks to complete by the end of the week with priority levels.",
    isComplete: false,
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    tags: [sampleTags[0], sampleTags[4]],
  },
  {
    id: "4",

    title: "Test",

    content: "Test content",

    isComplete: false,

    updatedAt: new Date(),

    tags: [{ id: "1", name: "Work", color: "#000000" }],
  },
];

export default function NotePage() {
  const [notes, setNotes] = useState(initialNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    tags: [],
  });

  // All unique tags from all notes
  const availableTags = useMemo(() => {
    const tagMap = new Map();

    // Add tags from notes that are not in sampleTags
    notes.forEach((note) => {
      note.tags.forEach((tag) => {
        const isSampleTag = sampleTags.some((st) => st.id === tag.id);
        if (!isSampleTag && !tagMap.has(tag.id)) {
          tagMap.set(tag.id, tag);
        }
      });
    });

    // Add all sampleTags (these will not be overwritten)
    sampleTags.forEach((st) => {
      tagMap.set(st.id, st);
    });

    return Array.from(tagMap.values());
  }, [notes]);

  const toggleComplete = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, isComplete: !note.isComplete, updatedAt: new Date() }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Filter notes based on search query and filters
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      // Filter by search query
      const matchesSearch =
        searchQuery === "" ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Filter by completion status
      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "complete" && note.isComplete) ||
        (filters.status === "incomplete" && !note.isComplete);

      // Filter by tags
      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.some((tagId) => note.tags.some((tag) => tag.id === tagId));

      return matchesSearch && matchesStatus && matchesTags;
    });
  }, [notes, searchQuery, filters]);

  return (
    <div className="min-h-screen bg-background">
      <NotesHeader
        onSearch={setSearchQuery}
        onFilterChange={setFilters}
        availableTags={availableTags}
      />
      <main className="container mx-auto p-4">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No notes found. Try adjusting your filters or create a new note.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onToggleComplete={toggleComplete}
                onDelete={deleteNote}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

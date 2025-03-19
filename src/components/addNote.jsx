import { useState, useCallback } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import PropTypes from "prop-types"; // For prop validation

export function AddNote({ open, onOpenChange, onSave, availableTags }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#3b82f6");

  // Ensuring availableTags is always an array
  availableTags = availableTags || [];

  // Handle saving note
  const handleSave = useCallback(() => {
    if (title.trim() && onSave) {
      onSave({ title, content, tags: selectedTags });
      setTitle("");
      setContent("");
      setSelectedTags([]);
      onOpenChange(false);
    }
  }, [title, content, selectedTags, onSave, onOpenChange]);

  // Handle adding a new tag
  const handleAddTag = useCallback(() => {
    if (newTagName.trim()) {
      const newTag = {
        id: Date.now().toString(),
        name: newTagName.trim(),
        color: newTagColor,
      };
      setSelectedTags([...selectedTags, newTag]);
      setNewTagName("");
    }
  }, [newTagName, newTagColor, selectedTags]);

  // Toggle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Remove a tag
  const removeTag = (tagId) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
  };

  // Helper function to determine text color based on background color
  function getContrastColor(hexColor) {
    if (!/^#[0-9A-F]{6}$/i.test(hexColor)) {
      return "#000000"; // Default to black if color is invalid
    }
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
          <DialogDescription>
            Add a new note to your collection. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your note here..."
              className="min-h-[150px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-1 mb-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag.id}
                  style={{
                    backgroundColor: tag.color,
                    color: getContrastColor(tag.color),
                  }}
                  className="px-2 py-0 h-6 flex items-center gap-1"
                >
                  {tag.name}
                  <button
                    onClick={() => removeTag(tag.id)}
                    className="ml-1 rounded-full hover:bg-black/20 p-0.5"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove tag</span>
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="New tag name"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="flex-1"
              />
              <Input
                type="color"
                value={newTagColor}
                onChange={(e) => setNewTagColor(e.target.value)}
                className="w-12 p-1 h-10"
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleAddTag}
                disabled={!newTagName.trim()}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            {availableTags.length > 0 && (
              <>
                <Label className="mt-2">Available Tags</Label>
                <div className="flex flex-wrap gap-1">
                  {availableTags
                    .filter((tag) => !selectedTags.some((t) => t.id === tag.id))
                    .map((tag) => (
                      <Badge
                        key={tag.id}
                        style={{
                          backgroundColor: tag.color,
                          color: getContrastColor(tag.color),
                        }}
                        className="px-2 py-0 h-6 cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            Save Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Prop validation (optional but recommended)
AddNote.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  availableTags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

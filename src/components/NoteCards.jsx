"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

// No need for type definitions, removed the `NoteCardProps` interface
export function NoteCard({ note, onToggleComplete, onDelete }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const formattedDate = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Card
        className={cn(
          "transition-all duration-200",
          note.isComplete && "bg-muted/50 opacity-80"
        )}
      >
        <CardHeader className="pb-2 flex flex-row items-start justify-between">
          <h3
            className={cn(
              "font-medium line-clamp-1",
              note.isComplete && "line-through text-muted-foreground"
            )}
          >
            {note.title}
          </h3>
          <div className="flex items-center space-x-2">
            <Switch
              checked={note.isComplete}
              onCheckedChange={() => onToggleComplete(note.id)}
              aria-label={
                note.isComplete ? "Mark as incomplete" : "Mark as complete"
              }
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              "text-sm text-muted-foreground line-clamp-3",
              note.isComplete && "line-through"
            )}
          >
            {note.content}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-start pt-2">
          <div className="flex flex-wrap gap-1 mb-2">
            {note.tags.map((tag) => (
              <Badge
                key={tag.id}
                style={{
                  backgroundColor: tag.color,
                  color: getContrastColor(tag.color),
                }}
                className="px-2 py-0 h-5 text-xs"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            Updated {formattedDate}
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the note "{note.title}". This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// Helper function to determine text color based on background color
function getContrastColor(hexColor) {
  // Remove the '#' and handle invalid formats
  let hex = hexColor.replace(/^#/, "");

  // Expand 3-digit hex to 6-digits
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  // Default to white if invalid length
  if (hex.length !== 6) {
    return "#ffffff";
  }

  // Parse RGB components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

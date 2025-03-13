import { useState } from "react";
import { X } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function NewFile({ setZipFiles }: { setZipFiles: React.Dispatch<React.SetStateAction<{ id: string; name: string; size: number; file: File }[]>> }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Repository name is required.");
      return;
    }
    if (!file) {
      setError("A ZIP file must be uploaded.");
      return;
    }

    setLoading(true);

    // Add file to the zipFiles array with a unique id
    setZipFiles((prev) => [
      ...prev,
      { id: uuidv4(), name: file.name, size: file.size, file },
    ]);

    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
          Create Repository
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="relative">
        <AlertDialogCancel
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition"
          style={{ cursor: "pointer" }}
        >
          <X className="h-5 w-5" style={{ cursor: "pointer" }} />
        </AlertDialogCancel>

        <AlertDialogHeader>
          <AlertDialogTitle>Create a new repository</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Repository Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="my-awesome-project"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desc">Description (optional)</Label>
            <Input
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description of your project"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="file">ZIP file</Label>
            <Input
              id="file"
              type="file"
              accept=".zip"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button type="submit" disabled={loading} style={{ cursor: "pointer" }}>
                {loading ? "Creating..." : "Create repository"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

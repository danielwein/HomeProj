import { useState } from "react";
import { X } from "lucide-react";
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

interface Repository {
  _id: string;
  Repname: string;
  Desc?: string;
  CreatedAT: string;
  LastChanged:string;
}

export function NewFile({ setZipFiles }: { setZipFiles: React.Dispatch<React.SetStateAction<Repository[]>> }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:3000/auth/reps", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.repositories) {
        setZipFiles(data.repositories);
      }
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token is missing.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("desc", desc);

    try {
      const response = await fetch("http://localhost:3000/auth/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the file.");
      }

      // Refresh repositories after upload
      await fetchRepositories();

      setLoading(false);
      setOpen(false);
      setName("");
      setDesc("");
      setFile(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
      setLoading(false);
    }
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
          <X className="h-5 w-5" />
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

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

export function NewFile() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null); // Error handling

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation: Ensure required fields are filled
    if (!name.trim()) {
      setError("Repository name is required.");
      return;
    }
    if (!file) {
      setError("A ZIP file must be uploaded.");
      return;
    }

    setLoading(true);

    // Simulate async operation
    setTimeout(() => {
      console.log("Submitted", { name, desc, file });
      setLoading(false);
      setOpen(false); // Close the dialog only if everything is valid
    }, 1000);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create Repository</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="relative">
        {/* Close (X) button */}
        <AlertDialogCancel
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition"
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

          {/* Display validation error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create repository"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Folder } from "lucide-react";
import { Link } from "react-router-dom";
import { NewFile } from "@/components/NewFile";

export default function Dashboard() {
  const [zipFiles, setZipFiles] = useState<{ id: string; name: string; size: number; file: File }[]>([]);

  return (
    <div>
      <div
        className="row flex items-center justify-between p-4 px-8"
        style={{ paddingLeft: "15vw", paddingRight: "15vw", marginTop: "1rem" }}
      >
        <h1 className="flex items-center text-3xl font-bold text-gray-800 dark:text-white" style={{ marginRight: "1rem" }}>
          Repositories
        </h1>
        <NewFile setZipFiles={setZipFiles} />
      </div>

      <div
        style={{
          paddingLeft: "15vw",
          paddingRight: "15vw",
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {/* Render ZIP files as cards */}
        {zipFiles.map((zip) => (
          <Link to={`/repository/${zip.id}`} key={zip.id}>
            <Card style={{ width: "100%" }}>
              <CardHeader className="flex-row gap-4 items-center">
                <Folder />
                <div>
                  <CardTitle>{zip.name}</CardTitle> {/* ZIP file name as title */}
                  <CardDescription>Uploaded ZIP File</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>Size: {zip.size} bytes</p>
              </CardContent>
              <CardFooter>Last updated Today at 05:33 PM</CardFooter>
            </Card>
          </Link>
        ))}

        {/* Keep hardcoded cards */}
        <Link to="/">
          <Card style={{ width: "100%" }}>
            <CardHeader className="flex-row gap-4 items-center">
              <Folder />
              <div>
                <CardTitle>Jane Developer</CardTitle>
                <CardDescription>Frontend Engineer</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>Created Today at 05:33 PM</p>
            </CardContent>
            <CardFooter>Last updated Today at 05:33 PM</CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
}

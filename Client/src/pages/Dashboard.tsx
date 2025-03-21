import { useState, useEffect } from "react";
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
import { FolderPlus } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
interface Repository {
  _id: string;
  Repname: string;
  Desc?: string;
  CreatedAT: string;
  LastChanged:string;
}

export default function Dashboard() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
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
          setRepositories(data.repositories);
        }
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepositories();
  }, []);

  return (
    <div>
      <div
        className="row flex items-center justify-between p-4 px-8"
        style={{ paddingLeft: "15vw", paddingRight: "15vw", marginTop: "1rem" }}
      >
        <h1 className="flex items-center text-3xl font-bold text-gray-800 dark:text-white" style={{ marginRight: "1rem" }}>
          Repositories
        </h1>
        <NewFile setZipFiles={setRepositories} />
      </div>
        {repositories.length > 1 ? (
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
        {repositories.map((repo) => (
          <Link to={`/repository/${repo._id}`} state= {repo.Repname} key={repo._id}>
            <Card style={{ width: "100%" }}>
              <CardHeader className="flex-row gap-4 items-center">
                <Folder />
                <div>
                  <CardTitle>{repo.Repname}</CardTitle>
                  <CardDescription>{repo.Desc }</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>Created: {new Date(repo.CreatedAT).toLocaleString()}</p>
              </CardContent>
              <CardFooter>Last updated: {new Date(repo.LastChanged).toLocaleString()}</CardFooter>
            </Card>
          </Link>
        ))}
      </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center"
          style={{
            paddingLeft: "15vw",
            paddingRight: "15vw",
            marginTop: "1rem",
            display: "flex",
            flexDirection:"column",
            gap: "10px",
          }}
        > 
            <Avatar style={{width:"6rem",height:"6rem",textAlign:'center'}}>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback ><FolderPlus style={{width:"100%",height:"50"}}/></AvatarFallback>
        </Avatar>
       <h1 style={{fontSize: "2rem",textAlign:'center',fontWeight: "700"}}>No repositories yet </h1>
       <p className="text-muted-foreground max-w-md mb-6" style={{fontSize: "1rem",textAlign:'center'}}>Create your first repository by uploading a ZIP file containing your code. </p>
       <NewFile setZipFiles={setRepositories} />
        </div>

        )}
     
    </div>
  );
}

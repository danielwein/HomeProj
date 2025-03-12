import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
 
  } from "@/components/ui/card"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Folder } from 'lucide-react';
import {Link} from "react-router-dom"
import { NewFile } from "@/components/NewFile";

export default function Dashboard() {
    return (
      <div>
        <div
          className="row flex items-center justify-between p-4 px-8"
          style={{ paddingLeft: "15vw", paddingRight: "15vw", marginTop: "1rem" }}
        >
          <h1 className="flex items-center text-3xl font-bold text-gray-800 dark:text-white" style={{ marginRight: "1rem" }}>
            Repositories
          </h1>
            <NewFile />
          
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
  
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
 
  } from "@/components/ui/card"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Check } from 'lucide-react';

export default function Recommendations() {


  return (
    <div className="flex w-full items-center justify-center" style={{flexDirection: "column",paddingLeft:'10%',paddingRight:'10%'}}>
        <h1 style={{fontSize: "2rem",textAlign:'center',marginBottom:"5vh",fontWeight: "700",}}>What Our Users Say </h1>
        <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center place-items-center" style={{flexDirection: "row"}}>
            <Card>
            <CardHeader className="flex-row gap-4 items-center">
            <Avatar>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
        <CardTitle>Jane Developer
</CardTitle>
        <CardDescription>Frontend Engineer</CardDescription>
</div>
            </CardHeader>
            <CardContent>
                <p style={{fontStyle:"italic"}}>"ZipHub has simplified our code sharing process. No more Git conflicts or complex branching strategies. Just upload and collaborate!"</p>
            </CardContent>
            <CardFooter style={{color: "rgb(234 179 8)",}}>
            <Check /><Check /><Check /><Check /><Check /><Check />
            </CardFooter>
            </Card>
            <Card>
            <CardHeader className="flex-row gap-4 items-center">
            <Avatar>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <div>
        <CardTitle>Mark Student
</CardTitle>
        <CardDescription>CS Student</CardDescription>
</div>
            </CardHeader>
           
            <CardContent>
                <p style={{fontStyle:"italic"}}>"As a student, ZipHub is perfect for my projects. I can easily share my work with professors and classmates without the learning curve of Git."
                </p>
            </CardContent>
            <CardFooter style={{color: "rgb(234 179 8)",}}>
            <Check /><Check /><Check /><Check /><Check /><Check />
            </CardFooter>
            </Card>   
            <Card>
            <CardHeader className="flex-row gap-4 items-center">
            <Avatar>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback>TL</AvatarFallback>
        </Avatar>
        <div>
        <CardTitle>Team Lead
</CardTitle>
        <CardDescription>Project Manager</CardDescription>
</div>
            </CardHeader>
            <CardContent>
                <p style={{fontStyle:"italic"}}>"Our team's productivity increased after switching to ZipHub. The simple interface means less time training new team members on version control."</p>
            </CardContent>
            <CardFooter style={{color: "rgb(234 179 8)",}}>
               <Check/><Check /><Check /><Check /><Check /><Check />
            </CardFooter>
            </Card>
        </div>
            </div>

    </div>
  );   
}
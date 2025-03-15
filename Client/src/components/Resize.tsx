import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
  import { Link } from "react-router-dom";
  import { buttonVariants } from "@/components/ui/button";
  import {ArrowRight} from "lucide-react"
  import {
    CardHeader,
    CardTitle,
    CardDescription
 
  } from "@/components/ui/card"
  import { Folder } from 'lucide-react';
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { ChevronsLeftRight } from 'lucide-react';
  import { UsersRound } from 'lucide-react';
  import { History } from 'lucide-react';
  import { PenLine } from 'lucide-react';
  import { FileText } from 'lucide-react';
  import { Shield } from 'lucide-react';

export default function Resize() {
      return (
        <div className="flex  w-full items-center justify-center p-6 md:p-10" style={{flexDirection: "column",paddingLeft:'10%',paddingRight:'10%',paddingTop:"4rem"}}>


    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[750px] max-w-md rounded-lg  md:min-w-[1500px]"
      style={{backgroundColor:"hsl(240deg 3.76% 16.08% / 10%)"}}
    >
        
      <ResizablePanel defaultSize={20} style={{marginRight:"22%",marginLeft:"22%",flexGrow:""}}>
      <h1 style={{fontSize: " 1.875rem",textAlign:'center',fontWeight: "700"}}>Features & Benefits </h1>
      <h1 style={{fontSize: "1.25rem",textAlign:'center'}}>ZipHub provides a simple yet powerful way to manage your code repositories without the complexity of Git.</h1>
      </ResizablePanel>
      <ResizablePanel defaultSize={12} >
        <div className="flex h-full items-center justify-center p-6">
        <div
          style={{
            paddingLeft: "2vw",
            paddingRight: "2vw",
            marginTop: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
          }}
        >
                    <CardHeader className="flex-row gap-4 items-center">
            <Avatar style={{width:"3rem",height:"3rem",alignSelf:"baseline",}}>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback><ChevronsLeftRight/></AvatarFallback>
        </Avatar>
        <div>
        <CardTitle>Simple Code Management
</CardTitle>
        <CardDescription>Upload, organize, and manage your code with a straightforward interface designed for developers of all skill levels.</CardDescription>
</div>
            </CardHeader>
            <CardHeader className="flex-row gap-4 items-center">
            <Avatar style={{width:"3rem",height:"3rem",alignSelf:"baseline",}}>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback><UsersRound/></AvatarFallback>
        </Avatar>
        <div>
        <CardTitle>Simple Code Management
</CardTitle>
        <CardDescription>Upload, organize, and manage your code with a straightforward interface designed for developers of all skill levels.</CardDescription>
</div>
            </CardHeader>
            <CardHeader className="flex-row gap-4 items-center">
            <Avatar style={{width:"3rem",height:"3rem",alignSelf:"baseline",}}>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback><History/></AvatarFallback>
        </Avatar>
        <div>
        <CardTitle>Simple Code Management
</CardTitle>
        <CardDescription>Upload, organize, and manage your code with a straightforward interface designed for developers of all skill levels.</CardDescription>
</div>
            </CardHeader>
            <CardHeader className="flex-row gap-4 items-center">
            <Avatar style={{width:"3rem",height:"3rem",alignSelf:"baseline",}}>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback><Shield/></AvatarFallback>
        </Avatar>
        <div>
        <CardTitle>Simple Code Management
</CardTitle>
        <CardDescription>Upload, organize, and manage your code with a straightforward interface designed for developers of all skill levels.</CardDescription>
</div>
            </CardHeader>
            <CardHeader className="flex-row gap-4 items-center">
            <Avatar style={{width:"3rem",height:"3rem",alignSelf:"baseline",}}>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback><FileText/></AvatarFallback>
        </Avatar>
        <div>
        <CardTitle>Simple Code Management
</CardTitle>
        <CardDescription>Upload, organize, and manage your code with a straightforward interface designed for developers of all skill levels.</CardDescription>
</div>
            </CardHeader>
            <CardHeader className="flex-row gap-4 items-center">
            <Avatar style={{width:"3rem",height:"3rem",alignSelf:"baseline",}}>
        <AvatarImage src="" alt="@shadcn" />
        <AvatarFallback><PenLine/></AvatarFallback>
        </Avatar>
        <div>
        <CardTitle>Simple Code Management
</CardTitle>
        <CardDescription>Upload, organize, and manage your code with a straightforward interface designed for developers of all skill levels.</CardDescription>
</div>
            </CardHeader>
              
          </div>
        </div>
      </ResizablePanel>
      <ResizablePanel defaultSize={5} style={{}}>
        <div className="flex h-full items-center justify-center p-6">
        <Link
          to="/Sign"
          className={buttonVariants({
            variant: "default", // If dark mode, outline, otherwise solid
          })}
         >
          Start using ZipHub  <ArrowRight  />
        </Link>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  
        </div>
        
      )
}
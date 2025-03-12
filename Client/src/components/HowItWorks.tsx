import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
 
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"



export default function Howitworks() {


  return (
    <div className="flex w-full items-center justify-center" style={{flexDirection: "column",paddingLeft:'10%',paddingRight:'10%'}}>
        <h1 style={{fontSize: "2rem",textAlign:'center',marginBottom:"5vh",fontWeight: "700"}}>How it Works </h1>
        <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center place-items-center" style={{flexDirection: "row"}}>
            <Card>
            <CardHeader>
            <Badge variant="secondary" style={{fontSize:"20px", borderRadius: " var(--radius-lg)",borderColor: "black",background: "white",color:"black",padding:"15px 20px 15px 20px"}}>1</Badge> 

            </CardHeader>
            <CardContent>
                <p>Upload ZIP Files</p>
            </CardContent>
            <CardFooter>
                <p>Simply upload your code as a ZIP file. No need to learn Git commands.</p>
            </CardFooter>
            </Card>
            <Card>
            <CardHeader>
            <Badge variant="secondary" style={{fontSize:"20px", borderRadius: " var(--radius-lg)",borderColor: "black",background: "white",color:"black",padding:"15px 20px 15px 20px"}}>2</Badge> 

            </CardHeader>
            <CardContent>
                <p>Browse Your Code
                </p>
            </CardContent>
            <CardFooter>
                <p>Navigate through your files with our intuitive file browser.</p>
            </CardFooter>
            </Card>
            <Card>
            <CardHeader>
            <Badge variant="secondary" style={{fontSize:"20px", borderRadius: " var(--radius-lg)",borderColor: "black",background: "white",color:"black",padding:"15px 20px 15px 20px"}}>3</Badge> 
            </CardHeader>
            <CardContent>
                <p>Edit and Save</p>
            </CardContent>
            <CardFooter>
                <p>Make changes to your files directly in the browser and save them.</p>
            </CardFooter>
            </Card>
        </div>
            </div>

    </div>
  );   
}
import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { Form, useParams } from 'react-router-dom'; // Import useParams for getting URL parameters
import { Button } from "@/components/ui/button";
import { Folder, ChevronDown, ChevronRight, FileText,Save } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbEllipsis, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSX } from 'react';
import { useLocation } from 'react-router-dom';

export default function Repository() {
  const [fileHierarchy, setFileHierarchy] = useState<any>(null);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  const [fileContents, setFileContents] = useState<string | null>(null);
  const [changedcontent,setChangecontent] = useState<string >("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [zipInstance, setZipInstance] = useState<JSZip | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState("preview"); // Keep track of the active tab (Preview / Raw)
  const { id } = useParams();  // Get repID from the URL
  const location = useLocation();
  const name = location.state || {}; // You can replace this with the repository name

  // Use useEffect to load the auth token (from localStorage, context, etc.)

  // Fetch the zip file when repID changes
  useEffect(() => {
    if (id) {
      console.log("repID",id)
      fetchZipFile(id);
    }
  }, [id]);

  const fetchZipFile = async (RepID: string) => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert("No JWT token found");
      return;
    }
    console.log("RepID",RepID)
    try {
      const response = await fetch(`http://localhost:3000/auth/getzip`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',  // Set content type to JSON
        },
        body: JSON.stringify({  RepID }), // Send RepID in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the ZIP file');
      }

      const zipBlob = await response.blob();
      const zip = await JSZip.loadAsync(zipBlob);
      setZipInstance(zip); // Set the zip instance in state
      const structure = parseZipHierarchy(zip);
      setFileHierarchy(structure);

      // Automatically select Readme.md if it exists in the root
      if (structure["Readme.md"]) {
        setSelectedFile("Readme.md");
        const readme = zip.file(structure["Readme.md"]);
        if (readme) {
          const content = await readme.async("text");
          setFileContents(content);
        }
      }
    } catch (error) {
      console.error("Error fetching ZIP file:", error);
    }
  };

  const parseZipHierarchy = (zip: JSZip): any => {
    const structure: any = {};

    zip.forEach((relativePath) => {
      const parts = relativePath.split('/').filter(Boolean);
      if (parts.length === 0) return;

      let current = structure;
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = relativePath;
        } else {
          if (typeof current[part] !== 'object') {
            current[part] = {};
          }
          current = current[part];
        }
      });
    });
    return structure;
  };

  const handleFileClick = async (filePath: string) => {
    if (!zipInstance) return;
    console.log("filepath",filePath)
    const file = zipInstance.file(filePath);
    if (file) {
      const content = await file.async("text");
      setSelectedFile(filePath);
      setFileContents(content);
      setIsActive(false)
    }
  };
const SaveEdit = () => {
  console.log("hi")
  console.log("isActive",isActive)
  if(fileContents) 
      setChangecontent(fileContents)
  else
      setChangecontent("")
  setIsActive(prev => !prev);
}
const  UpdateContent = async() => {
  const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    var oldp = ""
  const payload = new FormData();
  if(selectedFile && id ) {
    payload.append("selectedFile",selectedFile)
     oldp = selectedFile
      payload.append("RepID", id);
      payload.append("ChangeContent",changedcontent)
  }
  console.log(payload)
  try {
    const response = await fetch("http://localhost:3000/auth/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });

    console.log(isActive)
    if (!response.ok) {
      throw new Error("Failed to update the file.");
    }
    setFileContents(changedcontent)
    const responsetwo = await fetch(`http://localhost:3000/auth/getzip`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',  // Set content type to JSON
      },
      body: JSON.stringify({  "RepID": id }), // Send RepID in the request body
    });
    if (!responsetwo.ok) {
      throw new Error('Failed to fetch the ZIP file');
    }

    const zipBlob = await responsetwo.blob();
    const zip = await JSZip.loadAsync(zipBlob);
    setZipInstance(zip); // Set the zip instance in state
    const structure = parseZipHierarchy(zip);
    setFileHierarchy(structure);

    // Automatically select Readme.md if it exists in the root
    if (structure["Readme.md"]) {
      setSelectedFile("Readme.md");
      const readme = zip.file(structure["Readme.md"]);
      if (readme) {
        const content = await readme.async("text");
        setFileContents(content);
      }
    }
  
    setIsActive(false)


}
catch(error){}

}



  const renderHierarchy = (structure: any, level: number = 0, path: string = ''): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    Object.keys(structure).forEach((key) => {
      const newPath = path ? `${path}/${key}` : key;
      const isFolder = typeof structure[key] === "object";
      const isOpen = openFolders.has(newPath);

      if (!isFolder && structure[key]) {
        elements.push(
          <div key={newPath} style={{ marginLeft: `${level * 20}px`, paddingLeft: '8px' }}>
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={() => handleFileClick(structure[key])}
            >
              <FileText className="w-full text-left" /> {key}
            </Button>
          </div>
        );
      } else if (isFolder && Object.keys(structure[key]).length > 0) {
        elements.push(
          <div key={newPath} style={{ marginLeft: `${level * 20}px` }}>
            <Button
              variant="ghost"
              onClick={() => toggleFolder(newPath)}
              className="flex items-center gap-2 w-full text-left"
            >
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <Folder className="w-4 h-4" />
              {key}
            </Button>
            {isOpen && renderHierarchy(structure[key], level + 1, newPath)}
          </div>
        );
      }
    });

    return elements;
  };

  const toggleFolder = (folderPath: string) => {
    setOpenFolders((prev) => {
      const newFolders = new Set(prev);
      if (newFolders.has(folderPath)) {
        newFolders.delete(folderPath);
      } else {
        newFolders.add(folderPath);
      }
      return newFolders;
    });
  };

  const renderBreadcrumb = () => {
    if (!selectedFile) return (
      <BreadcrumbItem>
        </BreadcrumbItem>
    );

    const parts = selectedFile.split('/');
    if (parts.length <= 4) {
      return parts.map((segment, index) => (
        <React.Fragment key={index}>
          <BreadcrumbItem>
            <BreadcrumbLink>{segment}</BreadcrumbLink>
          </BreadcrumbItem>
          {index < parts.length - 1 && <BreadcrumbSeparator />}
        </React.Fragment>
      ));
    }

    return (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink >{parts[0]}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{parts[parts.length - 2]}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{parts[parts.length - 1]}</BreadcrumbLink>
        </BreadcrumbItem>
      </>
    );
  };

  return (
    <div className="flex items-center justify-between p-4 px-8" style={{ paddingLeft: "15vw", paddingRight: "15vw", flexDirection: "column" }}>
      {/* Breadcrumb Navigation */}

        <div className="w-full max-w-4xl px-4 mb-4 flex flex-row items-center gap-2">
          <Breadcrumb className="flex items-center overflow-hidden">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Folder />
                <BreadcrumbLink>{name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {renderBreadcrumb()}
            </BreadcrumbList>
          </Breadcrumb>
        </div>


      {/* Layout for File Viewer and Hierarchy */}
      <div className="flex row flex gap-10 w-full max-w-8xl" style={{ flexDirection: "row" }}>
        {/* File Hierarchy Card */}
        <Card className="w-1/2 max-w-sm" style={{ width: "25vw" }}>
          <CardHeader>
            <h2 className="text-lg font-semibold">Files</h2>
          </CardHeader>
          <CardContent>
            {fileHierarchy ? (
              <div className="max-h-96 overflow-y-auto">
                {renderHierarchy(fileHierarchy)}
              </div>
            ) : (
              <div></div>
            )}
          </CardContent>
        </Card>
 
        {/* File Content Card */}
        <Card className="" style={{ width: "90vw", height: "80vh", overflowY: "auto" }}>
          {selectedFile ? (
                isActive ? (
                <div>
                    <div className="flex justify-between items-center">
                                      <div className="text-lg font-semibold">
                                            { selectedFile.split('/').pop() }
                                            </div>
                                      <Button variant="default" className="text-sm" onClick={UpdateContent}>
                                              <Save /> Save 
                                              </Button>
                                    </div>
                                    <Card style={{marginTop:"2rem"}}>
                            <CardContent className="h-full p-0">
                              <Textarea
                                className="p-4 h-full w-full resize-none border-none focus:ring-0 "
                                value={changedcontent}
                                onChange={(e) => setChangecontent(e.target.value)}
                                
                              />
                            </CardContent>
                          </Card>
               

                </div>
                
                ) : (<div>
            <div className="flex justify-between items-center">
                        <div className="text-lg font-semibold">
                         { selectedFile.split('/').pop() }
                        </div>

                          <Button variant="outline" className="text-sm" onClick={SaveEdit}>
                            Edit
                          </Button>

                      </div>


                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                          <TabsList>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="raw">Raw</TabsTrigger>
                          </TabsList>
                          <Card> 
                                <TabsContent value="preview" className="p-4 h-full">
                                                  <div>{fileContents}</div>
                                              </TabsContent>
                                <TabsContent value="raw" className="p-4 h-full" >
                                                  <pre className="h-full w-full overflow-auto p-2">{fileContents}</pre>
                                              </TabsContent>      
                                </Card>
                        </Tabs>
              </div>
)
              
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground" >
              <FileText className='class="lucide lucide-file-text h-16 w-16 mb-4"' style={{marginBottom:"1rem"}}/>
              <p>Select a file to view its contents</p>
            </div>
          )}
         
        </Card>
      </div>
    </div>
  );
}

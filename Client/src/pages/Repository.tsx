import React, { useState } from 'react';
import JSZip from 'jszip';
import { Button } from "@/components/ui/button";
import { Folder, ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbEllipsis, BreadcrumbList } from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming ShadCN has these components
import { JSX } from 'react';

export default function Repository() {
  const [fileHierarchy, setFileHierarchy] = useState<any>(null);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  const [fileContents, setFileContents] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [zipInstance, setZipInstance] = useState<JSZip | null>(null);
  const [activeTab, setActiveTab] = useState("preview"); // Keep track of the active tab (Preview / Raw)
const name = "hi";
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const zip = await JSZip.loadAsync(e.target?.result as ArrayBuffer);
        setZipInstance(zip); // Set the zip instance in state
        const structure = parseZipHierarchy(zip);
        setFileHierarchy(structure);

        // Automatically select Readme.md if it exists in the root
        if (structure["Readme.md"]) {
          console.log("Hi, selecting Readme.md");
          setSelectedFile("Readme.md"); // Set the selected file path

          // Use `zip` directly here instead of `zipInstance`
          const readme = zip.file(structure["Readme.md"]);
          if (readme) {
            const content = await readme.async("text");
            setFileContents(content);
            console.log("fileContents", content); // Logs content of Readme.md
          }
        }
      };
      reader.readAsArrayBuffer(file);
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
          // Last part is a file, so assign the actual file content
          current[part] = relativePath;
        } else {
          // Check if the current part is already an object (folder)
          if (typeof current[part] !== 'object') {
            // If not, make it an object to represent a folder
            current[part] = {};
          }
          current = current[part]; // Move deeper into the folder structure
        }
      });
    });

    return structure;
  };

  const handleFileClick = async (filePath: string) => {
    if (!zipInstance) return;

    const file = zipInstance.file(filePath);
    if (file) {
      const content = await file.async("text");
      setSelectedFile(filePath);
      setFileContents(content);
    }
  };

  const renderHierarchy = (structure: any, level: number = 0, path: string = ''): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    Object.keys(structure).forEach((key) => {
      const newPath = path ? `${path}/${key}` : key;
      const isFolder = typeof structure[key] === "object";
      const isOpen = openFolders.has(newPath);

      if (!isFolder && structure[key] && key) {
        elements.push(
          <div key={newPath} style={{ marginLeft: `${level * 20}px`, paddingLeft: '8px' }}>
            
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={() => handleFileClick(structure[key])}
            >
            <FileText className="w-full text-left"/>  {key}
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
    if (!selectedFile) return null;

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
              <BreadcrumbLink asChild>{parts[0]}</BreadcrumbLink>
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
    <div className="flex items-center justify-between p-4 px-8 " style={{ paddingLeft: "15vw", paddingRight: "15vw", flexDirection: "column" }}>
      {/* File Input */}
      <input type="file" accept=".zip" onChange={handleFileChange} className="mb-4" />

      {/* Breadcrumb Navigation */}
      {selectedFile && (
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
      )}

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
              <p>No ZIP file selected</p>
            )}
          </CardContent>
        </Card>

        {/* File Content Card */}
        <Card className="" style={{ width: "90vw", height: "80vh",overflowY:"auto"}}>
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">
              {selectedFile ? selectedFile.split('/').pop() : ""}
            </div>
            {selectedFile ? (<Button variant="outline" className="text-sm">
              Edit
            </Button>) :(<div></div>) }
            
          </div>

          {selectedFile ? (
            <div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="raw">Raw</TabsTrigger>
              </TabsList>
              <TabsContent value="preview">
              </TabsContent>
              <TabsContent value="raw">
              </TabsContent>
              

            </Tabs>
            <Card style={{minHeight:"60vh"}}>

              <CardContent >
                 {fileContents}
                </CardContent>
            </Card>
            

             
            </div>
          
          ) : (
            <div style={{ marginTop: "35%" }}>
              <CardHeader>
                <FileText className="w-12 h-12 text-gray-500 mx-auto" />
              </CardHeader>
              <CardContent className="text-center text-gray-500">
                <p>Select a file to view its contents</p>
              </CardContent>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

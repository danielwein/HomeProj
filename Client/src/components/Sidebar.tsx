import JSZip from "jszip";

interface SidebarProps {
  folders: any[];
  onFileClick: (file: JSZip.JSZipObject) => void; // Update the type here
}

export const Sidebar = ({ folders, onFileClick }: SidebarProps) => {
  const renderFolders = (folders: any[]) => {
    return folders.map((folder) => (
      <div key={folder.name}>
        <div>{folder.name}</div>
        {folder.children && renderFolders(folder.children)} {/* Recursively render subfolders */}
        {folder.file && (
          <div
            style={{ cursor: "pointer", paddingLeft: "10px" }}
            onClick={() => onFileClick(folder.file)} // Pass JSZipObject to onFileClick
          >
            {folder.name}
          </div>
        )}
      </div>
    ));
  };

  return <div>{renderFolders(folders)}</div>;
};

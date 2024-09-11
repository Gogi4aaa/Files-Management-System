import { Menu, Item } from "react-contexify";
import { FolderProps } from '../../Interfaces/Props/Folder';
const Folder = ({
  folder,
  handleContextMenu,
  handleItemClick,
  expandedFolders,
  toggleFolder
}: FolderProps) => {
  const isExpanded = expandedFolders.includes(folder.id);

  const handleExpandToggle = () => {
    toggleFolder(folder.id);
  };

  return (
    <li className="ms-5" key={folder.id}>
      <a onContextMenu={(e) => handleContextMenu(e, folder.id)}
         onClick={() => { handleExpandToggle(); }}>
        {folder.name}
      </a>
      <Menu id={folder.id}>
        <Item id="create" onClick={() => handleItemClick("create", folder.id)} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">New Folder</Item>
        <Item id="upload-file" onClick={() => handleItemClick("upload-file", folder.id)}>Upload File</Item>
        <Item id="delete" onClick={() => handleItemClick("delete", folder.id)} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Delete</Item>
      </Menu>

      {isExpanded && folder.folders && folder.folders.length > 0 && (
        <ul>
          {folder.folders.map((subfolder:any) => (
            <Folder
              key={subfolder.id}
              folder={subfolder}
              handleContextMenu={handleContextMenu}
              handleItemClick={handleItemClick}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Folder;

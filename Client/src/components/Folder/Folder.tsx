import { Menu, Item } from "react-contexify";
import { FolderProps } from '../../Interfaces/Props/Folder';
import "./Folder.css"
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
    <li className="folder-item" key={folder.id}>
      <div className="folder-content">
        <span className={`folder-icon ${isExpanded ? 'expanded' : ''}`} onClick={handleExpandToggle}>
          {isExpanded ? <i className="fa-regular fa-folder-open"></i> : <i className="fa-solid fa-folder-closed"></i> }
        </span>
        <a 
          className="folder-name" 
          onContextMenu={(e) => handleContextMenu(e, folder.id)}
          onClick={() => { handleExpandToggle() }}
        >
          {folder.name}
        </a>
        <div className="folder-menu">
            <Menu id={folder.id}>
                <Item id="create" onClick={() => handleItemClick("create", folder.id)} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">New Folder</Item>
                <Item id="upload-file" onClick={() => handleItemClick("upload-file", folder.id)}>Upload File</Item>
                <Item id="delete" onClick={() => handleItemClick("delete", folder.id)} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Delete</Item>
            </Menu>
        </div>
      </div>
      {isExpanded && folder.folders && folder.folders.length > 0 && (
        <ul className="subfolder-list">
          {folder.folders.map(subfolder => (
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

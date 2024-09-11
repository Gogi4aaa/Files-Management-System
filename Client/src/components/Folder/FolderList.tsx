import React, { useState } from 'react';
import Folder from './Folder'; // Adjust the import based on your file structure
import { FoldersListProps } from '../../Interfaces/Props/Folder';


const FoldersList =({
  folders,
  handleContextMenu,
  handleItemClick
}: FoldersListProps) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId) 
        : [...prev, folderId]
    );
  };

  return (
    <ul>
      {folders?.map(folder => (
        <Folder
          key={folder.id}
          folder={folder}
          handleContextMenu={handleContextMenu}
          handleItemClick={handleItemClick}
          expandedFolders={expandedFolders}
          toggleFolder={toggleFolder}
        />
      ))}
    </ul>
  );
};

export default FoldersList;

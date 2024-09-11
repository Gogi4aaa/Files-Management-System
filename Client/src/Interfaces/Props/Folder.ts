export interface FolderDto {
    id: string;
    name: string;
    physicalName: string;
    folders?: FolderDto[]; // Optional, as a folder might not have subfolders
  }
export interface FolderProps {
    folder: FolderDto;
  handleContextMenu: (e: React.MouseEvent<HTMLAnchorElement>, folderId: string) => void;
  handleItemClick: (action: string, folderId: string) => void;
  expandedFolders: string[];
  toggleFolder: (folderId: string) => void;
  }
export interface FoldersListProps {
    folders: FolderDto[];
  handleContextMenu: (e: React.MouseEvent<HTMLAnchorElement>, folderId: string) => void;
  handleItemClick: (action: string, folderId: string) => void;
  }
  
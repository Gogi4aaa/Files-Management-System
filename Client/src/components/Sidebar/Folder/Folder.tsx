import { useState } from "react";
export default function Folder({ folder }: any) {
    const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
    return (
        <>
        <div style={{ marginLeft: '20px' }}>
        <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
            {folder.name}
        </div>
        {isOpen && (
            <div>
            {folder.subfolders.map((subfolder: any, index: any) => (
                <Folder key={index} folder={subfolder} />
            ))}
            </div>
        )}
        </div>
        </>
    )
}
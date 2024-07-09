import axios from "axios";
import Layout from "../../Layout/Layout";
import "./FIles.css";
import CreateFile from "../../Models/Api/Files/CreateFile";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../Constants/GeneralApplicationConstants";
import { Folders } from "../../Interfaces/Types/Folders";
import Folder from "../../components/Sidebar/Folder/Folder";
export default function Files() {
    const [isOpen, setIsOpen] = useState(false);
    const [folders, setFolders] = useState<Folders[]>([]);
    const [currFolderId, setCurrFolderId] = useState<any>();
    const ref = useRef<HTMLInputElement>(null);
    var counter = 0;
    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        await axios.get(`${API_URL}/Folder/GetAllFolders`)
            .then(response => {
                console.log(response);
                setFolders(response.data.data.folders);
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleCreateFolder = async () => {
        var file = new CreateFile(ref.current?.value, ref.current?.value);
        await axios.post(`${API_URL}/Folder/CreateFolder`, file)
            .then(response => {
                console.log(response);
                loadFiles();
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleFolderClick = (id: any) => {
        setCurrFolderId(id);
    }
    const handlePlusClick = () => {
        setIsOpen(!isOpen);
    }
    return (
        <Layout>
            <div>
                <button className="btn btn-primary" onClick={handlePlusClick}>+</button>
                <div className={isOpen ? "d-block" : "d-none"}>
                    <input type="text" ref={ref} />
                    <button className="btn btn-success" onClick={handleCreateFolder}>Create</button>
                </div>

                <div>
                    <ul>
                        {folders.map(f => (
                            <>
                                <li className="cursor-pointer" key={counter++} onClick={() => handleFolderClick(f.id)}> 
                                    <p>{f.name}</p>
                                    <ul className={`${currFolderId == f.id ? "d-block" : "d-none"} `}>
                                        {/* subfolders */}
                                        <li>Action</li>
                                        <li>Test2</li>
                                        <li>Test3</li>
                                     </ul>
                                </li>
                             </>
                        )
                        )}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}
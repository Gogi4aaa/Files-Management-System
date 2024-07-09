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
    const handlePlusClick = () => {
        setIsOpen(!isOpen);
    }
    return (
        <Layout>
            <div>
                {/* <button className="btn btn-primary" onClick={handlePlusClick}>+</button>
                <div className={isOpen ? "d-block" : "d-none"}>
                    <input type="text" ref={ref} />
                    <button className="btn btn-success" onClick={handleCreateFolder}>Create</button>
                </div>
                {folders.map((folder, index) => (
                    <Folder key={index} folder={folder} />
      ))} */}
                <div>
                    <ul>
                        {folders?.map(f => (
                             <li key={counter++} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <p>{f.name}</p>
                                <ul className="transform-0 dropdown-menu border-0 mb-3 position-relative">
                                    <li><a className="dropdown-item" href="#">Action</a>
                                        
                                    </li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        )
                        )}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}
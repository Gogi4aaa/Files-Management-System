import axios from "axios";
import Layout from "../../Layout/Layout";
import "./FIles.css";
import CreateFile from "../../Models/Api/Files/CreateFile";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../Constants/GeneralApplicationConstants";
import { Folders } from "../../Interfaces/Types/Folders";

import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';
import Modal from "../../components/Modal/Modal";

export default function Files() {
    const [isOpen, setIsOpen] = useState(false);
    const [folders, setFolders] = useState<Folders[]>([]);
    const [currFolderId, setCurrFolderId] = useState<any>();
    const [subfolders, setSubfolders] = useState<Folders[]>([]);
    const ref = useRef<HTMLInputElement>(null);
    const { show } = useContextMenu();

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
    const createFolder = async () => {
        var file = new CreateFile(ref.current?.value, ref.current?.value);
        await axios.post(`${API_URL}/Folder/CreateFolder`, file)
            .then(response => {
                
                loadFiles();
            })
            .catch(err => {
                console.log(err);
            })
    }
    const loadSubFolders = async (parentId: any) => {
        await axios.get(`${API_URL}/Folder/GetSubFolders/?id=${parentId}`)
        .then(response => {
            console.log(response.data);
            setSubfolders(response.data)//check if I need more things here
        })
    }
    const handleFolderClick = (id: any) => {
        setCurrFolderId(id);
        loadSubFolders(id);
    }
    const handlePlusClick = () => {
        setIsOpen(!isOpen);
    }

    function handleContextMenu(event: any, id: any){
        show({
            id: id,
            event,
            props: {
              key: id,
          }
        })
    }
    const handleItemClick = ({ id, event, props }: any) => {
        switch (id) {
          case "create":
            console.log(event, props)
            break;
          case "upload-file":
            console.log(event, props);
            break;
          //etc...
        }
      }
    return (
        <Layout>
            <div>
                <button className="btn btn-primary" onClick={handlePlusClick}>+</button>
                <div className={isOpen ? "d-block" : "d-none"}>
                    <input type="text" ref={ref} />
                    <button className="btn btn-success" onClick={createFolder}>Create</button>
                </div>
                <div>
                    <ul>
                        {folders.map(f => (
                            <>
                                <li className="cursor-pointer" key={f.id} onContextMenu={(e) => handleContextMenu(e, f.id)} onClick={() => handleFolderClick(f.id)}> 
                                    <p>{f.name}</p>
                                    <Menu id={f.id}>
                                        <Item id="create" onClick={handleItemClick} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">New Folder</Item>
                                        <Item id="upload-file" onClick={handleItemClick} >Upload File</Item>
                                        <Item id="delete" onClick={handleItemClick} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Delete</Item>
                                        {/* <Item disabled>Disabled</Item>
                                        <Separator />
                                        <Submenu label="Foobar">
                                            <Item id="reload" onClick={handleItemClick}>Reload</Item>
                                            <Item id="something" onClick={handleItemClick}>Do something else</Item>
                                        </Submenu> */}
                                    </Menu>
                                    <Modal />
                                    <ul className={`${currFolderId == f.id ? "d-block" : "d-none"} `}>
                                        {/* {subfolders.map(sub => (
                                            <li key={sub.id}>{sub.name}</li>
                                        ))} */}
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
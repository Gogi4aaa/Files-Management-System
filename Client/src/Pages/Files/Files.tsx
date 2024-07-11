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
import { ModalProps } from "../../Interfaces/Types/Modal";

export default function Files() {
    const [isOpen, setIsOpen] = useState(false);
    const [folders, setFolders] = useState<Folders[]>([]);
    const [currFolderId, setCurrFolderId] = useState<any>();
    const [subfolders, setSubfolders] = useState<Folders[]>([]);
    const [menuId, setMenuId] = useState();
    
    const [menuPropsObj, setMenuPropsObj] = useState<ModalProps>({id: "", parentId: "", text: "", btnText: "", title: "", input: false, handleModalClick: () => {}})

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
    const createFolder = async (textValue: any = null, parentId: any = null) => {
        var file;
        if(textValue != null){
            file = new CreateFile(textValue, parentId);
            console.log(file);
            
        }
        else{
            file = new CreateFile(ref.current?.value, ref.current?.value);
        }
        
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
            setSubfolders(response.data.data?.subFolders)//check if I need more things here
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
    const handleItemClick = (id :any, parentId: any) => {
        switch (id) {
            case "create":
                console.log(parentId)
                setMenuId(id);
                setUpModalProps(id, parentId);
                break;
            case "upload-file":
                setMenuId(id);
                break;
            case "delete":
                setMenuId(id);
                setUpModalProps(id, parentId);
                break;
            //etc...
        }
      }

      const setUpModalProps = (menuId: any, parentId: any) => {
        var text = "";
        var btnText = "";
        var title = "";
        var input = false;
        if(menuId == "create"){
            text = "Create New Folder";
            btnText = "New Folder";
            title = "New Folder";
            input = true;
        }
        else if(menuId == "delete"){
            text = "Delete File";
            btnText = "Delete";
            title = "Delete File";
            input = false;
        }
        setMenuPropsObj(prev => {
            return {...prev, id: menuId, parentId, text, btnText, title, input}
        })
      }
      const handleModalClick = (id: any, textValue: string, parentId: any) => {
        if(id == "create"){
            createFolder(textValue, parentId)
        }
        else if(id == "delete"){
            // deleteFolder();
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
                                        <Item id="create" onClick={() => handleItemClick("create", f.id)} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">New Folder</Item>
                                        <Item id="upload-file" onClick={() => handleItemClick("upload-file", f.id)} >Upload File</Item>
                                        <Item id="delete" onClick={() => handleItemClick("delete", f.id)} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Delete</Item>
                                        {/* <Item disabled>Disabled</Item>
                                        <Separator />
                                        <Submenu label="Foobar">
                                            <Item id="reload" onClick={handleItemClick}>Reload</Item>
                                            <Item id="something" onClick={handleItemClick}>Do something else</Item>
                                        </Submenu> */}
                                    </Menu>
                                    
                                    <ul className={`${currFolderId == f.id ? "d-block" : "d-none"} `}>
                                        {subfolders?.length > 0 && subfolders?.map(sub => <li key={sub.id}>{sub.name}</li>)}
                                     </ul>
                                </li>
                                
                             </>
                        )
                        )}
                    </ul>
                    <Modal id={menuPropsObj.id} parentId={menuPropsObj.parentId} text={menuPropsObj.text} btnText={menuPropsObj.btnText} title={menuPropsObj.title} input={menuPropsObj.input} handleModalClick={handleModalClick}/>
                </div>
            </div>
        </Layout>
    )
}
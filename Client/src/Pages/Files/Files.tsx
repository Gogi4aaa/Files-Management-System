import axios from "axios";
import "./FIles.css";
import 'react-contexify/ReactContexify.css';

import { API_URL } from "../../Constants/GeneralApplicationConstants";

import { useEffect, useRef, useState } from "react";
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';

import CreateFile from "../../Models/Api/Files/CreateFile";
import { Folder } from "../../Interfaces/Types/Folders";

import Layout from "../../Layout/Layout";
import Modal from "../../components/Modal/Modal";
import { ModalProps } from "../../Interfaces/Types/Modal";

export default function Files() {
    const [isOpen, setIsOpen] = useState(false);
    const [folders, setFolders] = useState<Folder[]>([{name: "", folders: [], id: "", parentId: "", IsOpen: false }]);
    const [currFolderId, setCurrFolderIds] = useState<string[]>([]);
    
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
                console.log(response.data.data.folders);
                
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
        //   setFolders(f)
            console.log(response.data.data?.subFolders);
            
            var folder: Folder = response.data.data?.subFolders
            // var state = [...folders];
            // state[0].subfolders.push(folder)
            // console.log("State: ", state)
            // setFolders([...state])
            // console.log("Folders:", folders);
            var folderNew = folders.map(x => {
                if(x.id === parentId){
                    console.log(x.id)
                    return {
                        ...x,
                        folders: [...response.data.data?.subFolders]
                    }
                }
                return x;
            })
            
            setFolders(folderNew);
            console.log(folderNew);//console.log(folders); 
        })
    }
    const handleFolderClick = (id: any) => {
        console.log(id);
        
        if(!currFolderId.includes(id) && folders?.map(x => x.folders?.map(x => x.name))){
            setCurrFolderIds(prev => ([...prev, id]));
        }
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
                setUpModalProps(id, parentId);
                break;
            case "upload-file":
                break;
            case "delete":
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
                        {folders?.map(f => (
                            // BOLLEAN FLAG
                            <>     
                                <li className="cursor-pointer" key={f.id}> 
                                    <a onContextMenu={(e) => handleContextMenu(e, f.id)} onClick={() => handleFolderClick(f.id)}>{f.name}</a>
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
                                    <ul className={`${currFolderId.some(x => x == f.id)  ? "d-block" : "d-none"} `}>
                                        {f.folders?.map(sub => {
                                             if(sub.parentId === f.id)
                                                return <li className="ms-5" key={sub.id}>
                                                    <a onContextMenu={(e) => handleContextMenu(e, sub.id)} onClick={() => handleFolderClick(sub.id)}>{sub.name}</a>
                                                    <Menu id={sub.id}>
                                                        <Item id="create" onClick={() => handleItemClick("create", sub.id)} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">New Folder</Item>
                                                        <Item id="upload-file" onClick={() => handleItemClick("upload-file", sub.id)} >Upload File</Item>
                                                        <Item id="delete" onClick={() => handleItemClick("delete", sub.id)} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Delete</Item>
                                                        {/* <Item disabled>Disabled</Item>
                                                        <Separator />
                                                        <Submenu label="Foobar">
                                                            <Item id="reload" onClick={handleItemClick}>Reload</Item>
                                                            <Item id="something" onClick={handleItemClick}>Do something else</Item>
                                                        </Submenu> */}
                                                    </Menu>
                                                    </li>
                                            })}
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
import axios from "axios";
import "./Files.css";
import 'react-contexify/ReactContexify.css';

import { API_URL } from "../../Constants/GeneralApplicationConstants";

import { useEffect, useRef, useState } from "react";

import CreateFile from "../../Models/Api/Files/CreateFile";

import Layout from "../../Layout/Layout";
import Modal from "../../components/Modal/Modal";
import { ModalProps } from "../../Interfaces/Types/Modal";
import FoldersList from "../../components/Folder/FolderList";
import { FolderDto } from "../../Interfaces/Props/Folder";
import { useContextMenu } from "react-contexify";

export default function Files() {
    const [isOpen, setIsOpen] = useState(false);
    const [folders, setFolders] = useState<FolderDto[]>([]);
    
    const [menuPropsObj, setMenuPropsObj] = useState<ModalProps>({id: "", parentId: "", text: "", btnText: "", title: "", input: false, handleModalClick: () => {}})

    const ref = useRef<HTMLInputElement>(null);
    const { show } = useContextMenu();

    useEffect(() => {
        loadFolders();
    }, []);
    const loadFolders = async () => {
        await axios.get(`${API_URL}/Folder/GetAllFolders`)
            .then(response => {
                console.log(response.data.data.folders);
                setFolders(response.data.data.folders);
                
            })
            .catch(err => {
                console.log(err)
            })
    }
    const createFolder = async (textValue: any = null, parentId: any = null) => {
        var file;
        if(parentId != null){
            file = new CreateFile(textValue, parentId);
            console.log(file);
            
        }
        else{
            file = new CreateFile(ref.current?.value, null);
        }
        
        await axios.post(`${API_URL}/Folder/CreateFolder`, file)
            .then(response => {
                loadFolders();
            })
            .catch(err => {
                console.log(err);
            })
            if (ref.current) {
                ref.current.value = "";
            }
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
                <button className="btn btn-primary mb-3" onClick={handlePlusClick}>Create</button>
                <div className={`${isOpen ? "d-flex" : "d-none"} add-container`}>
                    <input className="border-1 border-black form-control input-height me-1" type="text" placeholder="Folder name..." ref={ref} />
                    <button className="btn btn-success btn-add" onClick={createFolder}>+</button>
                </div>
                <FoldersList
                  folders={folders}
                  handleContextMenu={handleContextMenu}
                  handleItemClick={handleItemClick}
                />
                <div>
                    <Modal id={menuPropsObj.id} parentId={menuPropsObj.parentId} text={menuPropsObj.text} btnText={menuPropsObj.btnText} title={menuPropsObj.title} input={menuPropsObj.input} handleModalClick={handleModalClick}/>
                </div>
            </div>
        </Layout>
    )
}
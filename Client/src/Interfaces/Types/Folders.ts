export interface Folder {
    name: string,
    physicalName?: string,
    id: any,
    folders: Folder[]
    parentId: any
    IsOpen: boolean
}
export interface ModalProps{
    id: any
    parentId: any
    text: string
    btnText: string
    title: string
    input: boolean
    handleModalClick(id: any, textValue?: string, parentId?: any): any
}
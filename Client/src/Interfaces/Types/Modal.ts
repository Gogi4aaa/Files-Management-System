export interface ModalProps{
    id: any
    text: string
    btnText: string
    title: string
    input: boolean
    handleModalClick(id: any, textValue?: string): any
}
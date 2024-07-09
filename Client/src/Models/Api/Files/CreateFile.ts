export default class CreateFile {
    name?: string;
    parentFolderName?: string;

    constructor(name?: string, parentFolderName?: string) {
        this.name = name;
        this.parentFolderName = parentFolderName;
  }
} 
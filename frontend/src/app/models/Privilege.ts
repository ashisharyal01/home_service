export class Privilege{
    privilegeId: string;
    name: string;
    isSelected: boolean = false;

    constructor(id:string, name:string, isSelected:boolean){
        this.privilegeId = id;
        this.name = name;
        this.isSelected = isSelected;
    }
}
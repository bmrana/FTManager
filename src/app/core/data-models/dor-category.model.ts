export class DORCategory {
    public id: number;
    public name: string;
    public value: number;
    public description: string;

    constructor ( id: number, name: string, value: number, description: string) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.description = description;
    }
}

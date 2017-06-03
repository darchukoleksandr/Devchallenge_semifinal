export class Document {
    public sourceId: number;
    public name: string;
    public deleted: Date;
	public versions: Version[];
	
    constructor(
        sourceId: number,
        name: string,
        versions?: Version[],
        deleted?: Date
    ) {
        this.sourceId = sourceId;
        this.name = name;
        this.deleted = deleted;
        this.versions = versions;
    }
}

export class Version {
    public id: number;
    public sourceId: number;
    public text: string;
    public updated: Date;

    constructor(
        id: number,
        sourceId: number,
        text: string,
        updated: Date
    ) {
        this.id = id;
        this.sourceId = sourceId;
        this.text = text;
        this.updated = updated;
    }
}
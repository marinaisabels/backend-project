export class Album {
    constructor(
        private id: string,
        private name: string,
        private bandId: string
    ) { }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getBandId(): string {
        return this.bandId;
    }


}
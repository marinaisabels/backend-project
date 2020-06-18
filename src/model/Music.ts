export class Music {
    constructor(
        private id: string,
        private AlbumId: string,
        private name: string,
    ) { }

    public getId(): string {
        return this.id;
    }

    public getAlbumId(): string {
        return this.AlbumId;
    }

    public getName(): string {
        return this.name;
    }
}
import { BaseDatabase } from "./BaseDatabase";
import { Album } from "../model/Albuns";


export class AlbunsDatabase extends BaseDatabase {
    public static TABLE_NAME: string = "SpotAlbum";

    public static TABLE_GENRE_ALBUM: string = "SpotGenreAlbum";

    private toModel(dbModel?: any): Album | undefined {
        return dbModel && new Album(dbModel.id, dbModel.name, dbModel.band_id)
    }

    public async createAlbum(album: Album): Promise<void> {
        const albumData = this.toModel(album)
        await this.connection()
            .insert({
                id: albumData?.getId(),
                band_id: albumData?.getBandId(),
                name: albumData?.getName()
            })
            .into(AlbunsDatabase.TABLE_NAME)
    }
    public async getAlbumByName(name: string): Promise<Album | undefined> {
        const result = await this.connection()
            .select("*")
            .from(AlbunsDatabase.TABLE_NAME)
            .where({ name })
        return result[0]
    }
    public async genreAlbum(albumId: string, allGenre: string[]): Promise<void> {
        for (const genre of allGenre) {
            await this.connection()
                .insert({
                    album_id: albumId,
                    genre_id: genre
                })
                .into(AlbunsDatabase.TABLE_GENRE_ALBUM)
        }
    }
}
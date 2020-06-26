import { BaseDatabase } from "./BaseDatabase";
import { Album } from "../model/Albuns";
import { User } from "../model/User";
import { Genre } from "../model/Genre";



export class AlbunsDatabase extends BaseDatabase {
    public static TABLE_NAME: string = "SpotAlbum";

    public static TABLE_GENRE_ALBUM: string = "SpotGenreAlbum";

    private toModel(dbModel?: any): Album | undefined {
        return dbModel && new Album(dbModel.id, dbModel.name, dbModel.band_id)
    }

    public async createAlbum(album: Album, user: User): Promise<void> {
        await this.connection()
            .insert({
                id: album.getId(),
                name: album.getName(),
                band_id: user.getId()
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
    public async genreAlbum(albumId: string, genreId: string[]): Promise<void> {
            await this.connection()
                .insert({
                    album_id: albumId,
                    genre_id: genreId
                })
                .into(AlbunsDatabase.TABLE_GENRE_ALBUM)
    }
}
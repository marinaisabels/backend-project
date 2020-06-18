import { BaseDatabase } from "./BaseDatabase";
import { Music } from '../model/Music'

export class MusicDatabase extends BaseDatabase {
    public static TABLE_NAME: string = "SpotMusic";

    private toModel(dbModel?: any): Music | undefined {
        return dbModel && new Music(dbModel.id, dbModel.name, dbModel.album_id)
    }

    public async createMusic(music: Music): Promise<void> {
        const musicData = this.toModel(music)
        await this.connection()
        .insert({
            id: music.getId(),
            album_id: music.getAlbumId(),
            name: music.getName()
        })
        .into(MusicDatabase.TABLE_NAME)
    }
    public async getMusicsByAlbumId(albumId: string): Promise<Music[]>{
        const result = await super.connection().raw(`
            SELECT *
            FROM ${MusicDatabase.TABLE_NAME}
            WHERE album_id = "${albumId}"
        `)
        return result[0].map((res: any) => this.toModel(res))
    }
}
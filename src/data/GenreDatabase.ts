import { BaseDatabase } from "./BaseDatabase";
import { Genre } from "../model/Genre";


export class GenreDatabase extends BaseDatabase {
    public static TABLE_NAME: string = "SpotGenre"

    private toModel(dbModel?: any): Genre | undefined {
        return dbModel && new Genre(dbModel.id, dbModel.name)
    }

    public async createGenre(genre: Genre): Promise<void>{
        const genreData = this.toModel(genre)
        await this.connection()
        .insert({
            id:genreData?.getId(),
            name:genreData?.getName()
        })
        .into(GenreDatabase.TABLE_NAME)
    }

    public async getAllGenres(): Promise<Genre[]> {
        const result = await this.connection().raw(`
        SELECT *
        FROM ${GenreDatabase.TABLE_NAME}
        WHERE id`);
      return result[0]
    }

    public async getGenreById(id: string): Promise<Genre | any> {
        const result = await this.connection()
            .select("*")
            .from(GenreDatabase.TABLE_NAME)
            .where({ id })
        return this.toModel(result[0])
    }
}
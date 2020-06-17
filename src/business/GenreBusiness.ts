import { GenreDatabase } from "../data/GenreDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { UserRole } from "../model/User";
import { Genre } from "../model/Genre";

export class GenreBusiness {
    constructor(
        private genreDatabase: GenreDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
    ) { }

    public async createGenre(name: string, token: string) {
        const authenticator = new Authenticator()
        const userData = authenticator.verify(token)

        const userDatabase = new UserDatabase()
        const user = await userDatabase.getUserById(userData.id)

        if (user?.getRole() !== UserRole.ADMIN) {
            throw new Error("Apenas administradores podem acessar")
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const genreData = new Genre(id, name)

        const genreDatabase = new GenreDatabase()
        await genreDatabase.createGenre(genreData)

        const genre = await genreDatabase.getGenreByName(name)
        if (genre) {
            throw new Error("Esse genêro foi adicionado")
        }
    }
    public async getAllGenres(token:string) {
        const authenticator = new Authenticator()
        const genreData = authenticator.verify(token)

        const userDatabase = new UserDatabase()
        const user = await userDatabase.getUserById(genreData.id)
        
        const genreDatabase = new GenreDatabase()
        const genre = await genreDatabase.getAllGenres()

        return genre
    }
}
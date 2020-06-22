import { AlbunsDatabase } from "../data/AlbunsDataBase";
import { UserDatabase } from "../data/UserDatabase";
import { GenreDatabase } from "../data/GenreDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { UserRole } from "../model/User";
import { Album } from "../model/Albuns";
import { Genre } from "../model/Genre";
import { InvalidInputError } from "../errors/InvalidInputError";
import { GenericError } from "../errors/GenericError";
import { NotFoundError } from "../errors/NotFoundError";


export class AlbumBusiness {
    constructor(
        private albunsDatabase: AlbunsDatabase,
        private userDatabase: UserDatabase,
        private genreDatabase: GenreDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
    ) { }

    public async createAlbum(name: string, allGenre: string[], token: string) {
        const authenticator = new Authenticator();
        const userData = authenticator.verify(token)

        if (
            !name ||
            !allGenre ||
            !token
        ) {
            throw new InvalidInputError("Informações incompletas");

        }

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(userData.id)

        if (user?.getRole() !== UserRole.BAND) {
            throw new GenericError("Apenas administradores podem acessar");
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const bandId = user.getId()

        const albumData = new Album(id, bandId, name)

        const genreDatabase = new GenreDatabase()
        const genre = await genreDatabase.getAllGenres()

        for (const genres of allGenre) {
            const result = await genreDatabase.getGenreByName(name)
            if (result) {
                await genreDatabase.createGenre(new Genre(id, genres))
            } else {
                throw new NotFoundError("Não existe esse genêro")
            }
        }

        const albumDatabase = new AlbunsDatabase();
        await albumDatabase.createAlbum(albumData)
        await albumDatabase.genreAlbum(albumData.getId(), allGenre)

        const album = await albumDatabase.getAlbumByName(name)
        if (album) {
            throw new GenericError("Esse album foi adicionado");
        }

    }
}


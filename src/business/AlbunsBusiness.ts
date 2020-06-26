import { AlbunsDatabase } from "../data/AlbunsDataBase";
import { UserDatabase } from "../data/UserDatabase";
import { GenreDatabase } from "../data/GenreDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { UserRole } from "../model/User";
import { Album } from "../model/Albuns";
import { InvalidInputError } from "../errors/InvalidInputError";
import { GenericError } from "../errors/GenericError";



export class AlbumBusiness {
    constructor(
        private albunsDatabase: AlbunsDatabase,
        private userDatabase: UserDatabase,
        private genreDatabase: GenreDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
    ) { }

    public async createAlbum(name: string, musicGenre: string[], token: string) {
        const authenticator = new Authenticator();
        const userData = authenticator.verify(token)
        if (
            !name ||
            !musicGenre ||
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
        const albumId = idGenerator.generatorId()

        const bandId = user.getId()

        const albumData = new Album(albumId, name, bandId)

        const albumDatabase = new AlbunsDatabase();
        await albumDatabase.createAlbum(albumData, user )


        const genreDatabase = new GenreDatabase()
        for (let genreId of musicGenre) {
            const result = await genreDatabase.getGenreById(genreId)
            if(result){
                await albumDatabase.genreAlbum(albumData.getId(), musicGenre)
            }
        }
    }
}



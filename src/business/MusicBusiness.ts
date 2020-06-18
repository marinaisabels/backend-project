import { MusicDatabase } from "../data/MusicDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { AlbunsDatabase } from "../data/AlbunsDataBase";
import { Music } from "../model/Music";
import { UserRole } from "../model/User";
;

export class MusicBusiness {
    
    constructor(
        private musicDatabase: MusicDatabase,
        private albumDatabase: AlbunsDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    public async createMusic(name:string, albumId:string, token: string) {
        if(
            !name || 
            !albumId ||
            !token
        ){
            throw new Error("Parâmetros inválidos")
        }

        const authenticator = new Authenticator();
        const userData = authenticator.verify(token)

        const userDatabase = new UserDatabase();
        const user = userDatabase.getUserById(userData.id)
        const userRole = UserRole.BAND

        if(!user){
            throw new Error("Este usuário não existe")
        }
    
        if(!userRole){
            throw new Error("Apenas bandas podem acessar")
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generatorId();

        const musicdata = new Music(id, albumId,name)

        const musicDatabase = new MusicDatabase();
        await musicDatabase.createMusic(musicdata)
 
        const music = await musicDatabase.getMusicsByAlbumId(id)
        if (music) {
            throw new Error("Essa musica foi adicionada");

        }
    }
}
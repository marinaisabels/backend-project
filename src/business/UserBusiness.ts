import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { UserDatabase } from '../data/UserDatabase'
import { User, UserRole, stringToUserRole } from '../model/User'
import { Authenticator } from '../services/Authenticator'
import { InvalidInputError } from '../errors/InvalidInputError'
import { GenericError } from '../errors/GenericError'
import { NotFoundError } from '../errors/NotFoundError'

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ) { }
    public async signup(name: string, email: string, nickname: string, password: string) {

        if (
            !name ||
            !email ||
            !nickname ||
            !password
        ) {
            throw new InvalidInputError("Parâmetros Inválidos")
        }

        if (password.length < 6) {
            throw new GenericError("A senha deverá ter no mínimo 6 caracteres")
        }

        if (email.indexOf("@") === -1) {
            throw new InvalidInputError("Email inválido")
        }

        const rolePayListener = UserRole.PAYLISTENER 
        const roleNoListener = UserRole.NOPAYLISTENER

        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const user = new User(id, name, email, nickname, hashPassword, rolePayListener, roleNoListener)

        const userDatabase = new UserDatabase()
        await userDatabase.createListenerUserAndAdmin(user)

        const authenticator = new Authenticator()
        const acessToken = authenticator.generationToken(
            {
                id
            },
            process.env.ACCESS_TOKEN_EXPIRES_IN
        )

        return {
            acessToken
        }
    }

    public async signupAdmin(name: string, nickname: string, email: string, password: string, token: string) {

        if (
            !email ||
            !name ||
            !nickname ||
            !password
        ) {
            throw new InvalidInputError("Parâmetros Inválidos")
        }

        if (password.length < 10) {
            throw new GenericError("A senha deverá ter no mínimo 10 caracteres")
        }

        if (email.indexOf("@") === -1) {
            throw new InvalidInputError("Email inválido")
        }


        const role = UserRole.ADMIN
        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const user = new User(id, name, nickname, email, hashPassword, role)

        const userDatabase = new UserDatabase()
        await userDatabase.createListenerUserAndAdmin(user)

        const authenticator = new Authenticator()

        if (user.getRole() !== UserRole.ADMIN) {
            throw new GenericError("Só administradores podem acessar")
        }
        const acessToken = authenticator.generationToken(
            {
                id,
                role
            },
            process.env.ACCESS_TOKEN_EXPIRES_IN
        )

        return {
            acessToken
        }
    }

    public async login(nickname: string, email: string, password: string) {
        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserByEmailOrNickname(email, nickname)

        if (!user) {
            throw new InvalidInputError("Parâmetros incorretos !")
        }
        if (
            !nickname ||
            !email ||
            !password
        ) {
            throw new InvalidInputError("Parâmetros Inválidos")
        }
        const authenticator = new Authenticator()

        const acessToken = authenticator.generationToken(
            {
                id: user.getId(),
                role: user.getRole()
            },
            process.env.ACCESS_TOKEN_EXPIRES_IN
        )

        const hashManager = new HashManager()
        const comparePasswords = await hashManager.compare(password, user.getPassword())

        if (!comparePasswords) {
            throw new GenericError("Informações inválidas")
        }
        return { acessToken }

    }

    public async bandSignup(name: string, email: string, nickname: string, password: string, description: string) {
        if (
            !email ||
            !name ||
            !nickname ||
            !password
        ) {
            throw new InvalidInputError("Parâmetros Inválidos")
        }
        if (password.length < 6) {
            throw new GenericError("A senha deverá ter no mínimo 6 caracteres")
        }

        if (email.indexOf("@") === -1) {
            throw new InvalidInputError("Email inválido")
        }

        const role = UserRole.BAND
        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const band = new User(id, name, email, nickname, hashPassword, role, description)
        
        const userDatabase = new UserDatabase()
        await userDatabase.createUserBand(band)
    }

    public async getApprovedBands(token: string) {
        const authenticator = new Authenticator()
        const bandData = authenticator.verify(token)

        if (bandData.role !== "ADMIN") {
            throw new GenericError("Acesso negado!")
        }

        const userDatabase = new UserDatabase()
        const band = await userDatabase.getApprovedBands(token)

        return band.map(band => {
            const isApproved = band.getApproved() === true ? true : false
            return {
                name: band.getName(),
                email: band.getEmail(),
                nickname: band.getNickname(),
                isApproved: isApproved
            }
        })
    }
    async approvesBand(id: string, token: string){
        const authenticator = new Authenticator()
        const bandData = authenticator.verify(token)

        const userDatabase = new UserDatabase()
        const user = await userDatabase.getApproves(bandData.id)

        if (!user) {
            throw new NotFoundError("Usuário não encontrado");
        }
        if (user.getRole() !== UserRole.ADMIN) {
            throw new GenericError("Acesso apenas para administradores")
        }

        const band = await userDatabase.getApproves(id)
        if (!band) {
            throw new NotFoundError("Band não encontrada");
        }
        if (band.getApproves() == true) {
            throw new GenericError("Banda Aprovada!")
        }

    }
}
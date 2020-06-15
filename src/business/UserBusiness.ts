import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { UserDatabase } from '../data/UserDatabase'
import { User } from '../model/User'
import { Authenticator } from '../services/Authenticator'

export class UserBusiness {

    public async signup(name: string, nickname: string, email: string, password: string, role: string) {
        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const user = new User(id, name, nickname, email, hashPassword, role)

        const userDatabase = new UserDatabase()
        await userDatabase.createListenerUserAndAdmin(user)

        return { id: id, role: role }
    }

    public async signupAdmin(name: string, nickname: string, email: string, password: string, role: string) {
        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const user = new User(id, name, nickname, email, hashPassword, role)

        const userDatabase = new UserDatabase()
        await userDatabase.createListenerUserAndAdmin(user)

        return { id: id, role: role }
    }

    public async login(nickname: string, email: string, password: string) {
        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserByEmailOrNickname(email, nickname)

        if (!user) {
            throw new Error("Parâmetros incorretos !")
        }

        const hashManager = new HashManager()
        const comparePasswords = await hashManager.compare(password, user.getPassword())

        if (!comparePasswords) {
            throw new Error("Informações inválidas")
        }
        return { id: user.getId(), role: user.getRole() }

    }

    public async bandSignup(name: string, nickname: string, description: string, email: string, password: string, isApproved: boolean, role: string) {
        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const band = new User(id, name, nickname, description, email, hashPassword, isApproved, role)

        const userDatabase = new UserDatabase()
        await userDatabase.createUserBand(band)

        return { id: id }
    }
    public async getApprovedBands(token: string) {

        const authenticator = new Authenticator()
        const bandData = authenticator.verify(token)

        if (bandData.role !== "ADMIN" || "admin") {
            throw new Error("Acesso negado!")
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
    async approvesBand(id: string, token: string) {
        const authenticator = new Authenticator()
        const bandData = authenticator.verify(token)

        const userDatabase = new UserDatabase()
        const band = await userDatabase.getApprovedBands(token)
    }
}

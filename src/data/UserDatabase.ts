import { BaseDatabase } from './BaseDatabase'
import { User } from '../model/User'

export class UserDatabase extends BaseDatabase {
    public static TABLE_NAME = 'SpotUser'

    private toModel(dbResult?: any): User | undefined {
        return (
            dbResult && new User(dbResult.id, dbResult.email, dbResult.name, dbResult.password, dbResult.role, dbResult.description, dbResult.isApproved)
        )
    }

    public async createListenerUserAndAdmin(user: User): Promise<void> {
        const userData = this.toModel(user)
        await this.connection()
            .insert({
                id: userData?.getId(),
                email: userData?.getEmail(),
                name: userData?.getName(),
                password: userData?.getPassword(),
                role: userData?.getRole()
            })
            .into(UserDatabase.TABLE_NAME)
    }
    public async createUserBand(user: User): Promise<void> {
        const userData = this.toModel(user)
        await this.connection()
            .insert({
                id: userData?.getId(),
                email: userData?.getEmail(),
                name: userData?.getName(),
                password: userData?.getPassword(),
                role: userData?.getRole(),
                description: userData?.getDescription()
            })
            .into(UserDatabase.TABLE_NAME)
    }
    public async getUserByEmailOrNickname(email: string, nickname: string): Promise<User | undefined> {
        const result = await this.connection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email })
            .orWhere({ nickname })

        return this.toModel(result[0])
    }
    public async getApprovedBands(role: string): Promise<User []> {
        const result = await this.connection().raw(`
          SELECT *
          FROM ${UserDatabase.TABLE_NAME}
          WHERE role = "${role}"`);
        return result[0]
      }
      public async getApproves(id: string): Promise<void> {
        const result = await this.connection().raw(`
        UPDATE S${UserDatabase.TABLE_NAME}
        SET isApproved = 1
        Where id = "${id}"
        `)
        return result
      }
}
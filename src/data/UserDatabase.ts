import { BaseDatabase } from './BaseDatabase'
import { User } from '../model/User'

export class UserDatabase extends BaseDatabase {
    public static TABLE_NAME: string = 'SpotUser'

    private toModel(dbResult?: any): User | undefined {
        return (
            dbResult && new User(
                dbResult.id,
                dbResult.name,
                dbResult.email,
                dbResult.nickname,
                dbResult.password,
                dbResult.role,
                dbResult.description,
                dbResult.isApproved
            )
        )
    }

    public async createListenerUserAndAdmin(user: User): Promise<void> {
        const userData = this.toModel(user)
        await this.connection()
            .insert({
                id: userData?.getId(),
                name: userData?.getName(),
                email: userData?.getEmail(),
                nickname: userData?.getNickname(),
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
                name: userData?.getName(),
                email: userData?.getEmail(),
                password: userData?.getPassword(),
                role: userData?.getRole(),
                description: userData?.getDescription(),
                isApproved: super.convertBooleanToTinyint(false)
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
    public async getApprovedBands(role: string): Promise<User[]> {
        const result = await this.connection().raw(`
          SELECT *
          FROM ${UserDatabase.TABLE_NAME}
          WHERE role = "${role}"`);
        return result[0]
    }
    public async getApproves(id: string): Promise<any> {
        const result = await this.connection().raw(`
        UPDATE S${UserDatabase.TABLE_NAME}
        SET isApproved = 1
        Where id = "${id}"
        `)
        return result
    }
}
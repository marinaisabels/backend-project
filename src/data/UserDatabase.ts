import { BaseDatabase } from './BaseDatabase'
import { User, UserRole } from '../model/User'

export class UserDatabase extends BaseDatabase {
    public static TABLE_NAME: string = 'SpotUser';

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
        await this.connection()
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                nickname: user.getNickname(),
                password: user.getPassword(),
                role: user.getRole()
            })
            .into(UserDatabase.TABLE_NAME)
    }
    public async createUserBand(user: User): Promise<void> {
        await this.connection()
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                nickname: user.getNickname(),
                password: user.getPassword(),
                role: user.getRole(),
                description: user.getDescription(),
                isApproved: this.convertBooleanToTinyint(false)
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
    public async getUserById(id: string): Promise<User | undefined> {
        const result = await this.connection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ id })
        return this.toModel(result[0])
    }
    public async approvedBandByAdmin(role: string): Promise<User[]> {
        const result = await this.connection().raw(`
          SELECT *
          FROM ${UserDatabase.TABLE_NAME}
          WHERE role = "${UserRole.BAND}"`);
        return result[0].map((res:any) => this.toModel(res))
    }
    public async getBandsApproved(id: string): Promise<any> {
        const result = await this.connection().raw(`
        UPDATE ${UserDatabase.TABLE_NAME}
        SET isApproved = 1
        Where id = "${id}"
        `)
        return result
    }
}
export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private nickname: string,
        private password: string,
        private role: UserRole,
        private description?: string,
        private isApproved?: boolean
    ) { }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
    public getEmail(): string {
        return this.email;
    }
    public getNickname(): string {
        return this.nickname;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRole(): UserRole {
        return this.role;
    }

    public getDescription(): string{
        return this.description as string;
    }

    public getApproved(): boolean{
        return this.isApproved as boolean;
    }
}

export enum UserRole {
    BAND = "BAND",
    PAYLISTENER = "PAY-LISTENER",
    NOPAYLISTENER = "NO-PAY-LISTENER",
    ADMIN = "ADMIN"
}

export const stringToUserRole = (input: string): UserRole => {
    switch (input) {
        case "BAND":
            return UserRole.BAND;
        case "PAY-LISTENER":
            return UserRole.PAYLISTENER;
        case "NO-PAY-LISTENER":
            return UserRole.NOPAYLISTENER;
        case "ADMIN":
            return UserRole.ADMIN;
        default:
            throw new Error("Opção inválida");
    }
};
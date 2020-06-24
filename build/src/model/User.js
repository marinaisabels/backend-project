"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToUserRole = exports.UserRole = exports.User = void 0;
class User {
    constructor(id, name, email, nickname, password, role, description, isApproved) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.role = role;
        this.description = description;
        this.isApproved = isApproved;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getNickname() {
        return this.nickname;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
    getDescription() {
        return this.description;
    }
    getApproved() {
        return this.isApproved;
    }
}
exports.User = User;
var UserRole;
(function (UserRole) {
    UserRole["BAND"] = "BAND";
    UserRole["PAYLISTENER"] = "PAY-LISTENER";
    UserRole["NOPAYLISTENER"] = "NO-PAY-LISTENER";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
exports.stringToUserRole = (input) => {
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

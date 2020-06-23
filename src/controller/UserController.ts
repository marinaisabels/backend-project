import { Request, Response } from "express";
import { UserBusiness } from '../business/UserBusiness'
import { Authenticator } from '../services/Authenticator'
import { UserDatabase } from "../data/UserDatabase";
import { BaseDatabase } from "../data/BaseDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";


export class UserController {
    private static UserBusiness = new UserBusiness(
        new UserDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    );
    public async signup(req: Request, res: Response) {
        const {
            name,
            email,
            nickname,
            password,
            role,
        } = req.body
        try {
            const result = await UserController.UserBusiness.signup(name, email, nickname, password, role)

            res.status(200).send(
                result
            )
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }

    async signupAdmin(req: Request, res: Response) {
        const {
            name,
            nickname,
            email,
            password,
            role,
        } = req.body
        try {
            const result = await UserController.UserBusiness.signupAdmin(name, nickname, email, password, role)
            res.status(200).send({
                result
            })

        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
    async login(req: Request, res: Response) {
        try {
            const { nickname, email, password } = req.body

            const result = await UserController.UserBusiness.login(nickname, email, password)

            res.status(200).send({
                result
            })

        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
    async bandSignup(req: Request, res: Response) {
        const {
            name,
            email,
            nickname,
            password,
            description
        } = req.body
        try {
            await UserController.UserBusiness.bandSignup(name, email, nickname, password, description)
            res.status(200).send({
                message: "Aguarde para ser aprovado"
            })
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
        
    }
    async getApprovedBand(req: Request, res: Response) {
        const token = req.headers.authorization as string;
        try {
            const band = await UserController.UserBusiness.getApprovedBands(token)
            res.status(200).send({
                band
            })
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
    async approvesBand(req: Request, res: Response) {
        const token = req.headers.authorization as string;
        const { id } = req.body
        try {
            const band = await UserController.UserBusiness.approvesBand(id, token)
            res.status(200).send({
                band
            })
        } catch (err) {
            res.status(err.statusCode || 400).send({
                error: err.message
            })
        }
    }
}
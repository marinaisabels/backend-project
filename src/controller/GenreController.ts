import { Request, Response } from "express";
import { GenreDatabase } from "../data/GenreDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { GenreBusiness } from "../business/GenreBusiness";

export class GenreController {
    private static GenreBusiness = new GenreBusiness(
        new GenreDatabase(),
        new UserDatabase(),
        new IdGenerator(),
        new Authenticator()
    )
    
    public async createGenre(req: Request, res: Response) {
        const token = req.headers.authorization as string;
        const { name } = req.body
        try{ 
            await GenreController.GenreBusiness.createGenre(name, token)
            res.status(200).send({
                message:"Criado com sucesso!"
            })
        }catch(err){
            res.status(400).send({
                message: err.message
            })
        }
    }
    public async getAllGenres(req: Request, res: Response){
        const token = req.headers.authorization as string;
        try {
            const genre = await GenreController.GenreBusiness.getAllGenres(token)
            res.status(200).send({
                genre
            })
        } catch (err) {
            res.status(400).send({
                error: err.message
            })
        }
    }
    
}
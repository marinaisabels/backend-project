import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { AlbunsDatabase } from "../data/AlbunsDataBase";
import { GenreDatabase } from "../data/GenreDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { AlbumBusiness } from "../business/AlbunsBusiness";


export class AlbumController {
    private static AlbumBusiness = new AlbumBusiness(
        new AlbunsDatabase(),
        new UserDatabase(),
        new GenreDatabase(),
        new IdGenerator(),
        new Authenticator()
    )

    public async createAlbum(req: Request, res: Response) {
        const token = req.headers.authorization as string
        const {
            name,
            allGenre
        } = req.body
        try {
            await AlbumController.AlbumBusiness.createAlbum(name, allGenre, token)
            res.status(200).send({
                message: "Album Criado com sucesso!"
            })
        }
        catch (err) {
            res.status(400).send({
                message: err.message
            })
        }
    }

}
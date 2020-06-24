"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRouter_1 = require("./router/UserRouter");
const GenreRouter_1 = require("./router/GenreRouter");
const AlbumRouter_1 = require("./router/AlbumRouter");
const MusicRouter_1 = require("./router/MusicRouter");
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use("/users/", UserRouter_1.userRouter);
app.use("/genre/", GenreRouter_1.genreRouter);
app.use("/album/", AlbumRouter_1.albumRouter);
app.use("/music/", MusicRouter_1.musicRouter);
exports.default = app;
const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});

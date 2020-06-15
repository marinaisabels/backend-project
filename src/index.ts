import express from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { userRouter, bandRouter } from "./router/UserRouter";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users/", userRouter);
app.use("/bands", bandRouter);


const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
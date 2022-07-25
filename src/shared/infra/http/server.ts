import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "../typeorm/index";
import "express-async-errors";
import { router } from "./routes";
import "../../container";
import cors from "cors";

const app = express();
app.use(express.json());


app.use(cors());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
}
);

app.listen(process.env.PORT || 3000, () => console.log("server is running"));


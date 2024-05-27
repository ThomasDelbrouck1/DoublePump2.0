import e, { Request, Response, NextFunction } from "express";
import { userId, client } from "../index";


export async function currentAvatar(req: Request, res: Response, next: NextFunction) {
    if (userId !== "") {
        const user = await client.db("wpl").collection("users").findOne({ _id: userId })
        res.locals.currentAvatar = user?.currentAvatar;
        next();
    }
    else {
        res.locals.currentAvatar = "";
        next();
    }
}
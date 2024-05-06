import { Request, Response, Router } from "express";
import express from "express";
import { get } from "http";
const router = Router();

router.use(express.static("public"));

router.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
    });
});

router.post('/', (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.send("Received the post");
});

export default router;
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
    
    console.log("Request body:", req.body); // Log the entire request body
    const { email, password } = req.body; // Destructure email and password
    console.log("Email:", email, "Password:", password); // Log email and password

    res.send("Received the post");
});

export default router;
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



export default router;
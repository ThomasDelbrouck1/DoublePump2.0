import express from "express";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://wpl:doublepump@wplcluster.tus2eyw.mongodb.net/";
const client = new MongoClient(uri);

const app = express();

app.set("view engine", "ejs");
app.set("port", 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/avatar", (req, res) => {
  res.render("avatar");
});
app.get("/favorieten", (req, res) => {
  res.render("favorieten");
});
app.get("/registratiepagina", (req, res) => {
  res.render("registratiepagina");
});
app.get("/zwartelijst", (req, res) => {
  res.render("zwartelijst");
});

app.post("/registratiepagina", async (req, res) => {
  const { firstname, lastname, username, password, email } = req.body;
  console.log(firstname, lastname, username, password, email);
  await client.db("wpl").collection("users").insertOne({
    firstname,
    lastname,
    password,
    username,
    email,
    favorieten: [],
    zwartelijst: [],
  });

  res.redirect("/");
});

app.listen(app.get("port"), async () => {
  await client.connect();
  console.log("[server] connected to mongodb");
  console.log("[server] http://localhost/:" + app.get("port"));
});

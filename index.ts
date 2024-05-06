import express from "express";
import authentificationRouter from './routers/authentification'
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://wpl:doublepump@wplcluster.tus2eyw.mongodb.net/";
const client = new MongoClient(uri);

const app = express();

app.set("view engine", "ejs");
app.set("port", 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
//app.use('/', authentificationRouter);


app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

app.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await client.db("wpl").collection("users").findOne({ email: email });
    if (user && user.password === password) {
      res.redirect("/avatar");
      return;
    }
    else {
      //error
      res.redirect("/avatar");
    }
  }
  catch (err) {
    console.error(err);
  }
});

app.get("/avatar", (req, res) => {
  res.render("avatar", {
    title: "Avatar",
  });
});
app.get("/favorieten", (req, res) => {
  res.render("favorieten", {
    title: "Favorieten",
  });
});
app.get("/registratiepagina", (req, res) => {
  res.render("registratiepagina", {
    title: "Registratiepagina",
  });
});
app.get("/zwartelijst", (req, res) => {
  res.render("zwartelijst", {
    title: "Zwartelijst",
  });
});
app.get("/profiel", (req, res) => {
  res.render("profiel", {
    title: "Profiel",
  });
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


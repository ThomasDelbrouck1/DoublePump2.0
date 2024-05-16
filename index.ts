import express from "express";
import authentificationRouter from './routers/authentification'
import { MongoClient } from "mongodb";
import { error } from "console";
import dotenv from "dotenv";
dotenv.config();
const uri = "mongodb+srv://wpl:doublepump@wplcluster.tus2eyw.mongodb.net/";
const client = new MongoClient(uri);

const app = express();


app.set("view engine", "ejs");
app.set("port", 3000);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authentificationRouter);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});
let username = "";
app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await client.db("wpl").collection("users").findOne({
      email
    });
    if (user) {
      if (user.email == email && user.password == password) {
        // Set res.locals.username here
        username = user.username;
        res.status(200).json({ message: "gebruiker gevonden" });
        return;
      }
      else {
        res.status(400).json({ error: "gebruikersnaam of wachtwoord is incorrect" });
      }
      return;
    } else {
      res.status(400).json({ error: "deze gebruiker bestaat niet" });
    }
  }
  catch {
    res.send("error bij het inloggen");
  }
});
app.get("/avatar", async (req, res) => {
  const apiKey = process.env.API_KEY;

  await fetch('https://fortniteapi.io/v2/items/list?lang=en', {
    method: 'GET',
    headers: {
      'Authorization': apiKey as string,
    }
  })
    .then(response => response.json())
    .then((data: any) => {
      res.status(200).json(data);
      for (let i = 0; i < data.items.length; i++) {
        console.log(data.items[i].name);
      }
    })
    .catch(error => {
      console.log(error);
    });
});
/*app.get("/avatar", (req, res) => {
  res.render("avatar", {
    title: "Avatar",
    username
  });
});*/
app.get("/favorieten", (req, res) => {
  res.render("favorieten", {
    title: "Favorieten",
    username
  });
});
app.get("/registratiepagina", (req, res) => {
  res.render("registratiepagina", {
    title: "Registratiepagina",
    username
  });
});
app.post('/registratiepagina', async (req, res) => {

  const { firstname, lastname, email, username, password } = req.body; // Destructure email and password
  try {
    await client.db("wpl").collection("users").insertOne({
      firstname,
      lastname,
      email,
      username,
      password,
      favorieten: [],
      zwartelijst: []
    });
    res.redirect('/');
  }
  catch {
    res.redirect('/registratiepagina'); // maak een error pagina
  }

});
app.get("/zwartelijst", (req, res) => {
  res.render("zwartelijst", {
    title: "Zwartelijst",
    username
  });
});
app.get("/profiel", (req, res) => {
  res.render("profiel", {
    title: "Profiel",
    username
  });
});



app.listen(app.get("port"), async () => {
  await client.connect();
  console.log("[server] connected to mongodb");
  console.log("[server] http://localhost/:" + app.get("port"));
});


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

const apiKey = process.env.API_KEY;
const charactersIDs: any[] = [];
const characters: any[] = [];


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
  res.render("avatar", {
    title: "Avatar",
    characters,
    username
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

app.get("/api/characters/:id", async (req, res) => {
  const id = req.params.id;
  await fetch(`https://fortniteapi.io/v2/items/get?id=${id}&lang=en`, {
    method: 'GET',
    headers: {
      'Authorization': apiKey as string,
    }
  })
    .then(response => response.json())
    .then((data: any) => {
      res.json(data);
    })
    .catch(error => {
      console.log(error);
    });
});


app.listen(app.get("port"), async () => {
  await client.connect();
  console.log("[server] connected to mongodb");
  await fetch('https://fortniteapi.io/v2/items/list?lang=en', {
    method: 'GET',
    headers: {
      'Authorization': apiKey as string,
    }
  })
    .then(response => response.json())
    .then((data: any) => {
      // Sorting data by release date (newest on top)
      data.items.sort((a: any, b: any) => {
        return new Date(b.added.date).getTime() - new Date(a.added.date).getTime();
      });
      for (let i = 0; i < data.items.length; i++) {
        // Filtering out characters
        if (data.items[i].type.name === "Outfit" &&
          data.items[i].name &&
          data.items[i].name !== "TBD" &&
          data.items[i].name !== "NPC" &&
          !data.items[i].id.includes("NPC") &&
          !data.items[i].id.includes("CID_NPC")) {
          characters.push(data.items[i]);
        }
      }
    })
    .catch(error => {
      console.log(error);
    });

  console.log('Data fetched from Fortnite API');
  console.log("[server] http://localhost/:" + app.get("port"));
});
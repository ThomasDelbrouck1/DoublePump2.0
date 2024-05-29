import express from "express";
import authentificationRouter from './routers/authentification'
import { MongoClient } from "mongodb";
import { error } from "console";
import dotenv from "dotenv";
import { currentAvatar } from "./middleware/currentAvatar";
import bcrypt from "bcrypt";
import { cookieMiddleware } from "./middleware/cookieMiddleware";
import cookieParser from 'cookie-parser';


dotenv.config();
const uri = "mongodb+srv://wpl:doublepump@wplcluster.tus2eyw.mongodb.net/";
export const client = new MongoClient(uri);

const app = express();


app.set("view engine", "ejs");
app.set("port", 3000);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(currentAvatar);
app.use(cookieParser());


const apiKey = process.env.API_KEY;
const charactersIDs: any[] = [];
const characters: any[] = [];


app.use('/', authentificationRouter);

app.get("/", (req, res) => {
  if (req.cookies.user) {
    res.locals.userId = req.cookies.user;
    res.locals.username = username;
    res.redirect('/avatar');
  } else {
    res.render("index", {
      title: "Home",
    });
  }
});

app.get("/wachtwoordvergeten", (req, res) => {
  res.render("wachtwoordvergeten",{
    title: "wachtwoordvergeten"});
});

app.post("/saveStats", async (req, res) => {
  const { wins, losses, notes } = req.body;
  const user = userId;
  
  try {
    // Update user document in the database with new win/loss stats and notes
    await client.db("wpl").collection("users").updateOne(
      { _id: user },
      { $set: { wins, losses, notes } }
    );
    
    res.status(200).json({ message: "Stats and notes saved successfully." });
  } catch (error) {
    console.error("Error saving stats and notes: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// login

let username = "";
export let userId: any = "";
app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await client.db("wpl").collection("users").findOne({
      email
    });
    if (user) {
      if (user.email == email && bcrypt.compareSync(password, user.password)) {
        // Set res.locals.username here
        username = user.username;
        // Set res.locals.userId as global variable
        userId = user._id;
        // add cookie for user with max age 1 week
        res.cookie("user", userId, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: true,
          sameSite: "strict",
        })
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

app.get("/avatar", cookieMiddleware, async (req, res) => {
  const avatarName: any = req.query.avatarName ? req.query.avatarName : "";
  let filteredCharacters: any[] = characters;
  const profilePicture = res.locals.currentAvatar ? res.locals.currentAvatar : "/assets/popje1.jpeg";

  if (avatarName === '') {
    res.render("avatar", {
      title: "Avatar",
      characters: filteredCharacters,
      username,
      avatarName,
      profilePicture
    });
    return;
  }
  if (avatarName) {
    filteredCharacters = characters.filter((character: any) => {
      return character.name.toLowerCase().includes(avatarName.toString().toLowerCase());
    });

    res.render("avatar", {
      title: "Avatar",
      characters: filteredCharacters,
      username,
      avatarName,
      profilePicture
    });

    return;
  }

  res.render("avatar", {
    title: "Avatar",
    characters,
    username,
    avatarName,
    profilePicture
  });
});


/*app.get("/avatar", (req, res) => {
  res.render("avatar", {
    title: "Avatar",
    username
  });
});*/

app.get("/favorieten", cookieMiddleware,  async (req, res) => {
  const avatarName: any = req.query.avatarName ? req.query.avatarName : "";
  const usersFav = await client.db("wpl").collection("users").findOne({ _id: userId });
  const favCharacters: any = [];
  const profilePicture = res.locals.currentAvatar ? res.locals.currentAvatar : "/assets/popje1.jpeg";

  for (let i = 0; i < usersFav?.favorieten.length; i++) {
    const character = await fetch(`https://fortniteapi.io/v2/items/get?id=${usersFav?.favorieten[i]}&lang=en`, {
      method: 'GET',
      headers: {
        'Authorization': apiKey as string,
      }
    })
      .then(response => response.json())
      .then((data: any) => {
        return data;
      })
      .catch(error => {
        console.log(error);
      });
    favCharacters.push(character);
  }
  res.render("favorieten", {
    title: "Favorieten",
    username,
    avatarName,
    characters: favCharacters,
    profilePicture
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
      password : bcrypt.hashSync(password, 10),
      favorieten: [],
      zwartelijst: [],
      currentAvatar: ""
    });
    res.redirect('/');
  }
  catch {
    res.redirect('/registratiepagina'); // maak een error pagina
  }

});
app.get("/zwartelijst", cookieMiddleware,  async (req, res) => {
  const avatarName: any = req.query.avatarName ? req.query.avatarName : "";
  const usersBlack = await client.db("wpl").collection("users").findOne({ _id: userId });
  const blackListCharacters: any = [];
  const profilePicture = res.locals.currentAvatar ? res.locals.currentAvatar : "/assets/popje1.jpeg";

  for (let i = 0; i < usersBlack?.zwartelijst.length; i++) {
    const character = await fetch(`https://fortniteapi.io/v2/items/get?id=${usersBlack?.zwartelijst[i].characterId}&lang=en`, {
      method: 'GET',
      headers: {
        'Authorization': apiKey as string,
      }
    })
      .then(response => response.json())
      .then((data: any) => {
        return data;
      })
      .catch(error => {
        console.log(error);
      });
    blackListCharacters.push(character);
  }

  res.render("zwartelijst", {
    title: "Zwartelijst",
    username,
    avatarName,
    charactersBlack: blackListCharacters,
    profilePicture
  });
});

app.get("/profiel", cookieMiddleware,  (req, res) => {
  const profilePicture = res.locals.currentAvatar ? res.locals.currentAvatar : "/assets/popje1.jpeg";

  res.render("profiel", {
    title: "Profiel",
    username,
    profilePicture
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

app.post("/saveToFav", async (req, res) => {
  const { characterId } = req.body;
  const user = userId;
  const usersFav = await client.db("wpl").collection("users").findOne({ _id: user });
  if (!usersFav?.favorieten.includes(characterId)) {
    await client.db("wpl").collection("users").updateOne({ _id: user }, { $push: { favorieten: characterId } });
  }
  res.redirect('/avatar');
});

app.post("/saveAsActive", async (req, res) => {
  let { characterId } = req.body;
  const user = userId;
  characterId = await fetch(`https://fortniteapi.io/v2/items/get?id=${characterId}&lang=en`, {
    method: 'GET',
    headers: {
      'Authorization': apiKey as string,
    }
  })
    .then(response => response.json())
    .then((data: any) => {
      return data.item.images.icon_background;
    })
    .catch(error => {
      console.log(error);
    });
  await client.db("wpl").collection("users").updateOne({ _id: user }, { $set: { currentAvatar: characterId } });
  res.redirect('/avatar');
});

app.post("/saveToBlack", async (req, res) => {
  const { characterId } = req.body;
  const reason = ""; // You had a type declaration here which is not necessary in JavaScript
  const user = userId;
  
  try {
    const usersBlacklist = await client.db("wpl").collection("users").findOne({ _id: user });
    let characterExists = false;

    if (usersBlacklist && usersBlacklist.zwartelijst) {
      for (let i = 0; i < usersBlacklist.zwartelijst.length; i++) {
        if (usersBlacklist.zwartelijst[i].characterId === characterId) {
          characterExists = true;
          break;
        }
      }
    }

    if (!characterExists) {
      const newEntry = { characterId, reason };
      await client.db("wpl").collection("users").updateOne(
        { _id: user },
        { $push: { zwartelijst: newEntry } as any }
      );
    }

    res.redirect('/avatar');
  } catch (error) {
    console.error("Error updating blacklist: ", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/deleteUser", async (req, res) => {
  const  {username} = req.body;
  const user = await client.db("wpl").collection("users").findOne({ username: username })
  if (username === user?.username) {
    await client.db("wpl").collection("users").deleteOne({ _id: user?._id });
    res.redirect('/');
  }
});

app.post("/changeUsername", async (req, res) => {
  const { newUsername } = req.body;
  const user = userId;
  try {
    await client.db("wpl").collection("users").updateOne({ _id: user }, { $set: { username: newUsername } });
    username = newUsername;
    res.redirect('/profiel');
  }
  catch {
    res.redirect('/profiel');
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/");
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
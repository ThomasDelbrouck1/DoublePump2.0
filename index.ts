import express from "express";

const app = express();

app.set("view engine", "ejs");
app.set("port", 3000);

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

app.listen(app.get("port"), async () => {
  console.log("[server] http://localhost/:" + app.get("port"));
});

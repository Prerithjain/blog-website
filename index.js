import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/new", (req, res) => {
  res.render("newb.ejs");
});
app.get("/read", (req, res) => {
  res.render("read.ejs",);
});
app.get("/read/1", (req, res) => {
  res.render("read1.ejs");
});
app.get("/read/2", (req, res) => {
  res.render("read2.ejs");
});
app.get("/read/3", (req, res) => {
  res.render("read3.ejs");
});

app.post("/create", (req, res) => {
  const data = {
    authname: req.body["Authorname"],
    blogname: req.body["Blogname"],
    content: req.body["content"],
  };

  console.log("Author:", data.authname);
  console.log("Blog Name:", data.blogname);
  console.log("Content:", data.content);

  res.render("createdblog.ejs", data);
});

app.listen(3000, () => {
  console.log("running on 3000");
});

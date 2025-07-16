import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const port = 3000;
const API_URL = "http://localhost:4000";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// Homepage
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// New blog form
app.get("/new", (req, res) => {
  res.render("newb.ejs");
});

// Show all blogs
app.get("/read", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    res.render("read.ejs", { data: response.data });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).send("Something went wrong while fetching posts");
  }
});

// Show single blog
app.get("/read/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/${req.params.id}`);
    res.render("read1.ejs", { blog: response.data });
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    res.status(500).send("Something went wrong");
  }
});

app.post("/create", async (req, res) => {
  try {
    console.log("Received from form:", req.body); // 🪵 Log incoming data
    const response = await axios.post(`${API_URL}/blogs`, req.body);
    res.redirect(`/read/${response.data._id}`);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).send("Error creating post");
  }
});


app.listen(port, () => {
  console.log(`💻 Frontend running at http://localhost:${port}`);
});

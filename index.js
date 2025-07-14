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

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/new", (req, res) => {
  res.render("newb.ejs");
});
// app.get("/read", (req, res) => {
//   res.render("read.ejs", { data: data });
// });
app.get("/read", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    console.log(response);
    res.render("read.ejs", { data: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});
// app.get("/read/:id", (req, res) => {
//   const blogId = parseInt(req.params.id);
//   const blog = data.find(post => post.id === blogId);
//   if (blog) {
//     res.render("read1.ejs", { blog });
//   } else {
//     res.status(404).send("Blog not found");
//   }
// });
app.get("/read/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/${req.params.id}`);
    const blog = response.data;

    if (blog) {
      res.render("read1.ejs", { blog });
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    res.status(500).send("Something went wrong");
  }
});

// app.post("/create", (req, res) => {
//   const newBlog = {
//     id: data.length + 1,
//     authname: req.body["Authorname"],
//     blogname: req.body["Blogname"],
//     content: req.body["content"]
//   };

//   data.push(newBlog);
//   res.redirect(`/read/${newBlog.id}`);
// });
app.post("/create", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/blogs`, req.body);
    console.log(response.data);
    res.redirect(`/read/${response.data.id}`);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});
app.listen(3000, () => {
  console.log("running on 3000");
});
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
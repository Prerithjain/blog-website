import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Blog } from "./models/blog.js";  // Adjust path if needed
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;  // Use Render's dynamic port

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));  // Serve static files
app.set("view engine", "ejs");  // EJS templating
app.set("views", path.join(__dirname, "views"));  // Assuming 'views' folder for EJS files

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// --- API Routes (kept for external use, e.g., if you add a mobile app later) ---

// GET all blogs
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET blog by ID
app.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not Found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// CREATE new blog
app.post("/blogs", async (req, res) => {
  try {
    console.log("Saving to MongoDB:", req.body);
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Error saving blog:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE blog
app.patch("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ message: "Not Found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE blog
app.delete("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not Found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- Frontend Routes (using direct DB access instead of Axios) ---

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
    const blogs = await Blog.find();  // Direct DB query (replaces Axios)
    res.render("read.ejs", { data: blogs });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).send("Something went wrong while fetching posts");
  }
});

// Show single blog
app.get("/read/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);  // Direct DB query (replaces Axios)
    if (!blog) return res.status(404).send("Not Found");
    res.render("read1.ejs", { blog });
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    res.status(500).send("Something went wrong");
  }
});

// Create new blog (from form)
app.post("/create", async (req, res) => {
  try {
    console.log("Received from form:", req.body);
    const blog = new Blog(req.body);  // Direct DB save (replaces Axios)
    await blog.save();
    res.redirect(`/read/${blog._id}`);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).send("Error creating post");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

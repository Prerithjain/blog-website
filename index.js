import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
let data = [
  {
    id: 1,
    blogname: "Embracing Minimalism in Everyday Life",
    authname: "Jane Mitchell",
    content: `Minimalism isn’t just about having a clean desk or a tidy wardrobe — it’s a way of thinking. In today’s fast-paced, consumer-driven world, many of us find ourselves overwhelmed with clutter — both physical and mental.

I started embracing minimalism three years ago. At first, it began with decluttering my home — donating clothes I hadn't worn in years, tossing out expired products, and reducing the furniture in my living room. But it quickly became something deeper.

Digital clutter was the next big step. I deleted hundreds of unnecessary photos from my phone, organized my files, unsubscribed from promotional emails, and began limiting my screen time.

But perhaps the most powerful aspect of minimalism is its mental impact. By prioritizing what truly matters, I’ve reduced decision fatigue, found more mental clarity, and have more time to spend on meaningful experiences.

If you're starting out, begin small. Try decluttering just one drawer or going one day without social media. Minimalism is a journey — one that doesn’t mean owning nothing, but rather owning only what adds value.

Live with less, and you’ll experience more.`
  },
  {
    id: 2,
    blogname: "The Rise of AI in Modern Education",
    authname: "Rahul Verma",
    content: `Artificial Intelligence is no longer confined to science fiction — it's now shaping our classrooms. From intelligent tutoring systems to automated grading and personalized learning experiences, AI is making education smarter and more accessible.

One of the biggest benefits of AI in education is adaptability. Students no longer need to fit into a one-size-fits-all model. AI can assess a learner’s strengths and weaknesses, adjusting content in real time to suit individual needs.

For teachers, AI reduces the burden of repetitive tasks. Grading multiple-choice exams, managing attendance, and even detecting plagiarism can be handled by intelligent systems.

However, the integration of AI isn’t without its challenges. There are concerns about data privacy, over-reliance on machines, and the potential loss of human connection in the classroom.

The future of education lies in finding the right balance. AI should augment teachers, not replace them. By combining the efficiency of machines with the empathy of educators, we can create a system that’s truly student-centered.

In this rapidly changing world, learning how to learn will be the most important skill — and AI can help us master it.`
  },
  {
    id: 3,
    blogname: "Wandering Through the Streets of Kyoto",
    authname: "Emily Chen",
    content: `Kyoto is more than just temples and tea ceremonies — it’s a city where tradition whispers through every street corner. As I walked through the narrow alleys of Gion, I could almost hear echoes of geishas past, their wooden sandals clacking on stone pavements.

One morning, I wandered into Arashiyama’s Bamboo Grove. The towering stalks swayed gently, filtering sunlight into a magical green glow. The silence was powerful, only interrupted by the occasional chirp of birds or the rustle of leaves.

Fushimi Inari-taisha, with its iconic red torii gates, was another spiritual experience. As I climbed up the mountain path, passing under thousands of vermillion gates, I felt a quiet connection to something ancient and sacred.

Kyoto’s food scene is just as rich — from matcha parfaits to warm bowls of udon served in humble wooden inns. I found a small café tucked between townhouses where I wrote postcards, sipped on hojicha, and watched the world go by.

Every moment in Kyoto felt like a pause — a break from the chaos of modern life. It reminded me that beauty lies in the quiet, in the ordinary, and in the stories that streets silently hold.

Kyoto doesn’t shout — it whispers. And if you listen closely, it leaves you transformed.`
  }
];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/new", (req, res) => {
  res.render("newb.ejs");
});
app.get("/read", (req, res) => {
  res.render("read.ejs", { data: data });
});
app.get("/read/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = data.find(post => post.id === blogId);
  if (blog) {
    res.render("read1.ejs", { blog });
  } else {
    res.status(404).send("Blog not found");
  }
});

app.post("/create", (req, res) => {
  const newBlog = {
    id: data.length + 1,
    authname: req.body["Authorname"],
    blogname: req.body["Blogname"],
    content: req.body["content"]
  };

  data.push(newBlog);
  res.redirect(`/read/${newBlog.id}`);
});

app.listen(3000, () => {
  console.log("running on 3000");
});

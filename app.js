const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');

const dbURL ='mongodb+srv://admin:bG18QE4cTHrCLET6@cluster0.yugi3tj.mongodb.net/node-tutorial?retryWrites=true&w=majority'

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(3000, () => {
    console.log(`Server running at port 3000`);
  }))

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res, next) => {
  res.render("about", { title: "About Page In EJS" });
});

app.use('/blogs',blogRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { title: "404 Page In EJS" });
});



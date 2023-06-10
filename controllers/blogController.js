const Blog = require("../models/blog");

//Blog index
const blog_index =(req, res, next) => {
    Blog.find().sort({createdAt:-1}).then((result) => {
        res.render("blogs/index", { title: "Blog", blogs: result });
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })
}

//Blog details
const blog_details = (req, res, next) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render("blogs/details", { blog: result, title: "Blog Details" });
        })
        .catch((err) => {
            console.log(err);
        }
    );
}

//Create a blog
const blog_create_get = (req, res, next) => {
    res.render('blogs/create', { title: 'Create a new blog' });
}

//Create a blog
const blog_create_post = (req, res, next) => {
    const blog = new Blog(req.body);
    blog.save()
      .then((result) => {
        res.redirect('/');
      })
      .catch((err) => {
        console.log(err);
      });
}

//Delete a blog
const blog_delete = (req, res, next) => {
    const id = req.params.id; 
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}
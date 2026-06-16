const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];
let nextId = 1;

// Home - view all posts
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Create post
app.post('/posts', (req, res) => {
    const { author, title, content } = req.body;
    posts.unshift({
        id: nextId++,
        author,
        title,
        content,
        createdAt: new Date().toLocaleString()
    });
    res.redirect('/');
});

// Edit form
app.get('/posts/:id/edit', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.redirect('/');
    res.render('edit', { post });
});

// Update post
app.post('/posts/:id/edit', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        post.title = req.body.title;
        post.author = req.body.author;
        post.content = req.body.content;
    }
    res.redirect('/');
});

// Delete post
app.post('/posts/:id/delete', (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

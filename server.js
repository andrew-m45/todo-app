// import node dependencies
const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

// initalize express app
const app = express();

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB'))
    .catch(console.error);

// import mongo model
const Todo = require('./models/TodoModel');

// routes

// @desc    Get all todos
// @route   GET /todos
app.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    res.status(200).json(todos);
});

// @desc    Create a todo
// @route   POST /todos
app.post('/todo/create', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();
    res.status(201).json(todo);
});

// @desc    Delete a todo
// @route   DELETE /todo/:id
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
});

// @desc    Update a todo
// @route   GET /todos/:id
app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();
    res.status(200).json(todo);
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


// start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`))
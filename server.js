const express = require('express');
const { MongooseDocument } = require('mongoose');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser')
require('dotenv').config({
    path: __dirname + '/.env'
})
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const DB = process.env.DATABASE.replace('<DATABASE_PASSWORD>', process.env.DATABASE_PASSWORD);

// Connect to database
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((con) => {
    console.log('DB connection successful!');
});

// Uncomment for deployment

// function requireHTTPS(req, res, next) {
//     // The 'x-forwarded-proto' check is for Heroku
//     if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//         return res.redirect('https://' + req.get('host') + req.url);
//     }
//     next();
// }

// app.use(requireHTTPS);
app.use(express.static('./dist/angular-heroku'));

app.get('/', (req, res) =>
    res.sendFile('index.html', {
        root: 'dist/angular-heroku/'
    }),
);

const ToDoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean
    }
    // date: {
    //     type: Date,
    //     required: true
    // }
});

const ToDo = mongoose.model('Todo', ToDoSchema);

// Endpoints
// Add TODO
app.post('/api/todo', async (req, res) => {
    console.log(req.body)
    try {
        const newToDo = await ToDo.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                user: newToDo
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
});

// Fetch TODOS
app.get('/api/todo', async (req, res) => {
    try {
        const todos = await ToDo.find();

        res.status(200).json({
            status: 'success',
            results: todos.length,
            data: todos
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

})

// Update TODOS
// here


// Delete TODOS
app.delete('/api/todo/:id', (req, res) => {
    ToDo.findByIdAndDelete(req.params.id, (err, res) => {
        if(err) {
            console.log(err)
        } else {
            console.log('deleted!')
        }
    });
});

// app.delete('/api/todo/:id', async (req, res) => {
//     console.log(req.params.id)
//     try {
//         ToDo.findByIdAndDelete(req.params.id);

//         res.status(200).json({
//             status: 'success'
//         })
//     } catch (err) {
//         res.status(404).json({
//             status: 'fail',
//             message: err
//         });
//     }
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port} in ${app.get('env')} mode`);
});

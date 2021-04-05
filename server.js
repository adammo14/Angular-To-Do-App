const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({
    path: __dirname + '/.env'
})
const app = express();

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

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

app.use(requireHTTPS);
app.use(express.static('./dist/angular-heroku'));

app.get('/', (req, res) =>
    res.sendFile('index.html', {root: 'dist/angular-heroku/'}),
);

const ToDoSchema = new mongoose.Schema({
  id: {
      type: Number
  },
  title: {
      type: String
  }
});

const ToDo = mongoose.model('Todo', ToDoSchema);

// Endpoints
app.post('/api/toDo', async (req, res) => {
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

app.get('/api/toDo', async (req, res) => {
  try {
      const todos = await ToDo.find();

      res.status(200).json({
          status: 'success',
          results: todos.length,
          data: {
              todos
          }
      })
  } catch (err) {
      res.status(404).json({
          status: 'fail',
          message: err
      });
  }

})

const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`App running on port ${port} in ${app.get('env')} mode`);
});

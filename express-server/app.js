const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

const app = express()
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const adapter = new FileAsync('db.json')

low(adapter)
  .then(db => {
    app.get('/todos', (req, res) => {
      const post = db.get('todos')
        .value()

      res.send(post)
    })

    app.post('/todos', (req, res) => {
      const lastIndex = db.get('todos')
        .last()
        .value()


      db.get('todos')
        .push(req.body)
        .last()
        .assign({ id: lastIndex.id + 1 })
        .write()
        .then(post => res.send(post))
    })

    app.put('/todos/:id', (req, res) => {
      const id = parseInt(req.params.id, 10)
      const put = db.get('todos')
        .find({ id: id })

      put.assign({ description: req.body.description, status: req.body.status })
        .write()

      res.send(put.value())
    })

    return db.defaults({
      todos: []
    })
    .write()
  })
  .then(() => {
    app.listen(3000, () => console.log('Example app listening on port 3000!'))
  })

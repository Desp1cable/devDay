const app = require('express')()
const mongoose = require('mongoose')
const jsonParser = require('body-parser').json()

// Config
const port = 3000
const URI = 'mongodb+srv://Despicable:Zhengulov1@cluster0.fcj4x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// Models
const Users = require('./models/Users.js')

// Functions
sendJSON = (res, status, data) => {
  res.status(status)
  res.json(data)
  console.log(data)
}
sendError = (res, status, err) => {
  res.status(status)
  res.json(err)
  console.log(err)
}

// Connection
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result => console.log('connected to db')))
  .catch(err => console.error(err))

// --API--
// Creating new User
app.post('/addUser', jsonParser, (req, res) => {
  Users.create({
    email: req.body.email,
    score: 0
  })
  .then(() => sendJSON(res, 200, {added: true}))
  .catch(err => sendError(res, 500, err))
})

// getUsers
app.post('/getUsers', jsonParser, (req, res) => {
  Users.find({}, 'email score', (err, query) => {
    sendJSON(res, 200, query)
  }).catch(err => sendError(res, 500, err))
})

// getUser
app.post('/getUser', jsonParser, (req, res) => {
  Users.findOne({email: req.body.email}, 'email score', (err, query) => {
    sendJSON(res, 200, query)
  }).catch(err => sendError(res, 500, err))
})

// changeScore
app.post('changeScore', jsonParser, (req, res) => {
  Users.findOneAndUpdate(
    {email: req.body.email}, 
    {score: req.body.score}, 
    {useFindAndModify: false, new: true},
    (err, query) => {
      sendJSON(res, 200, query)
    }).catch(err => sendError(res, 500, err))
})

// Not Found
app.use((req, res) => {
  sendError(res, 404, {err: 'Not Found'})
})

// Listening
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
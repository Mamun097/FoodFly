const express = require('express')
const app = express()
const port = 5000
const mongoDB = require('./db');
mongoDB();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use('/api', require("./routes/Auth"));

app.listen(port, () => {
  console.log(`backend listening on port ${port}`)
})


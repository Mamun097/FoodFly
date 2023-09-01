const express = require('express')
const app = express()
const port = 5000
const mongoDB = require('./db');
mongoDB();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use('/api', require("./routes/Auth"));
app.use('/api', require("./routes/Restaurant"));
app.use('/api', require("./routes/User"));
app.use('/api', require("./routes/DeliveryPerson"));

app.listen(port, () => {
  console.log(`backend listening on port ${port}`)
})


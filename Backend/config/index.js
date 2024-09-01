const connectToDb = require('./db.js');
const express = require('express');
const app = express();
const cors = require('cors');
connectToDb();
port = 5000;

app.use(express.json());
app.use(cors())


app.listen(port,()=>{
    console.log("Server started");
})

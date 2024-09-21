const connectToDb = require('./db');
const express = require('express');
const cors = require('cors');
const registerRoute = require('../router/Register'); 

const app = express();
const port = 5000;


connectToDb();

// Middleware
app.use(express.json());
app.use(cors());


app.use('/api', registerRoute);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

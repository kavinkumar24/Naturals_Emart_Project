    const connectToDb = require('./db');
    const express = require('express');
    const cors = require('cors');
    const registerRoute = require('../router/Register'); 
    const loginRoute = require('../router/Login');
    const seller = require('../router/Seller');
    const admin = require('../router/Admin');
    const User = require('../router/User');
    const buyerform = require('../router/Buyer')
    const GET_seller = require('../router/Get_Seller');
    const app = express();

    const port = 5000;
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    
    connectToDb();

    // Middleware
    app.use(express.json());
    app.use(cors());


    app.use('/api', registerRoute);
    app.use("/api", GET_seller);
    app.use('/api', loginRoute);
    app.use('/api', seller);
    app.use('/api', buyerform);
    app.use('/api', admin);
    app.use('/api', User);


    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

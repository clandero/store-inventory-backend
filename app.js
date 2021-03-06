const express = require('express');
const bodyParser = require('body-parser');

const productsRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.DB_URI

const mongoose = require('mongoose')
mongoose.connect(uri)
.then(() => { 
    console.log('Connected!');
})
.catch((error) => { 
    //throw new HttpError('Connection failed', 500);
    throw new Error(error);
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


var corsOptions = {
    origin: ['http://localhost:8080'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'] 
};

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    return next(error);
});

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occured'});
});

app.listen(process.env.PORT || 8000);
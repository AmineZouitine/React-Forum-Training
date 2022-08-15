const express = require('express');
const mongoose = require('mongoose');
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

app.listen(process.env.PORT);

app.use(bodyParser.json());
app.use('/user', userRoute);
app.use('/posts', postsRoute);

mongoose.connect(process.env.DB_CONNECTION,
() => 
{
    console.log("connected to db");
});

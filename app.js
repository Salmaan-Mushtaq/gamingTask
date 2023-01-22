const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const gameRouters = require('./routers/gameRouters')

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://khanSalmaan:Salmaan786@newcluster.fzkg6ri.mongodb.net/test")
    .then(() => {
        console.log("Data Base Connected");
        app.listen(3000, () => {
            console.log('Gamming website is listening on port 3000')
        });
    })
    .catch(err => {
        console.log("Oh!! Database did not connect");
        console.log(err);
    })

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(gameRouters);

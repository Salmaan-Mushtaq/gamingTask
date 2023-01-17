const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://khanSalmaan:Salmaan786@newcluster.fzkg6ri.mongodb.net/test")
    .then(() => {
        console.log("Data Base Connected");
    })
    .catch(err => {
        console.log("Oh!! Database did not connect");
        console.log(err);
    })

const gameSchema = new mongoose.Schema({
    title: String,
    creator: String,
    width: Number,
    height: Number,
    fileName: String,
    thumbnailFile: String
});

const Game = mongoose.model("Game", gameSchema);

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));;

app.get('/', (req, res) => {
    res.render('components/home');
});

app.get('/game/:title/:creator/:width/:height/:fileName/:thumbnailFile', (req, res) => {
    const title = req.params.title;
    const creator = req.params.creator;
    const width = req.params.width;
    const height = req.params.height;
    const fileName = req.params.fileName;
    const thumbnailFile = req.params.thumbnailFile;
    res.render('components/game', { title, creator, width, height, fileName, thumbnailFile });
});


//Route to see all the gamesList
app.get('/list', (req, res) => {
    //game list
    Game.find({}, (error, games) => {
        if (error) {
            console.log("Problem in retreiving the data from the database")
        } else {
            res.render('components/list', { gamesData: games });
        }
    });
})


app.get('/addgame', (req, res) => {
    res.render('components/addgame');
});

app.post('/addgame', (req, res) => {
    const data = req.body;
    Game.create({
        title: data.title,
        creator: data.creator,
        width: data.width,
        height: data.height,
        fileName: data.fileName,
        thumbnailFile: data.thumbnailFile
    }, (error, data) => {
        if (error) {
            console.log("Data cannot be added in the database");
        } else {
            console.log("Data successfully added iin the database!!");
            console.log(data)
        }
    });
    res.redirect('/list');
})

app.listen(3000, () => {
    console.log('Gamming website is listening on port 3000')
});
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.get('/', (req, res) => {
    res.render('components/home');
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

//route to add a new game 
app.post('/addgame', (req, res) => {

    const data = req.body;
    //variable for representation of files
    const gameFile = req.files.gameFile;
    const imageFile = req.files.imageFile;

    //calling the methods to save the files in the respected folder
    gameFile.mv('public/games/' + gameFile.name, function (error) {
        if (error) {
            console.log("Couldn't upload the game file");
            console.log(error);
        } else {
            console.log("Game file succesfully uploaded");
        }
    });
    imageFile.mv('public/games/thumbnails/' + imageFile.name, function (error) {
        if (error) {
            console.log("Couldn't upload the image file");
            console.log(error);
        } else {
            console.log("Image file succesfully uploaded");
        }
    });

    Game.create({
        title: data.title,
        creator: data.creator,
        width: data.width,
        height: data.height,
        fileName: gameFile.name,
        thumbnailFile: imageFile.name
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



app.get('/game/:id', (req, res) => {
    const id = req.params.id;
    Game.findById(id, (error, foundGame) => {
        if (error) {
            res.send("Error!! Id not found in the database");
        } else {
            res.render('components/game', {
                title: foundGame.title,
                creator: foundGame.creator,
                width: foundGame.width,
                height: foundGame.height,
                fileName: foundGame.fileName,
                thumbnailFile: foundGame.thumbnailFile
            })
        }
    })
});

app.get('/game/:id/edit', (req, res) => {
    const id = req.params.id;
    const gameFound = Game.findById(id)
    res.render('components/editgame', { gameFound })
})


app.listen(3000, () => {
    console.log('Gamming website is listening on port 3000')
});
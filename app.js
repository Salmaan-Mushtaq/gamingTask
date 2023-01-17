const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');

// mongoose.connect('mongodb://localhost:27017/gameDB')
//     .then(() => {
//         console.log("CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("OH NO ERROR!!!");
//         console.log(err)
//     })
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));;

app.get('/', (req, res) => {
    res.render('components/home');
});

const gamesData = [
    {
        title: "Learn to Fly 2",
        creator: "light_bringer777",
        width: 640,
        height: 480,
        fileName: "learntofly2.swf",
        thumbnailFile: "Learn_To_Fly_2.jpg"
    },
    {
        title: "Run 3",
        creator: "player_03",
        width: 800,
        height: 600,
        fileName: "run3.swf",
        thumbnailFile: "run3.jpg"
    },
    {
        title: "Continuity",
        creator: "glimajr",
        width: 640,
        height: 480,
        fileName: "continuity.swf",
        thumbnailFile: "booty.png"
    }
]

app.get('/game/:title/:creator/:width/:height/:fileName/:thumbnailFile', (req, res) => {
    const title = req.params.title;
    const creator = req.params.creator;
    const width = req.params.width;
    const height = req.params.height;
    const fileName = req.params.fileName;
    const thumbnailFile = req.params.thumbnailFile;
    res.render('components/game', { title, creator, width, height, fileName, thumbnailFile });
})


//Route to see all the gamesList
app.get('/list', (req, res) => {
    //game list
    res.render('components/list', { gamesData });
})


app.get('/addgame', (req, res) => {
    res.render('components/addgame');
});

app.post('/addgame', (req, res) => {
    const data = req.body;
    gamesData.push(data);
    res.redirect('list');
})

app.listen(3000, () => {
    console.log('Gamming Website has started on port 3000')
});
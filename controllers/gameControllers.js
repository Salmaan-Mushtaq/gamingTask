const Game = require('../models/game');
const game_index = (req, res) => {
    res.render('components/home');
}

const game_list = (req,res)=>{
       //game list
       Game.find({}, (error, games) => {
        if (error) {
            console.log("Problem in retreiving the data from the database")
        } else {
            res.render('components/list', { gamesData: games });
        }
    });
}
const game_addgame = (req,res)=>{
    res.render('components/addgame');
}
const game_addgame_post = (req,res)=>{
    const data = req.body;

    //variable for representation of files
    const gameFile = req.files.gameFile;
    const imageFile = req.files.imageFile;

    //calling the methods to save the files in the respected folder
    gameFile.mv('public/games/' + gameFile.name, (error) => {
        if (error) {
            console.log("Couldn't upload the game file");
            console.log(error);
        } else {
            console.log("Game file succesfully uploaded");
        }
    });
    imageFile.mv('public/games/thumbnails/' + imageFile.name, (error) => {
        if (error) {
            console.log("Couldn't upload the image file");
            console.log(error);
        } else {
            console.log("Image file succesfully uploaded");
        }
    });
    //creatiing the game
    Game.create({
        ...data, fileName: gameFile.name, thumbnailFile: imageFile.name
    }, (error, data) => {
        if (error) {
            console.log("Data cannot be added in the database");
        } else {
            console.log("Data successfully added iin the database!!");
            console.log(data)
        }
    });
    res.redirect('/game');
}
const game_id = (req,res)=>{
    const id = req.params.id;
    Game.findById(id, (error, foundGame) => {
        if (error) {
            res.send("Error!! Id not found in the database");
        } else {
            res.render('components/game', { foundGame: foundGame })
        }
    })
}
const game_id_edit = (req,res)=>{
    const id = req.params.id;
    Game.findById(id, (error, foundGame) => {
        if (error) {
            res.send("Error!! Id not found in the database");
        } else {
            res.render('components/editgame', { foundGame: foundGame });
        }
    });
}

const game_id_update = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Game.findByIdAndUpdate(id, { ...body }, (error, updateGame) => {
        if (error) {
            console.log("Game not updated")
            console.log(error)
        } else {
            res.redirect('/game');
            console.log(updateGame);
        }
    });
}
const game_id_delete = (req, res) => {
    const id = req.params.id;
    Game.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log("Got an error");
        } else {
            console.log("Game deleted succesfully!!");
            res.redirect('/game')
        }
    });
}
module.exports ={
    game_index,
    game_list,
    game_addgame,
    game_addgame_post,
    game_id,
    game_id_edit,
    game_id_update,
    game_id_delete
}
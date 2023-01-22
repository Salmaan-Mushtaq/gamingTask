const express = require('express');
const gameControllers = require('../controllers/gameControllers')
const router = express.Router();

/* ---Code for home Start--- */
router.get('/', gameControllers.game_index);

//Route to see all the gamesList
router.get('/game', gameControllers.game_list);

/* ---Addgame render Code Start--- */
router.get('/game/addgame', gameControllers.game_addgame);

/* --Adding New Game Code Start-- */
router.post('/game/addgame', gameControllers.game_addgame_post);

/* --Details of game Code Start-- */
router.get('/game/:id', gameControllers.game_id);

/* --Edit the selected Game Code Start-- */
router.get('/game/:id/edit', gameControllers.game_id_edit);

/* --Update the selected Game Code Start-- */
router.post('/game/:id/update', gameControllers.game_id_update);

/* --Delete the selected Game Code Start-- */
router.get('/game/:id/delete', gameControllers.game_id_delete);

module.exports = router;
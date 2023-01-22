const express = require('express');
const gameControllers = require('../controllers/gameControllers')
const Game = require('../models/game');
const router = express.Router();

/* ---Code for home Start--- */
router.get('/', gameControllers.game_index);
/* ---Code for home End--- */

//Route to see all the gamesList
/* --List Games Code Start-- */
router.get('/game', gameControllers.game_list)
/* --List Games Code End-- */

/* ---Addgame render Code Start--- */
router.get('/game/addgame', gameControllers.game_addgame)
/* ---Addgame render Code End--- */


/* --Adding New Game Code Start-- */
router.post('/game/addgame', gameControllers.game_addgame_post);
/* --Adding New Game Code End-- */

/* --Details of game Code Start-- */
router.get('/game/:id', gameControllers.game_id)
/* --Details of Game Code End-- */

/* --Edit the selected Game Code Start-- */
router.get('/game/:id/edit', gameControllers.game_id_edit)
/* --Edit the selected Game Code End-- */

/* --Update the selected Game Code Start-- */
router.post('/game/:id/update', gameControllers.game_id_update);
/* --Update the selected Game Code End-- */

/* --Delete the selected Game Code Start-- */
router.get('/game/:id/delete', gameControllers.game_id_delete);
/* --Delete the selected Game Code End-- */

module.exports = router;
var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var Hotels_controller = require('../controllers/Hotels');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/Hotels', Hotels_controller.Hotels_create_post);
// DELETE request to delete Costume.
router.delete('/Hotels/:id', Hotels_controller.Hotels_delete);
// PUT request to update Costume.
router.put('/Hotels/:id', Hotels_controller.Hotels_update_put);
// GET request for one Costume.
router.get('/Hotels/:id', Hotels_controller.Hotels_detail);
// GET request for list of all Costume items.
router.get('/Hotels', Hotels_controller.Hotels_view_all_Page);
/* GET create costume page */
router.get('/create', Hotels_controller.Hotels_create_Page);
module.exports = router;
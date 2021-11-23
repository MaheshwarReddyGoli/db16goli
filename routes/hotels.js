var express = require('express');
var router = express.Router();

const Hotels_controlers = require('../controllers/Hotels');
var router = express.Router();
// A little function to check if we have an authorized user and continue on
// or
// redirect to login.
const secured = (req, res, next) => {
        if (req.user) {
            return next();
        }
        req.session.returnTo = req.originalUrl;
        res.redirect("/login");
    }
    /* GET update costu
    /* GET costumes */
router.get('/', Hotels_controlers.Hotels_view_all_Page);
router.get('/detail', Hotels_controlers.Hotels_view_one_Page);
/* GET create costume page */
router.get('/create',secured, Hotels_controlers.Hotels_create_Page);
/* GET create update page */
router.get('/update',secured, Hotels_controlers.Hotels_update_Page);
/* GET create costume page */
router.get('/delete',secured, Hotels_controlers.Hotels_delete_Page);
module.exports = router;
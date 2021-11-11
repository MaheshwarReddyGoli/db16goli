var Hotels = require('../models/Hotels');
//for a specific Costume.

exports.Hotels_list = async function(req, res) {
    try {
        theHotels = await Hotels.find();
        res.send(theHotels);
    } catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};

// exports.Hotels_detail = function(req, res) {
// res.send('NOT IMPLEMENTED: Hotels detail: ' + req.params.id);
// };

exports.Hotels_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Hotels.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

exports.Hotels_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Hotels();

    document.roomType = req.body.roomType;
    document.price = req.body.price;
    document.location = req.body.location;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        // res.error(500,`{"error": ${err}}`);
        res.status(500)
        res.send(`{"error": Error creating ${err}}`);
    }
};

// exports.Hotels_delete = function(req, res) {
// res.send('NOT IMPLEMENTED: Hotels delete DELETE ' + req.params.id);
// };
// Handle Costume delete on DELETE.
exports.Hotels_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Hotels.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// exports.Hotels_update_put = function(req, res) {
// res.send('NOT IMPLEMENTED: Hotels update PUT' + req.params.id);
// };

exports.Hotels_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Hotels.findById(req.params.id)
            // Do updates of properties        
        if (req.body.roomType)
            toUpdate.roomType = req.body.roomType;
        if (req.body.price)
            toUpdate.price = req.body.price;
        if (req.body.location)
            toUpdate.location = req.body.location;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};
// Handle a show one view with id specified by query
exports.Hotels_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Hotels.findById(req.query.id)
        res.render('HotelDetail', { title: 'Hotel Detail', toShow: result });
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.Hotels_view_all_Page = async function(req, res) {
    try {
        theHotels = await Hotels.find();
        res.render('Hotels', { title: 'Hotels Search Results', results: theHotels });
    } catch (err) {
        res.error(500, `{"error": ${err}}`);
    }

};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.Hotels_create_Page = function(req, res) {
    console.log("create view")
    try {
        res.render('Hotelcreate', { title: 'Hotels Create' });
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


// Handle building the view for updating a costume.
// query provides the id
exports.Hotels_update_Page = async function(req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Hotels.findById(req.query.id)
        res.render('Hotelupdate', { title: 'Hotels Update', toShow: result });
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
// Handle a delete one view with id from query
exports.Hotels_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await Hotels.findById(req.query.id)
        res.render('Hoteldelete', { title: 'Hotel Delete', toShow: result });
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
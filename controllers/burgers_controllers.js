var express = require("express");

var burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var burgObject = {
            burgers: data
        };
        console.log(burgObject);
        res.render("index", burgObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result) {
        res.json({ id: result.insertId});
    }); 
});

// //Need to figure out how to tie in "Devour" button onclick to delete burger
// router.delete("/api/burgers/:id"), function(req, res) {
//     var condition = "id = " + req.params.id;

//     burgers.delete(condition, function(result) {
//         if () {
//             return 
//         }
//     })
// }
module.exports = router;
var orm = require("../config/orm.js");

var burgers = {
        selectAll: function(cb) {
          orm.selectAll("burgers", function(res) {
            cb(res);
          });
        },
        // The variables cols and vals are arrays.
        create: function(name, cb) {
          orm.insertOne("burgers",[
              "burger_name", "devoured"
          ],[
              name,false
          ], function(res) {
            cb(res);
          });
        },
        update: function(objColVals, condition, cb) {
          orm.updateOne("burgers", objColVals, condition, function(res) {
            cb(res);
          });
        },
        delete: function(condition, cb) {
          orm.delete("burgers", condition, function(res) {
            cb(res);
          });
        }
      };

module.exports = burgers;
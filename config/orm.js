const connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
    
    return arr.toString();
  }
  

//Need some help here with the methods
var orm = {
    selectAll: function(tableInsert, cb) {
        var queryString = "SELECT * FROM " + tableInsert + ";";
        connection.query(queryString, function(err, res){
            if (err) {
                throw err;
            }
            cb(res);
        });

    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        // matches seeds.sql format
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        
        console.log(queryString);
        connection.query(queryString, function(err, res){
            if (err) {
                throw err;
            }
            cb(res)
        });
    },

    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        //Need somthing here

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, res){
            if (err) {
                throw err;
            }
            cb(res);
        });
    },

    delete: function(table, condition, cb) {
      var queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;

      connection.query(queryString, function(err, res) {
        if (err) {
          throw err;
        }

        cb(res);
      });
    }
};

    
module.exports = orm;
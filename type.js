module.exports = function () {
  var express = require('express');
  var router = express.Router();

router.get('/', function (req, res) {
  var mysql = req.app.get('mysql');
  var sql = "SELECT * FROM Type";
  var inserts = [];
  var context = {};
  var callbackCount = 0;
  mysql.pool.query(sql, inserts, function (error, results, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.status(400);
      res.end();
    } else {
      res.status(200);
    }
    context.type = results;
    complete();
  })

  function complete() {
    callbackCount++;
    if (callbackCount >= 1) {
      console.log(context);
      res.render('type', context);
    }
  }
})

router.post('/', function (req, res) {
  console.log('HELLO?');
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO Type (type_name, weak_against, strong_against) VALUES (?,?,?)";
  var inserts = [req.body.type_name, req.body.weak_against, req.body.strong_against];
  mysql.pool.query(sql, inserts, function (error, results, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.write(JSON.stringify(error));
      res.end();
    } else {
      res.redirect('/type');
    }
  })
})

router.delete('/delete', function(req, res) {
  var mysql = req.app.get('mysql'); 
  var sql = "DELETE FROM Type WHERE type_id=?";
  var inserts = [req.query.type_id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
       res.write(JSON.stringify(error)); 
         res.status(400); 
       res.end(); 
      } else{
        res.status(202).end();
      }
    })
  })

return router;
}();
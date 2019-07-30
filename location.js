module.exports = function () {
  var express = require('express');
  var router = express.Router();

router.get('/', function (req, res) {
  var mysql = req.app.get('mysql');
  var sql = "SELECT * FROM Location";
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
    context.location = results;
    complete();
  })

  function complete() {
    callbackCount++;
    if (callbackCount >= 1) {
      console.log(context);
      res.render('location', context);
    }
  }
})

router.post('/', function (req, res) {
  console.log('HELLO?');
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO Location (loc_name, loc_gym, loc_pc) VALUES (?,?,?)";
  var inserts = [req.body.loc_name, req.body.loc_gym, req.body.loc_pc];
  mysql.pool.query(sql, inserts, function (error, results, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.write(JSON.stringify(error));
      res.end();
    } else {
      res.redirect('/location');
    }
  })
})

router.delete('/delete', function(req, res) {
  var mysql = req.app.get('mysql'); 
  var sql = "DELETE FROM Location WHERE loc_id=?";
  var inserts = [req.query.loc_id];
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
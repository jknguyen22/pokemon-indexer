module.exports = function () {
  var express = require('express');
  var router = express.Router();

router.get('/', function (req, res) {
  var mysql = req.app.get('mysql');
  var sql = "SELECT * FROM PokemonBall";
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
    context.pokemonball = results;
    complete();
  })

  function complete() {
    callbackCount++;
    if (callbackCount >= 1) {
      console.log(context);
      res.render('pokemonball', context);
    }
  }
})

router.post('/', function (req, res) {
  console.log('HELLO?');
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO PokemonBall (pb_name, pb_cost) VALUES (?,?)";
  var inserts = [req.body.pb_name, req.body.pb_cost];
  mysql.pool.query(sql, inserts, function (error, results, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.write(JSON.stringify(error));
      res.end();
    } else {
      res.redirect('/pokemonball');
    }
  })
})

router.put('/:id', function(req, res){
  var mysql = req.app.get('mysql');
        var sql = "UPDATE PokemonBall SET pb_cost=? WHERE pb_id=?";
        var inserts = [req.body.pb_cost, req.params.pb_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
        res.redirect('/pokemonball');
            }
        });
})

router.delete('/delete', function(req, res) {
  var mysql = req.app.get('mysql'); 
  var sql = "DELETE FROM PokemonBall WHERE pb_id=?";
  var inserts = [req.query.pb_id];
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
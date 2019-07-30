/*update people */
/*delete people */

module.exports = function () {
  var express = require('express');
  var router = express.Router();

  //add pokemon
  router.get('/', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "SELECT * FROM Pokemon";
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
      context.pokemon = results;
      complete();
    })

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        console.log(context);
        res.render('pokemon', context);
      }
    }
  })
  router.post('/', function (req, res) {
    console.log('HELLO?');
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Pokemon (p_no, p_name, p_catchrate) VALUES (?,?,?)";
    var inserts = [req.body.p_no, req.body.p_name, req.body.p_catchrate];
    mysql.pool.query(sql, inserts, function (error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/pokemon');
      }
    })
  })

 //update pokemon
  router.get('/:id', function(req, res){
  	callbackCount = 0;
  	var context = {};
  	context.jsscripts = ["updatepokemon.js"];
  	var mysql = req.app.get('mysql');
  	function complete(){
  		callbackCount++;
  		if(callbackCount >= 1){
  			res.render('update-pokemon', context);
  		}
  	}
  });

  router.put('/:id', function(req, res){
  	var mysql = req.app.get('mysql');
  	console.log(req.body)
  	console.log(req.params.p_id)
  	var sql = "UPDATE Pokemon SET p_name=?, p_catchrate=?";
  	var inserts = [req.body.p_name, req.body.p_catchrate, req.params.p_id];
  	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
  		if(error){
  			console.log(error)
  			res.write(JSON.stringify(error));
  			res.end();
  		} else {
  			res.status(200);
  			res.end();
  		}
  	});
  });

  //delete pokemon
  router.delete('/delete', function(req, res) {
  var mysql = req.app.get('mysql'); 
  var sql = "DELETE FROM Pokemon WHERE p_id=?";
  var inserts = [req.query.p_id];
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
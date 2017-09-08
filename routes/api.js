var router = require('express').Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('demodb01.sqlite');

router.get('/playersAll', function (req, res, next) {
  try {
    var posts = db.all('SELECT * FROM player p', function(err, rows) {
      res.send(rows);
    });
  } catch (err) {
    next(err);
  }
});

router.get('/playersActive', function(req, res, next) {
  try {
    var posts = db.all('SELECT * FROM players p WHERE p.selected = true', function(err, rows) {
      res.send(rows);
    })
  } catch (err) {
    next(err);
  }
});

router.get('/pitchers', function (req, res, next) {
  try {
    var posts = db.all('SELECT l.id as id, p.name as player_name , l.datetime as date FROM log l LEFT JOIN player p ON l.player_id = p.id WHERE l.action = 1 ORDER BY l.datetime DESC;',
    function(err, rows) {
      res.send(rows);
    });
  } catch (err) {
    next(err);
  }
});

router.get('/players', function (req, res, next) {
  try {
    var posts = db.all('SELECT p.id, p.name, p.selected, (SELECT COUNT(*) FROM log l WHERE l.player_id = p.id AND l.action = 1) AS nr_of_pitchers FROM player p;SELECT p.id, p.name, p.selected, (SELECT COUNT(*) FROM log l WHERE l.player_id = p.id AND l.action = 1) AS nr_of_pitchers FROM player p;',
    function(err, rows) {
      res.send(rows);
    });
  } catch (err) {
    next(err);
  }
});

router.post('/player', function (req, res, next) {
    try {
    var playerName = req.body.player_name;
    db.run("INSERT INTO player (name, selected) VALUES (?, 0)", playerName);
    res.send({"succes": 1});
  } catch (err) {
    next(err);
  }
});

router.post('/playerremove', function (req, res, next) {
    try {
    var playerName = req.body.player_name;
    db.run("DELETE SELECT", playerName);
    res.send({"succes": 1});
  } catch (err) {
    next(err);
  }
});

router.get('/logs', function (req, res, next) {
  try {
    var posts = db.all('SELECT * FROM log', function(err, rows) {
      res.send(rows);
    });
  } catch (err) {
    next(err);
  }
});

router.post('/log', function(req, res, next) {
  var d = new Date();
  var playerId = req.body.player_id;
  db.run("INSERT INTO log (player_id, datetime, action) VALUES (?, ?, 1)", playerId, d.toString());
  res.send({"succes": 1});
});

module.exports = router

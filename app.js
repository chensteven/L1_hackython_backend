const express = require('express');
const app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('hackython.db');
const port = process.env.PORT || 8081 //Connect to Heroku

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

exec("sqlite3 hackython.db < initDB.sql", puts);

app.listen(port, () => console.log(`Server started on port ${port}`));

app.get('/', function(req, res) {
    res.send('Home Page');
});

// Get All Users
app.get('/users', function(req, res) {
    // get from SQL
    console.log('/users');
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.log('Error', err);
        }
        console.log(rows);
        res.send(rows);
    });
});

// Get An User
app.get('/users/:id', function(req, res) {
    // get from SQL
    let query = "SELECT * FROM `users` WHERE user_id = '" + req.params.id + "'";
    console.log(query);
    db.all(query, (err, rows) => {
        if (err) {
            console.log('Error', err);
        }
        console.log(rows);
        res.send(rows);
    });
});

// Get a relationship
app.get('/relationships', function(req, res) {
    // get from SQL
    let query = "SELECT * FROM `relationships`";
    console.log(query);
    db.all(query, (err, rows) => {
        if (err) {
            console.log('Error', err);
        }
        console.log(rows);
        res.send(rows);
    });
});
// Create a relationship
app.post('/relationships/', upload.array(), function(req, res, next) {
    console.log(req.body);
    let query = "SELECT * FROM `relationships` WHERE user_one_id = '" + req.body.user_one_id + "' AND user_two_id = '" + req.body.user_two_id+ "' ";
    console.log(query);
    db.all(query, (err, rows) => {
        if (err) {
            console.log('Error', err);
        }
        if (rows.length) {
            console.log(rows);
            query = "UPDATE `relationships` SET frequency = frequency + 1 WHERE user_one_id = '" + req.body.user_one_id + "' AND user_two_id = '" + req.body.user_two_id+ "' ";
            console.log(query);
            db.run(query, (err) => {
                if (err) {
                    console.log('Error', err);
                }
                console.log('Update completed');
                res.send('Updated completed');
            });
        }
        else {
            let frequency = 1;
            query = "INSERT INTO `relationships` (user_one_id, user_two_id, frequency) VALUES ('" +req.body.user_one_id+ "', '" +req.body.user_two_id+"', '"+frequency+"');"
            console.log(query);
            db.run(query, (err) => {
                if (err) {
                    console.log('Error', err);
                }
                console.log('Insert completed');
                res.send('Insert completed');
            });
        }
    });
});
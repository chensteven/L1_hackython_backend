const express = require('express');
const app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('hackython.db');
const port = process.env.PORT || 8081 //Connect to Heroku

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

exec("sqlite3 hackython.db < initDB.sql", puts);

app.listen(port, () => console.log(`Server started on port ${port}`));

app.get('/', function(req, res) {
    res.send('Home Page');
});

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
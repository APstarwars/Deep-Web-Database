const mysql = require('mysql');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

var con = mysql.createConnection({
	host: "localhost",
	user: "mvonblan_cs355fl20",
	password: "vo7615745"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.redirect('/index.html');
});

app.listen(port, () => {console.log(`Listening on http://blue.cs.sonoma.edu:${port}/`)});

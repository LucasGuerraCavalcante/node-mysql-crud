const express = require('express');
// const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
// const path = require('path');
const app = express();

// const router = require('express').Router();

const { getHomePage, getEmployee, deleteEmployee, updateEmployee, registerEmployee } = require('./routes/index');

const port = 8000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'mysql'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;

app.set('port', process.env.port || port);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

app.get('/', getHomePage);
app.get('/search', getEmployee);

app.get('/delete', deleteEmployee);
app.get('/update', updateEmployee);

app.get('/register', registerEmployee);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});



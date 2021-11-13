const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')
const html2canvas = require('html2canvas');
const jspdf = require('jspdf');

const User = require('./models/users');

const db_username = process.env.DB_USER;
const db_password = process.env.DB_PASS;
const db_cluster = process.env.DB_CLUSTER;
const db_name = process.env.DB_NAME;
const key_session = process.env.SESSION_KEYWORD;

mongoose.connect(
    `mongodb+srv://${db_username}:${db_password}@${db_cluster}.mongodb.net/${db_name}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => console.log('Connected to Main Database'))
    .catch((err) => console.log(err));

app.engine('hbs', hbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: key_session,
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new localStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) return done(err);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) return done(err);
            if (res === false) return done(null, false, { message: 'Incorrect password.' });
            return done(null, user);
        })
    })
    active_user = username;
    const user_log = mongoose.createConnection(
        `mongodb+srv://${db_username}:${db_password}@${db_cluster}.mongodb.net/${active_user}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    console.log('Connected to ' + active_user + '\'s Database')

    const CustomerSchema = new mongoose.Schema({
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        adress: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zip_code: {
            type: Number,
            required: true
        },
        phone_number: {
            type: Number,
            required: true
        }
    });

    Customer = user_log.model('Customer', CustomerSchema);
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}

// Routes

// MAIN PAGES

app.get('/', isLoggedIn, (req, res) => {
    res.render("client_file", { title: "Batisys", current_user: active_user });
});

app.get('/settings', isLoggedIn, (req, res) => {
    res.render("settings", { title: "Paramètres" });
});

// LOGIN AND REGISTRATION

app.get('/login', isLoggedOut, (req, res) => {
    const response = {
        title: "Login",
        error: req.query.error
    }
    res.render('login', response);
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?error=true',
}));

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/register', isLoggedOut, (req, res) => {
    res.render("register", { title: "Register" });
});

app.post('/register', function (req, res) {
    user = req.body.new_username;
    pass = req.body.new_password;
    const new_user = user;
    const new_password = pass;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(new_password, salt, function (err, hash) {

            const newAdmin = new User({
                username: new_user,
                password: hash
            });

            newAdmin.save();
            res.redirect('/login');
        });
    });
});

// CSS EDITOR

app.get('/valid', isLoggedIn, (req, res) => {
    res.render("settings", { title: "Paramètres" });
});

app.post('/valid', isLoggedIn, (req, res, next) => {

    let data = req.body.css_file;

    fs.writeFile('./public/main.css', data, (err) => {
        if (err) throw err;
    });
    res.redirect('/settings');
});

app.get('/cancel', isLoggedIn, (req, res) => {
    res.redirect('/settings');
});

app.get('/new_estimate', isLoggedIn, (req, res) => {
    res.render("devis", { title: "Nouveau Devis" });
});

// CUSTOMER FORMS

app.get('/new_client', (req, res) => {
    res.render('new_client', { title: "Nouveau client" });
});

app.post('/add_customer', function (req, res) {
    new_first = req.body.customer_first_name;
    new_last = req.body.customer_last_name;
    new_mail = req.body.customer_email;
    new_phone = req.body.customer_number;
    new_adress = req.body.customer_adress;
    new_zip = req.body.customer_zip;
    new_city = req.body.customer_city;

    const newCustomer = new Customer({
        first_name: new_first,
        last_name: new_last,
        email: new_mail,
        phone_number: new_phone,
        adress: new_adress,
        zip_code: new_zip,
        city: new_city
    });

    newCustomer.save();
    res.redirect('/settings');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
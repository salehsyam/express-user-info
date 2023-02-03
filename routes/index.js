const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

// path Data files
const p = path.resolve(__dirname, '../', 'data', 'users.json');

// get All Users

router.get('/', (req, res) => {
  fs.readFile(p, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }

    let userList = JSON.parse(data);
    res.render('index', { userList, pageTitle: 'All Users' });
  });
});

// Search User
router.get('/search', (req, res) => {
  res.render('search', { pageTitle: 'Search User' });
});

// Search user

router.post('/search', (req, res) => {
  fs.readFile(p, 'utf-8', function (error, data) {
    if (error) {
      throw error;
    }
    let userList = JSON.parse(data);
    let searchResult = [];
    let searchTerm = req.body.userInput;
    for (let i = 0; i < userList.length; i++) {
      let fullName = userList[i].firstname + ' ' + userList[i].lastname;
      if (
        userList[i].firstname.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 ||
        userList[i].lastname.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 ||
        fullName.toLowerCase() === searchTerm.toLowerCase()
      ) {
        searchResult.push(userList[i]);
      }
    }
    res.render('results', { searchResult, pageTitle: 'Results' });
  });
});

// Search box autocomplete ajax request
router.post('/autocomplete', (req, res) => {
  fs.readFile(p, 'utf-8', function (error, data) {
    if (error) {
      throw error;
    }
    let userList = JSON.parse(data);
    let searchResult = [];
    let searchTerm = req.body.userInput;
    for (let i = 0; i < userList.length; i++) {
      let fullName = userList[i].firstname + ' ' + userList[i].lastname;
      if (
        userList[i].firstname.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 ||
        userList[i].lastname.toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1 ||
        fullName.toLowerCase() === searchTerm.toLowerCase()
      ) {
        searchResult.push(userList[i]);
      }
    }
    res.send(searchResult);
  });
});

// Results
router.get('/results', (req, res) => {
  res.render('results');
});

// Create new user
router.get('/create', (req, res) => {
  res.render('create', { pageTitle: 'Create User' });
});

router.post('/create', (req, res) => {
  fs.readFile(p, 'utf-8', function (error, data) {
    if (error) {
      throw error;
    }
    var userList = JSON.parse(data);
    var newUser = {
      firstname: req.body.FirstName,
      lastname: req.body.LastName,
      email: req.body.Email,
    };
    userList.push(newUser);
    var userJsonToString = JSON.stringify(userList, null, 2);

    fs.writeFile(p, userJsonToString, 'utf-8', function (error) {
      if (error) {
        throw error;
      }
    });
    res.redirect('/');
  });
});

module.exports = router;

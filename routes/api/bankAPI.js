const express = require('express');
const router = express.Router();

//Import db model
const users = require('../../models/bankDB');

// @route GET

router.get('/', (req, res) => {
    users.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
});

// @route POST Create new user

router.post('/', (req, res) => {
    const newUser = new users({
        Name: req.body.Name,
        AccNo: req.body.AccNo,
        Balance: req.body.Balance
    });

    newUser.save().then(users => res.json(users))
      .catch((err) => { if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username
                res.status(422).send({ succes: false, message: 'User already exist!' });
              } })
});

// @route Credit Balance

router.post('/update', (req, res) => {
    const filter = { AccNo : req.body.AccNo };
    const update = {$inc: {Balance: req.body.Balance }};
    
     users.countDocuments(filter);

     users.findOneAndUpdate(filter, update, {
        new: true,
        upsert: false,
        useFindAndModify: false 
    })
        .then(users => res.json(users));
})

// @route Debit
router.post('/debit', (req, res) => {
    const filter = { AccNo : req.body.AccNo,Balance: {$gte: req.body.Balance} };
    const update = {$inc: {Balance: -req.body.Balance }};
    
     users.countDocuments(filter);

     users.findOneAndUpdate(filter, update, {
        new: true,
        upsert: false,
        useFindAndModify: false 
    })
        .then(users => res.json(users));
})

module.exports = router;
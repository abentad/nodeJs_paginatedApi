const router = require('express').Router();
const utils = require('../utils');
const user = require('../model/user_model');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/userer', ()=> console.log('connected to DB'));
const db = mongoose.connection;
//runs only once when the db is opened for the first time

db.once('open', async ()=>{
    //returns the length of the user document
    if(await user.countDocuments().exec() > 0) return 
    Promise.all([
        user.create({name: "user 1"}),
        user.create({name: "user 2"}),
        user.create({name: "user 3"}),
        user.create({name: "user 4"}),
        user.create({name: "user 5"}),
        user.create({name: "user 6"}),
        user.create({name: "user 7"}),
        user.create({name: "user 8"}),
        user.create({name: "user 9"}),
    ]).then(()=> console.log('first time: added users'));
});


router.get('/', utils.paginatedResults(user) ,(req,res)=>{
    res.json(res.paginatedResults);
});


module.exports = router;
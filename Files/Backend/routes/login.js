const router = require('express').Router();
const bcrypt = require('bcryptjs');

const UserLogin = require('../models/userLogin.model');
const AssetDetail = require('../models/assetDetail.model');

router.route('/check').get(async (req, res) => {

    const userID = req.body.userID;
    const enteredPassword = req.body.password;

    var query = {tokenID: userID};

    try{
        const result = await AssetDetail.findOne(query);
        res.json(result);
    }
    catch{
        res.status(400).json('Error matching credentials!');
    }
    
});



module.exports = router;
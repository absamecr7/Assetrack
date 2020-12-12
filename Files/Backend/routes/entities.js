
const router = require('express').Router();
let EntityDetail = require('../models/entityDetail.model');
let AssetDetail = require('../models/assetDetail.model');

router.route('/').get( async (req, res) => {

  try{
    const result = await EntityDetail.find(); 
    res.json(result); 
  }
  catch{
    res.status(400).json('Error: ' + err);
  }
}
);

router.route('/getCount').get( async (req, res) => {

  try{
    const result = await EntityDetail.find(); 
    res.json(result.length); 
  }
  catch{
    res.status(400).json('Error: ' + err);
  }
}
);

router.route('/getownedassets/:id').get(async (req, res) => {

    const query = {uid: req.params.id};

    try{
      const result = await EntityDetail.findOne(query);
      res.json(result.ownedAssets);
    }
    catch{
      res.status(400).json('Not able to retrieve assets of the given user id.');
    }

  }
);
  


router.route('/add').post((req, res) => {

  const username = req.body.username;
  const uid = req.body.uid;
  const company = req.body.company;
  const ownedAsset = req.body.ownedAsset;
  const phone = req.body.phone;
  //username,company,ownedAsset,phone

  const newEntity = new EntityDetail({
    username,
    uid,
    company,
    phone,
    ownedAsset
  });

  // {
  //   username: "abhishek",
  //   company: "company 1",
  //   ownedAsset: [123,23452,123],
  //   phone: 9898987676
  // }
  

  newEntity.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/find/:id').get(async (req, res) => {

  var query = {uid: req.params.id};

  try{
    const result = await EntityDetail.findOne(query);
    res.json(result);
  }
  catch{
    res.json(false);
    console.log("error finding!");
  }

  });


router.route('/moveAsset/:id/:e1_pn/:e2_pn').get((req, res) => {
  let query = {uid: req.params.id};
  
  AssetDetails.find(query)
    .then(asset => { 
      console.log(asset);  
      res.json(asset);})
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;





// {
// 	"username": "abcenterprises",
//     "uid": 4001,
//     "company":"ABC Enterprises",
//     "phone": "9865328590",
//     "ownedAsset": []
// }

// {
// 	"username": "pqrindustries",
//     "uid": 4002,
//     "company":"PQR Industries",
//     "phone": "7778528590",
//     "ownedAsset": []
// }

// {
// 	"username": "xyzindustries",
//     "uid": 4003,
//     "company":"XYZ Industries",
//     "phone": "8205528660",
//     "ownedAsset": []
// }
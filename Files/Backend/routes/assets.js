const router = require('express').Router();
const sha256 = require('sha256');


const AssetDetail = require('../models/assetDetail.model'); //THIS IS THE DOCUMENT MANIPULATOR ======> Collection Name: "AssetDetails" (with a 's')
const AssetData = require('../models/assetData.model');
const EntityDetail = require('../models/entityDetail.model');

//ALL OPERATIONS WOULD BE PERFORMED USIND THE MODEL IMPORTED.

router.route('/').get((req, res) => {

  AssetDetail.find()
    .then(assets => res.json(assets))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/transfer').post(async (req, res) => {

  const sender = req.body.sender;
  const receiverID = req.body.receiverID;
  const assetsToTransfer = req.body.assetsToTransfer;

  console.log('Sender: ',sender);
  console.log('Receiver: ',receiverID);
  console.log('Assets: ',assetsToTransfer);

  EntityDetail.updateOne(
      {uid: sender},
      {$pull: {ownedAssets: {$in: assetsToTransfer}}}
    ).then(
    (result) => {
        EntityDetail.updateOne(
          {uid: receiverID},
          {$push: {ownedAssets: {$each: assetsToTransfer}}}
        ).then(
          (resultIn) => {
            const reply = {
              isDone: true,
              message: `${assetsToTransfer.length} assets transferred from ${sender} to ${receiverID}.`
            };
            res.json(reply);
          },
          (e) => {
            const reply = {
              isDone: false,
              message: `Unable to transfer assets from ${sender} to ${receiverID}.`
            };
            res.status(400).json(reply);
          }
        );
    },
    (e) => {
      const reply = {
        isDone: false,
        message: `Unable to transfer assets from ${sender} to ${receiverID}.`
      };
      res.status(400).json(reply);
    }
  );
});

router.route('/add').post(async (req, res) => {

    const tokenID = req.body.tokenID;
    const description = req.body.description;
    const material = req.body.material;
    const dateCreated = req.body.dateCreated;
    const weight = req.body.weight;

    const vendorID = req.body.vendorID;

    //create a object to add in ASSETDETAILS COLLECTION
    const newAsset = new AssetDetail({
      tokenID,
      description,
      material,
      dateCreated,
      weight
    });

    try{
      const DetailResult = await newAsset.save(); //Save the details of the Asset

      const fetchAsset = await AssetDetail.findOne(
                                {tokenID: tokenID}
                              );

      const entityResult = await EntityDetail.updateOne(
                                                        {
                                                          uid: vendorID
                                                        },
                                                        {
                                                          $push: {
                                                                  ownedAssets: tokenID
                                                                }
                                                        }
                                                      ); //Add token to vendor owned asset.
  
    
      const resp = {
        message: `Asset with tokenID ${tokenID} added!, Entity ${vendorID} updated.`,
        result: entityResult,
        fetchAsset: fetchAsset
      }                                                  
      res.json(resp);
    }
      
    catch{
      res.status(400).json('Error saving asset: '+ tokenID  + err);
    }
    
  }

);

router.route('/addData').post(async (req, res) => {

  const tokenID = req.body.tokenID;
  const dataHash = req.body.dataHash;
  const ipfsHash = req.body.ipfsHash;

   //create a object to add in ASSETDATA COLLECTION
   const newAssetData = new AssetData({
    tokenID,
    dataHash,
    ipfsHash
  });

  try{
    const saveResult = await newAssetData.save();
    
    const resp = {
      message: "Successfully added asset data.",
      result: saveResult
    }

    res.json(resp);
  }
  catch{
    res.status(400).json('Error saving asset data.')
  }



});

router.route('/:id').get((req, res) => {

  AssetDetail.findById(req.params.id)
    .then(asset => res.json(asset))
    .catch(err => res.status(400).json('Error: ', err));
  }

);

router.route('/getipfs/:id').get((req, res) => {

    var query = {tokenID: req.params.id};

    AssetData.findOne(query)
      .then(asset => res.json(asset))
      .catch(err => res.status(400).json('Error finding asset details. ',err));

  }
);

router.route('/countDocuments').get((req,res) => {

  AssetDetail.find({})
    .then(assets => res.json(assets.length))
    .catch(err => res.status(400).json('Error: ', err));

});
  

router.route('/:id').delete((req, res) => {
  
  AssetDetail.findByIdAndDelete(req.params.id)
    .then(() => res.json('Asset deleted.'))
    .catch(err => res.status(400).json('Error deleting asset: ' + err));
  }

);

router.route('/update/:id').post((req, res) => {
  AssetDetail.findById(req.params.id)
    .then(asset => {
      asset.tokenID = req.body.tokenID;
      asset.description = req.body.description;
      asset.material = req.body.material;
      asset.dateCreated = asset.dateCreated;
      asset.weight = req.body.weight;

      asset.save()
        .then(() => res.json('Asset updated!'))
        .catch(err => res.status(400).json('Error updating asset: ' + err));
    })
    .catch(err => res.status(400).json('Error updating asset: ' + err));
});

module.exports = router;
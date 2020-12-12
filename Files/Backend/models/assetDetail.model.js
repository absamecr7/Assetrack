const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assetDetailsSchema = new Schema({
  tokenID: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  material: {
    type: String,
    required: true,
    trim: true
  },
  dateCreated: {
    type: String,
    required: false
  },
  weight: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
});

const AssetDetail = mongoose.model('AssetDetails', assetDetailsSchema);

//THE COLLECTION'S NAME WOULD BE THEE MODEL NAME => "ASSETDETAILS"

module.exports = AssetDetail;
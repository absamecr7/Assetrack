const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entityDetailsSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  uid: {
    type: Number,
    unique: true,
    minlength: 3
  },
  company: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  ownedAssets: {
    type: [],
    required: false
  }
}, {
  timestamps: true,
});

const EntityDetail = mongoose.model('EntityDetails', entityDetailsSchema);

module.exports = EntityDetail;
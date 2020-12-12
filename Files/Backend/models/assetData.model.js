const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assetDataSchema = new Schema({
    tokenID: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    dataHash: {
        type: String,
        required: true,
        trim: true
    },
    ipfsHash: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const assetDataDetail = mongoose.model('assetDataDetails', assetDataSchema);

module.exports = assetDataDetail;
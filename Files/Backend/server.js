const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const keys = require('./keys')

// require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = keys.mongoURI;
mongoose.connect(
  uri, {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

const connection = mongoose.connection;

console.log('before connection!');

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

console.log('after connection!');


const assetRouter = require('./routes/assets');
const enitiesRouter = require('./routes/entities');
const loginRouter = require('./routes/login');

app.use('/assets', assetRouter);
app.use('/entities', enitiesRouter);
app.use('/login', loginRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
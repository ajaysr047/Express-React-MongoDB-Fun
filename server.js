const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
const bankAPI = require('./routes/api/bankAPI');

app.use(bodyParser.json());

//DB URI
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true ,useCreateIndex: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//PORT
app.use(cors());
app.use('/api/bank', bankAPI);

const port = 3001;

app.listen(port, () => console.log('server started on port '+ port));
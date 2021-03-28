require('dotenv').config()
const router = require('./routes/router.js')
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.host || "5000" ;
const DB_URL = 'mongodb://localhost/studentsDB';

app.use('/', router);

mongoose.connect(DB_URL, { useNewUrlParser: true , useUnifiedTopology: true} )
    .then(() => {console.log('Connection Success')})
    .catch((err) => {console.log('Error to connect' + err)});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
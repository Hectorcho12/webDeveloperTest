const mongoose = require('mongoose');

const SchemaStudent = new mongoose.Schema({
    firstName : String,
    lastName : String,
    birthDate : Date,
    email : String,
    addres : String,
    gender : String
    
}, { collection: 'students' });

const Student = mongoose.model('Student',SchemaStudent);

module.exports = { Student}
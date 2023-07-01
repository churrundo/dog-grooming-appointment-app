const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name:{type: String, required: true},
    petType:{type: String, enum:["dog","cat"], required: true},
    petBreed:{type: String}  
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;

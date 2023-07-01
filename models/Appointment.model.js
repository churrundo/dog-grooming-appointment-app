const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    pet:{type: mongoose.Schema.ObjectId, ref: 'Pet'},
    serviceType: {type: String, enum: ["Bath","Haircut","Nail Trim"], required: true},
    price: {type: Number, required: true},
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

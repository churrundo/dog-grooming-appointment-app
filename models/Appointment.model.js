const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    title: { type: String, required: true },
    petType: { type: String, required: true },
    petBreed:{type: String},
    serviceType: {type: String, required: true},
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: { type: String, required: true },
    petType: { type: String, required: true },
    petBreed:{type: String},
    serviceType: {type: String, required: true},
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

const mongoose = require('mongoose');
const validator = require('validator');


const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Event must have a name'],
        trim: true,
    },
    reward: {
        type: String,
        required: [true, 'Event must have a reward'],
    },
    day: {
        type: Number,
        required: [true, 'Event must take place on a particular day'],
        enum: [0,1,2,3,4,5,6]                                  //Sunday -Saturday ( 0-6 )
    },
    time: {
        type: Date,
        required: [true, 'Event must take place at a particular time'],
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        unique: true
    }] 
});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
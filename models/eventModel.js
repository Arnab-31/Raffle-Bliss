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
    }],
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


eventSchema.methods.chooseWinner = async function() {                     
    
    var curDate = new Date();
    var dayGap =  this.day - curDate.getDay();
    var hourGap = this.time.getHours() - curDate.getHours();
    var minGap =  this.time.getMinutes() - curDate.getMinutes();

    if(hourGap > 0 || (hourGap == 0 && minGap > 0)){   //event is on current Day but at a later time so we dont adjust day gap if it is 0
        if(dayGap < 0 )  dayGap = dayGap + 7;
    }else{
        if(dayGap <= 0 ) dayGap = dayGap + 7;
    }
         

    console.log(dayGap + " " + hourGap + " " + minGap);
    var interval = (dayGap * 86400000) + (hourGap * 3600000) + (minGap * 60000);
    console.log(interval)
    const id = this._id;
    
    const findWinner = async () => {
        console.log(interval)
            console.log("Trying to find winner")
            const events = await Event.find({_id: id});
            const event = events[0];
            if(event.participants.length > 0){
                console.log("Selecting winner")
                var winnerIndex = getRandomInt(event.participants.length);
                event.winner = event.participants[winnerIndex];
                event.participants = [];
                console.log("Winner found - " + event.winner)
            }
     
            event.time.setDate(event.time.getDate() + 7)
            event.markModified('time');
            await event.save();
    
            interval = 7 * 86400000;
    }

    setTimeout( findWinner, interval);              //event occours for first time
    setInterval( findWinner, 7 * 86400000);         //after that event repeats after every 7 days
}


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
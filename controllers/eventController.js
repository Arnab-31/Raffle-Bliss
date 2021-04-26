const express = require('express')
const Event = require('../models/eventModel');
//const auth = require('../middleware/auth');

const createEvent =  async(req,res)=>{

    const name = req.body.name;
    const reward = req.body.reward;
    const day = req.body.time.day;
    const hours = req.body.time.hours;
    const min = req.body.time.min;

    const time = new Date();
    time.setHours(hours);
    time.setMinutes(min);

    const event = new Event({
        name,
        reward,
        day,
        time
    });

    try{
        await event.save();
        res.status(201).send(event);
    }catch(e){
        console.log(e)
        res.status(400).send(e);
    }
}

const getAllEvents =  async(req,res)=>{
    try{ 
        const events = await Event.find({})
        res.send(events);
    }catch(e)
    {
        res.status(500).send(e);
    }
}


const nextEvent =  async(req,res)=>{
    try{ 
        const events = await Event.find({})

        var dayGap = 6;
        var hourGap = 24;
        var minGap = 60;

        var curDate = new Date();
        var index;
        var count = 0;
        events.forEach(event => {
            var dayDif = event.day - curDate.getDay();
            if(dayDif < 0)
                dayDif = dayDif + 7;
            if((event.day - curDate.getDay())  < dayGap)
            {
                index = count;
                dayGap = event.day - curDate.getDay();
            }
                
        });
        res.send(events[index]);
    }catch(e)
    {
        console.log(e)
        res.status(500).send(e);
    }
}


const drawTicket = async (req,res)=> {

    try{ 
        const event = await Event.find({_id: req.params.id})
        console.log(event);
        event[0].participants.push(req.user._id);
        event[0].save();
        
        res.send({ticket: req.user._id});
    }catch(e)
    {
        console.log(e)
        res.status(500).send(e);
    }
}



module.exports = {
    createEvent,
    getAllEvents,
    nextEvent,
    drawTicket
}





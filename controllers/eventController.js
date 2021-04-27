const express = require('express')
const Event = require('../models/eventModel');
const User = require('../models/userModel');
//const auth = require('../middleware/auth');

const createEvent =  async(req,res)=>{

    const name = req.body.name;
    const reward = req.body.reward;
    const day = req.body.time.day;
    const hours = req.body.time.hours;
    const min = req.body.time.min;
    const participants = [];
    var dayGap;

    const time = new Date();
    dayGap = day - time.getDay();
    if(dayGap < 0)
        dayGap = dayGap + 6;

    time.setHours(hours);
    time.setMinutes(min);
    time.setDate(time.getDate() + dayGap);

    const event = new Event({
        name,
        reward,
        day,
        time,
        participants
    });

    try{
        await event.save();
        event.chooseWinner();
        res.status(201).send(event);

    }catch(e){
        console.log(e)
        res.status(400).send(e);
    }
}

const getAllEvents =  async(req,res)=>{
    try{ 
        const events = await Event.find({})
        events.forEach(event => {
            console.log(event.time.getDate());
        })
        res.send(events);
    }catch(e)
    {
        console.log(e)
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
        console.log(curDate.getDay());
        var index;
        var count = 0;
        events.forEach(event => {
            var dayDif = event.day - curDate.getDay();
            if(dayDif < 0)
                dayDif = dayDif + 7;
            if(dayDif  < dayGap)
            {
                index = count;
                dayGap = dayDif;
            }
            count++;
                
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

        if(!event[0].participants.includes(req.user._id)){
            console.log(event);
            event[0].participants.push(req.user._id);
            event[0].isNew = false;
            event[0].save();
            
            res.send({ticket: req.user._id});
        }
        else
            res.status(400).send({error: "User can only draw one ticket in an event"});
    }catch(e)
    {
        console.log(e)
        res.status(500).send(e);
    }
}

const winner = async (req,res)=> {
    try{ 
        const event = await Event.find({_id: req.params.id})
        const winner = await User.find({_id: event[0].winner})
        console.log(winner)
        res.send({winnerTicket: event[0].winner, 
            winnerName: winner[0].name
        });
    }catch(e)
    {
        console.log(e)
        res.status(500).send(e);
    }
}

const allWinners = async (req,res)=> {
    try{ 
        const events = await Event.find({})
        var winners = [];
        var count=0;
        for(var i=0;i<events.length;i++) {
            if(events[i].winner)
            {
            const Winner = await User.find({_id: events[i].winner});
            winners[count]={
                'event': events[i].name,
                'event_id': events[i]._id,
                'winnerTicket': events[i].winner, 
                'winnerName': Winner[0].name
            }
            count++;
        }}
        console.log(winners)
        res.send(winners);
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
    drawTicket,
    winner,
    allWinners
}





# Raffle_Bliss
A REST Api for taking part in weekly lucky draw event. The API can be used to create an event, get all upcoming events, get the next event, get the winner of a specific event, get winners of all events in the last week, draw a ticket in a event along with managing authentication of the user. A user can also create a account, login , logout and update hiis profile using the API. 
Live Demo of API: https://raffle-bliss-by-arnab.herokuapp.com


## Routes

### Create User - (POST) /signup

Use - Create a user account. 
Protection - None. 
Constraints - Email needs to be unique for every user. 


Request Body 
```
{
    "name": "Arnab",
    "email": "Arnab@gmail.com",
    "password": "34nnnsk123k"
}
```

Success Response
```
{
    "user": {
        "role": "user",
        "_id": "60891a24b1252c0015705281",
        "name": "Arnab",
        "email": "arnab@gmail.com",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg5MWEyNGIxMjUyYzAwMTU3MDUyODEiLCJpYXQiOjE2MTk1OTc4NjAsImV4cCI6MTYxOTYwMDg2MH0.VaJuIKutpUVIsmqaQksX8o2Pyp6kfmSd_4L8tn1EERU"
}
```
### Login User - (POST) /login

Use - User can login using email and password.
Protection - None



Request Body 
```
{
    "email": "arnab1@gmail.com",
    "password": "34nnnsk123k"
}
```

Success Response
```
{
    "msg": "You have been logged in successfully",
    "user": {
        "role": "user",
        "_id": "608955ebab02e70015816822",
        "name": "Arnab",
        "email": "arnab1@gmail.com",
        "__v": 2
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg5NTVlYmFiMDJlNzAwMTU4MTY4MjIiLCJpYXQiOjE2MTk2MTMyNjYsImV4cCI6MTYxOTYxNjI2Nn0.CCHJ4v9vDPFWyAZOShwAj6F9V2RJctwfu9555zlmgtY"
}
```

### Update User Profile - (PATCH) /update

Use - Update the profile of a user.
Protection - User must be authenticated



Request Body 
```
{
    "name":"Arnab2"
}
```

Success Response
```
{
    "role": "user",
    "_id": "608955ebab02e70015816822",
    "name": "Arnab2",
    "email": "arnab1@gmail.com",
    "__v": 2
}
```

### User Logout  - (POST) /logout

Use - Logs out a user.
Protection - User must be authenticated


Success Response
```
{
    "msg": "Successfully logged out"
}
```
### User Logout from All devices - (POST) /logoutAll

Use - Logs out a user from all devices.
Protection - User must be authenticated


Success Response
```
{
    "msg": "Successfully logged out from all devices"
}
```

### Create Event - (POST) /event

Use - Create a new lucky draw event.
Protection - User must be authenticated



Request Body ( day represents the day of week when the event will repeat and hours and time represent the exact time. day 0 is Sunday, day 6 is Saturday)
```
{
    "name": "Supreme Sunday",
    "reward": "Kindle",
    "time": {
        "day": 0,
        "hours": 22,
        "min": 0
    }
}
```

Success Response (time contains the Date object which stores the date and time when the event will happen next)
```
{
    "participants": [],
    "_id": "60895de638ebfe929c8b4a8f",
    "name": "Supreme Sunday",
    "reward": "Kindle",
    "day": 0,
    "time": "2021-05-01T16:30:46.927Z",
    "__v": 0
}
```

### Draw Ticket - (POST) /draw/:id

Use - Draw ticket in an event.
Protection - User must be authenticated.
Constraints - One user can not draw more than one ticket in an event


Success Response (ticket conatains a unique number assigned to each participant in the event)
```
{
    "ticket": "60895dd838ebfe929c8b4a8d"
}
```

### Next Event - (GET) /event

Use - Get the nearest event from the current time.
Protection - None

Success Response 
```
{
    "participants": [
        "60895dd838ebfe929c8b4a8d"
    ],
    "_id": "60895de638ebfe929c8b4a8f",
    "name": "Supreme Sunday",
    "reward": "Kindle",
    "day": 0,
    "time": "2021-05-01T16:30:46.927Z",
    "__v": 1
}
```

### All Events - (GET) /events

Use - Get all upcoming events.
Protection - None

Success Response 
```
[
    {
        "participants": [
            "60895dd838ebfe929c8b4a8d"
        ],
        "_id": "60895de638ebfe929c8b4a8f",
        "name": "Supreme Sunday",
        "reward": "Kindle",
        "day": 0,
        "time": "2021-05-01T16:30:46.927Z",
        "__v": 1
    },
    {
        "participants": [],
        "_id": "6089623f38ebfe929c8b4a90",
        "name": "Majestic Monday",
        "reward": "TV",
        "day": 1,
        "time": "2021-05-02T16:30:19.578Z",
        "__v": 0
    }
]
```

### Winner - (GET) /winner/:id

Use - Get the winner of the event having the given id.
Protection - None

Success Response 
```
{
    "winnerTicket": "60895dd838ebfe929c8b4a8d", 
    "winnerName": "Arnab"
}
```

### All Winners - (GET) /winners

Use - Get all winners of the last week.
Protection - None

Success Response 
```
[
    {
        "event": "Supreme Sunday",
        "event_id": "6089623f38ebfe929c8b4a90",
        "winnerTicket": "60895dd838ebfe929c8b4a8d", 
        "winnerName": "Arnab"
    },
    {
        "event": "Majestic Monday",
        "event_id":  6089623f38ebfe929c8b4a45,
        "winnerTicket": 60895dd838ebfe929c8b4a5a, 
        "winnerName": "Akash"
    }
}
```



## Tech Stack
 - Runtime Env - Node.js
 - Backend Framework - Express.js 
 - Database - Mongo DB
 - Deployment - Heroku



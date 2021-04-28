# Raffle_Bliss
A REST Api for taking part in weekly lucky draw event. The API can be used to create an event, get all upcoming events, get the next event, get the winner of a specific event, get winners of all events in the last week, draw a ticket in a event along with managing authentication of the user. A user can also create a account, login , logout and update hiis profile using the API. 
Live Demo of API: https://raffle-bliss-by-arnab.herokuapp.com


## Routes

### Create User - (POST) /signup

Use - Create a user account

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
- Upload Avatar - (POST) /user/me/avatar
- User Login - (POST) /user/login 
- User Logout -  (POST) /user/logout
- User Logout(All Devices) - (POST) /user/logoutAll
- Create Task - (POST) /task
- Read Profile - (GET) /user/me
- Read Tasks - (GET) /task?sortBy=createdAt:desc
- Read Task - (GET) /task/{:id}
- Update User - (PATCH) /user/me
- Update Task -  (PATCH) /user/{id}
- Delete User - (DELETE) /user/me
- Delete Avatar - (DELETE) /user/me/avatar
- Delete Task - (DELETE) /task/{:id}

## Tech Stack
 - Runtime Env - Node.js
 - Backend Framework - Express.js 
 - Database - Mongo DB
 - Emailing - SendGrid
 - API testing Framework - Jest
 - Deployment - Heroku



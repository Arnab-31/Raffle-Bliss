const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

//creating  a user account
const signup =  async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save();
        const token = await user.generateAuthToken();
        const filtered_user = user.toJSON()
        res.cookie('jwt', token, {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        });
        res.status(201).json({user:filtered_user, token})
    }catch(e){
        res.status(400).send(e);
    } 
}

//logging a user in
const login = async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('jwt', token, {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        });
        res.send({ msg: "You have been logged in successfully", user, token})
    }catch(e){
        res.status(400).send({ errors: [{msg: "Unable to login"}] });
    }
}

// check if user is authenticated
const isLoggedIn = async(req, res, next)=> {
    try{
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.header('Authorization').replace('Bearer ','');
        } else if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id:decoded._id, 'tokens.token': token})

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user;
        next()
    }catch(e){
        console.log(e);
        res.status(401).send({error: "You are not logged in! Kindly login first"})
    }

}

//logout a user 
const logout = async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save();

        res.send({"msg": "Successfully logged out"})
    }catch(e){
        res.status(500).send(e)
    }
}

//logout user from all devices
const logoutAll = async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save();
        res.send({"msg": "Successfully logged out from all devices"})
    }catch(e){
        res.status(500).send(e)
    }
}

//update details of a user
const userUpdate = async(req,res)=>{
    const updates = Object.keys(req.body)

    try{
        updates.forEach((update)=> req.user[update]=req.body[update])
        await req.user.save()
        
        res.send(req.user);
    }catch(e)
    {
        res.status(400).send(e);
    }
}


module.exports = {
    signup,
    login,
    logout,
    isLoggedIn,
    logoutAll,
    userUpdate
}
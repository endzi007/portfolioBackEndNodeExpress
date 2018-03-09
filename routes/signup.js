const User = require("../models/user.js");
const jwt = require("jwt-simple");
const config = require("../config");

// create token for user validation on signup using jwt-simple (json web token)
// token is generated based on user id and secret string
function tokenForUser(user){
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

// signup route --> handles /signup post request to create new users
// if user exits returns 422 status with message
// takes User as mongoose model to create new users

function signup (req, res, next) {
    const password = req.body.password;
    var email = req.body.email;
    if(password.length < 6 || email.length < 6){
        return res.status(422).send("password too short");
    }

    User.findOne({ email: email }, function(err, foundUser){
        //check if is error like no connection to database..
        if(err){
            return next(err);
        }

        //if user is found return status 422 with message
        if(foundUser){
            return res.status(422).send(`User with email: ${foundUser.email} alredy exists`);
        }

        // create new instance of User model with email and password from body of req
        var newUser = new User({
            email: email,
            password: password
        });

        
        newUser.save(function(err){
            if(err){
                return next(err);
            }
            res.send({token: tokenForUser(newUser)});
        });
    });
}

module.exports = signup; 
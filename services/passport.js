const passport = require("passport");
const User = require('../models/user');
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localPassport = require('passport-local').Strategy;


const options = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

const jwtSignup = new JwtStrategy(options, function(payload, done){

    //check if payload.id exists and return true if it does of false if it doesnt
    User.findById(payload.sub, function(err, user){
        if(err){return done(err, false)}
        if(user){
            return done(null, user);
        } 
        else{
            return done(null, false);
        }
    });
});

const localOptions = {
    usernameField: "email",
    passwordField: "password"
}
const loginStrategy = new localPassport(localOptions, function(email, candidatePassword, done){
    //check if email exists

    User.findOne({email: email}, function(err, user){
        if(err){return done(err)}

        //if user doesn't exists
        if(!user){return done(null, false);}

        // if user exists compare passwords
        user.comparePasswords(candidatePassword, function(err, match){
            if(err){return done(err)}
            if(!match){return done(null, false)}
            return done(null, user)
        });
    })
});


passport.use(jwtSignup);
passport.use(loginStrategy);
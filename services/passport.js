const passport = require("passport");
const User = require('../models/user');
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(options, function(payload, done){

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

passport.use(jwtLogin);
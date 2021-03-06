const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

//Define model based on schema
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

// run this function before save to database
// use bcrypt to encrypt password and then
// store them to database 
userSchema.pre("save", function(next){
    const user = this;

    //genSalt generates salt which is used then to calculate hash
    bcrypt.genSalt(10, function(err, salt){
        if(err){
            return next(err);
        } 
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){return next(err)}
            user.password = hash;
            next();
        })
    });
})

userSchema.methods.comparePasswords = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, match){
        if(err){return callback(err);}
        return callback(null, match);
    });
};

//Create model class
const User = mongoose.model("user", userSchema);




//Export the model
module.exports = User;
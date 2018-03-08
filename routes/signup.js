const User = require("../models/user.js");
function signup (req, res, next) {
    const password = req.body.password;
    var email = req.body.email;
    if(password.length < 6 || email.length < 6){
        return res.status(422).send("password too short");
    }

    User.findOne({ email: email }, function(err, foundUser){
        if(err){
            return next(err);
        }
        if(foundUser){
            return res.status(422).send("user alredy in session");
        }

        var newUser = new User({
            email: email,
            password: password
        });

        newUser.save(function(err){
            if(err){
                return next(err);
            }
            res.send(newUser);
        });
    });
}

module.exports = signup; 
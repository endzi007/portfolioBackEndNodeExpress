const signup = require("./routes/signup");
const passport = require("passport");
const passportService = require("./services/passport");


const requireAuth = passport.authenticate("jwt", {session: false});
const requireLogin = passport.authenticate("local", {session: false});
module.exports = function (app){
    app.get("/", requireAuth, function(req, res, next){
        res.send("home");
    });
    app.post("/login", requireLogin, function(req, res, next){
        res.send(req.user);
    })
    app.post("/signup", signup);
}


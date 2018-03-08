const signup = require("./routes/signup");

module.exports = function (app){
    app.get("/", function(req, res, next){
        res.send("home");
    });
    app.post("/signup", signup);
}
const signup = require("./routes/signup");

module.exports = function (app){
    app.get("/", signup);
}
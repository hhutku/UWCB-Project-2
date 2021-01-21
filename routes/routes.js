var path = require("path");
var UserProfile = require("../user-profiles");

module.exports = function(app) {
    app.get("/", function(req, res) {
        if (UserProfile.active == null) {
            res.sendFile(path.join(__dirname, "./public/login.html"));
        } else {
            res.sendFile(path.join(__dirname, "./public/profile.html"));
        }
    });
    
    app.get("/profile", function(req, res) {
        if (UserProfile.active == null) {
            res.sendFile(path.join(__dirname, "./public/login.html"));
        } else {
            res.sendFile(path.join(__dirname, "./public/profile.html"));
        }
    });
    
    app.get("/book", function(req, res) {
        if (UserProfile.active == null) {
            res.sendFile(path.join(__dirname, "./public/login.html"));
        } else {
            res.sendFile(path.join(__dirname, "./public/book.html"));
        }
    });
}
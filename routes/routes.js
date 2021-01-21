const path = require("path");
const passport = require("../config/passport");

function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }

    // return res.redirect("/");
    res.sendFile(path.join(__dirname, "../public/login.html"));
};

module.exports = function (app) {
    app.get("/", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });

    app.get("/login", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/signup", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/profile", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });

    app.get("/book", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/book.html"));
    });
}
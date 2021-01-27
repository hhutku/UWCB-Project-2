const path = require("path");
const passport = require("../config/passport");

function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
      res.sendFile(path.join(__dirname, "../public/login.html"));
};

module.exports = function (app) {
    // app.get("/", isAuthenticated, function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public/profile.html"));
    // });

    app.get("/login", function (req, res) {
        res.render("login");
        // res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/", function (req, res) {
        res.render("signUp");
        // res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/profile",isAuthenticated,function (req, res) {
        res.render("userProfile");
        // res.sendFile(path.join(__dirname, "../views/userProfile.html"));
    });

    app.get("/book", function (req, res) {
        res.render("bookPage");
        // res.sendFile(path.join(__dirname, "../public/book.html"));
    });
}


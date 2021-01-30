const path = require("path");
const passport = require("../config/passport");

function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }

    res.render("login");

};

module.exports = function (app) {


    app.get("/login", function (req, res) {
        res.render("login");
    });

    app.get("/", function (req, res) {
        res.render("login");
    });

    app.get("/signup", function (req, res) {
        res.render("signUp");
    });
    
    app.get("/profile",isAuthenticated,function (req, res) {
        res.render("userProfile");
    });

    app.get("/api/book/:bookId", function (req, res) {
        const selected = req.params.bookId

        for (let i = 0; i < bookId.length; i++) {
            if (selected === bookId[i].routeName) {
              return res.json(bookId[i]);
            }
          }
        res.render("bookPage");
    });

    app.get("/book", function (req, res) {
        res.render("bookPage");
    });
}
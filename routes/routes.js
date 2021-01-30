// const path = require("path");
// const passport = require("../config/passport");

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }

  res.render("login");
}

module.exports = function(app) {
  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/", (req, res) => {
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    res.render("signUp");
  });

  app.get("/profile", isAuthenticated, (req, res) => {
    res.render("userProfile");
  });

  app.get("/bookPage/:bookId", (req, res) => {
    const selected = req.params.bookId;
    res.render("bookPage/" + selected);
  });

  app.get("/book", (req, res) => {
    res.render("bookPage");
  });
};

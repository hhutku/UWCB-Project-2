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

<<<<<<< HEAD
    app.get("/signup", function (req, res) {
        res.render("signUp");
    });

    app.get("/profile", isAuthenticated, function (req, res) {
        res.render("userProfile");
    });
=======
  app.get("/", (req, res) => {
    res.render("login");
  });
>>>>>>> 47bb6b12d7b2e8b1d400f41e432e3794e9fb4b62

  app.get("/signup", (req, res) => {
    res.render("signUp");
  });

<<<<<<< HEAD
        for (let i = 0; i < bookId.length; i++) {
            if (selected === bookId[i].routeName) {
                return res.json(bookId[i]);
            }
        }
        res.render("bookPage");
    });
=======
  app.get("/profile", isAuthenticated, (req, res) => {
    res.render("userProfile");
  });
>>>>>>> 47bb6b12d7b2e8b1d400f41e432e3794e9fb4b62

  app.get("/book", (req, res) => {
    res.render("bookPage");
  });
};


const db = require("../models");
const router = require("express").Router();
const passport = require("../config/passport");

router.post("/api/login", passport.authenticate("local"), (req, res) => {

  res.json({
    email: req.user.email,
    id: req.user.id
  });
});


router.post("/api/signup", (req, res) => {
  db.UserProfile.create({
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  })
    .then(() => {
      res.send("ok")
    })
    .catch(err => {
      res.status(401).json(err);
    });

  });

  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });



  router.get("/api/user_data", (req, res) => {
    if (!req.user) {
      res.json({});
    } else {

      res.json({
        email: req.user.email,
        id: req.user.id,
        first_name: req.user.first_name,
        last_name: req.user.last_name
      });
    }
  });

  router.post("/api/booklist", (req, res) => {
    db.book_list.create({
      google_book_id: req.body.google_book_id,
      completed: req.body.completed,
      ranking: req.body.ranking,
      UserProfileId: req.body.UserProfileId
    
    })
      .then(() => {
        res.send("ok")
      })
      .catch(err => {
        res.status(401).json(err);
      });
  
    });



module.exports = router;

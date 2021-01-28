
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
  db.userProfile.create({
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  })
    .then(() => {
      res.redirect(307, "/api/login");
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
    db.bookList.create({
      google_book_id: req.body.google_book_id,
      completed: req.body.completed,
      ranking: req.body.ranking,
      userProfileId: req.body.userProfileId
    
    })
      .then(() => {
        res.send("ok")
      })
      .catch(err => {
        res.status(401).json(err);
      });
  
    });

    router.post("/api/comment", (req, res) => {
      db.user_comment.create({
        googleBookId: req.body.googleBookId,
        text: req.body.text,
        displayed: req.body.displayed,
        liked: req.body.liked,
        disliked: req.body.disliked,
      
      })
        .then(() => {
          res.send("ok")
        })
        .catch(err => {
          res.status(401).json(err);
        });
    
      });


module.exports = router;

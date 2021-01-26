
const db = require("../models");
const router = require("express").Router();
const passport = require("../config/passport");

router.post("/api/login", passport.authenticate("local"), (req, res) => {
	res.json(req.user);
});

router.post("/api/signup", (req, res) => {
	db.userProfile.create(req.body).then(() => {
		res.redirect(307, "/api/login");
	}).catch(err => {
		res.status(401).json(err);
	});

});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

router.get("/api/userData", (req, res) => {
	if (!req.user) {
		res.json({});
	} else {
		res.json(req.user);
	}
});

router.post("/api/bookList", (req, res) => {
	db.bookList.create(req.body).then(() => {
		res.send("ok")
	}).catch(err => {
		res.status(401).json(err);
	});
});

router.post("/api/comment", (req, res) => {
	db.comment.create(req.body).then(() => {
		res.send("ok")
	}).catch(err => {
		res.status(401).json(err);
	});
});

module.exports = router;

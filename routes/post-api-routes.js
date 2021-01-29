const db = require("../models");
const router = require("express").Router();
const passport = require("../config/passport");

router.post("/api/login", passport.authenticate("local"), (req, res) => {
	console.log('2xxxxxxxxxxxxxxxxxx');
	res.json(req.user);
});

router.post("/api/signup", (req, res) => {
	db.userProfile.create(req.body)
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
		res.json(req.user);
	}
});

router.post("/api/booklist", (req, res) => {
	db.bookList.create(req.body)
		.then(() => {
			res.send("ok")
		})
		.catch(err => {
			res.status(401).json(err);
		});
});
1
router.post("/api/comment", (req, res) => {
	db.user_comment.create(req.body)
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			res.status(401).json(err);
		});
});

router.put("/api/comment", (req, res) => {
	const { id, data } = req.body
	db.user_comment.find({ where: { id } })
		.on('success', record => {
			if (record) {
				record.update(data)
					.success(data => res.send(data))
			}
		})
});

module.exports = router;
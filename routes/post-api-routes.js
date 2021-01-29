const db = require("../models");
const router = require("express").Router();
const passport = require("../config/passport");

router.post("/api/login", passport.authenticate("local"), (req, res) => {
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

router.post("/api/comment", (req, res) => {
	db.user_comment.create(req.body)
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			res.status(401).json(err);
		});

});

const {Op} = require("sequelize");
router.get("/api/check/:userId/:bookId", function (req, res) {
	db.bookList.findAll({
		where: {
			[Op.and]: [{ 
				userId: req.params.userId, 
				bookId: req.params.bookId
			}]
		}
	}).then(isExist => {
		res.json(isExist);
	});
});

router.get("/api/bookList/:userId", function (req, res) {
	db.bookList.findAll({
		where: {
			userId: req.params.userId
		}
	}).then(data => {
		const str = JSON.stringify(data)
		const list = JSON.parse(str)

		res.json(list)
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
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(
	new LocalStrategy(
		{ usernameField: "email" },
		(email, password, done) => {
			db.userProfile.findOne({
				where: { email }
			}).then(dbUser => {
				console.log('7xxxxxxxxxxxxxxxxxxxxxxxx');
				console.log({dbUser});
				if (!dbUser) {
					console.log('8xxxxxxxxxxxxxxxxxxxxxxxx');
					return done(null, false, {
						message: "Incorrect email."
					});
				}
				console.log('9xxxxxxxxxxxxxxxxxxxxxxxx');
				const valid = dbUser.validPassword(password)
				console.log(valid);
				if (!valid) {
					console.log('10xxxxxxxxxxxxxxxxxxxxxxxx');
					return done(null, false, {
						message: "Incorrect password."
					});
				}
				console.log('11xxxxxxxxxxxxxxxxxxxxxxxx');

				return done(null, dbUser);
			});
		}
	)
);

passport.serializeUser((userProfile, cb) => {
	console.log('6xxxxxxxxxxxxxxxxxxxxxxxx');
	cb(null, userProfile);
});

passport.deserializeUser((obj, cb) => {
	console.log('5xxxxxxxxxxxxxxxxxxxxxxxx');
	cb(null, obj);
});

module.exports = passport;

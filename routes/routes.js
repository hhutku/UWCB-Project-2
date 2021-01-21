var path = require("path");

module.exports = function(app) {
    app.get("/", function(req, res) {
        if (!req.user) {
            res.sendFile(path.join(__dirname, "../public/login.html"));
        } else {
            res.sendFile(path.join(__dirname, "../public/profile.html"));
        }
    });

    app.get("/login", function(req, res) {
        if (!req.user) {
            res.sendFile(path.join(__dirname, "../public/login.html"));
        } else {
            res.sendFile(path.join(__dirname, "../public/profile.html"));
        }
    });

    app.get("/signup", function(req, res) {
        if (!req.user) {
            res.sendFile(path.join(__dirname, "../public/signup.html"));
        } else {
            res.sendFile(path.join(__dirname, "../public/profile.html"));
        }
    });
    
    app.get("/profile", function(req, res) {
        if (!req.user) {
            res.sendFile(path.join(__dirname, "../public/login.html"));
        } else {
            res.sendFile(path.join(__dirname, "../public/profile.html"));
        }
    });
    
    app.get("/book", function(req, res) {
        if (!req.user) {
            res.sendFile(path.join(__dirname, "../public/login.html"));
        } else {
            res.sendFile(path.join(__dirname, "../public/book.html"));
        }
    });
}
const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js")

router
    .route("/signup")
    .get( userController.renderCreateUser)
    .post(wrapAsync(userController.createUser));

router
    .route("/login")
    .get( userController.renderLoginUser)
    .post(
        saveRedirectUrl, 
        passport.authenticate("local", {
            failureRedirect: '/login', 
            failureFlash: true
        }),
        userController.loginUser
    )

router
    .get("/logout", userController.logoutUser);

module.exports = router;
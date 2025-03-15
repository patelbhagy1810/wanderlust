const User = require("../models/user")

module.exports.renderCreateUser = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.createUser = async (req, res) => {
    try{
        let{username, email, password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to wanderlust!")
            res.redirect("/listings");
        })
       
    } catch(e){
        req.flash("error", e.message)
        res.redirect("/signup");
    }
}

module.exports.renderLoginUser = (req, res) => {
    res.render("users/login.ejs")
};

module.exports.loginUser = async (req, res) => {
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are Logged Out!")
        res.redirect("/listings");
    })
};
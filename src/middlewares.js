export const isLoggedIn = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.cookies["jwtToken"]);
    res.locals.siteName = "PS";
    next();
};

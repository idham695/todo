let isAuthenticated = (req, res, next) => {
    if (!req.session?.data?.sudahMasuk) {
        req.flash('error','anda belum masuk');
        res.redirect('/auth/masuk');
    }
    next();
}


module.exports = {isAuthenticated}
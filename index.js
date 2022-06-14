const Express = require("express")
const app = Express();
const authRouter = require('./route/auth')
const homeRouter = require('./route/home')
const session = require('cookie-session')
const flashMessage = require('express-flash')
const expressLayouts = require('express-ejs-layouts')

// Inisialisasi session
app.use(session({
    name: "session-percobaan",
    keys: ["key-percobaan"],
    path: '/'
}))
app.use(flashMessage()) // Inisialisasi flash message
app.use(Express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use(expressLayouts)

app.use((req, res, next) => {
    res.locals.sudahMasuk = req.session?.data?.sudahMasuk
    next()
})

app.use('/auth', authRouter)
app.use('/', homeRouter)
app.use('/home', homeRouter)

app.listen(3200, () => {
    console.log("app berjalan dengan port 3200")
});
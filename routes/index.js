const router = require('express').Router;
const bodyParser = require('body-parser')
const { user } = require('../controllers/user');
const cookieParser = require('cookie-parser');
const path = require('path')
const nunjucks = require('nunjucks')

route = router()
//Define Pages
route.use(bodyParser.urlencoded({extended: true}));
route.use(cookieParser())
route.post('/register', user.add)
route.post('/login', user.login)
route.get('/landing', (req, res) => {
    res.render('homepage')
})
route.get('/login', (req, res) => {
    res.render('login')
})
route.get('/signup', (req, res) => {
    res.render('signup') 
})

route.get('/uhome', user.uHome)

route.get('/describe:id', user.donationDescription)

route.get('/payingUser/:id', user.payingUser)
route.post('/payingBank/:id', user.payingBank)
route.post('/checkout/:id', user.checkOut)
module.exports.route = route 
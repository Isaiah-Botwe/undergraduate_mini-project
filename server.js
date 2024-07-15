const server = require('express')
const nunjucks = require('nunjucks')
const {route} = require('./routes/index')
const cors = require('cors')
const path = require('path')
const { storage } = require('./storage/Dbstorage')
const app = server()
app.use(cors())

nunjucks.configure('views', {autoescape:true, express: app})
app.engine('html', nunjucks.render);
app.set('view engine', 'html')
app.use(server.static(path.join(__dirname, 'views')));
app.use(route)

const port = 3001
app.listen(port, () => console.log("Hey Ange I'm listining"))
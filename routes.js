var app = require('express')
var router = app.Router()

/* GET home page. */
router.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

router.get('/test', function (req, res) {
   res.sendFile( __dirname + "/" + "test.html" );
})

module.exports = router

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res)=> {
    res.send(`Server Running`)
});

module.exports = router;
// app.get("/", (req, res) =>
//   
// );
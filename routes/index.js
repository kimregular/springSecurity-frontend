var express = require('express');
var router = express.Router();
let axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  axios.get("http://localhost:8080/api/v1")
      .then(response => {
        const data = response.data;
        res.render('index', {title: data.title, subTitle: data.subTitle});
      }).catch(Error => {
        console.log(Error)
  })
});

module.exports = router;

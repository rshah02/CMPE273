var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Calculator app' });
})
router.post('/doComputation', function (req, res, next) {
    var reqExpression = req.body.exp;
    try {
        var result = eval(reqExpression);
        res.status(200).send({ finalResult: result })
    } catch (e) {
        res.status(400).send();
    }
})
module.exports = router;
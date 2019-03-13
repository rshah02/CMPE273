var express = require('express');
var router = express.Router();

router.post('/doComputation', function (req, res, next) {
    var expression = req.body.expression;
    try {
        var result = eval(expression);
        res.status(200).send({
            finalResult: result
        })
    } catch (e) {
        res.status(400).send();
    }
})
module.exports = router;
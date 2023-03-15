const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    const text = 'hello ' + isLocal ? 'local' : 'not local';
    res.send(text);
});

module.exports = router;

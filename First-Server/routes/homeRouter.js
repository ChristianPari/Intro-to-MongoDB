const express = require('express'),
    router = express();

router.get('/', (req, res) => {

    res.send('Home Route');

});

module.exports = router;
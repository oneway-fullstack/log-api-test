const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { saveInfo } = require('../controllers/log');

router.post('/v1/log', jsonParser, saveInfo);

module.exports = router;
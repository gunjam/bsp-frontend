const express = require('express');
const {render, validate} = require('./functions');

const router = new express.Router();

router.get('/', render);
router.post('/', validate);

module.exports = router;

const express = require('express');
const {render, validate, redirect} = require('./functions');

const router = new express.Router();

router.get('/', render);
router.post('/', validate, redirect);

module.exports = router;

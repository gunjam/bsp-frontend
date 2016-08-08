const express = require('express');
const {render, validate} = require('./functions');

const router = new express.Router();

router.get('/', render);
router.post('/', (req, res) => res.send(req.session.partner));

module.exports = router;

const express = require('express');
const router = express.Router();
const { getConcerts, getConcert } = require('../controllers/concertControllers');

// get all concerts
router.get('/', getConcerts);

// get one concert
router.get('/:id', getConcert);

// create concert

// update concert

//delete concert

module.exports = router;
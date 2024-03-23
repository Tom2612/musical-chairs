const express = require('express');
const router = express.Router();
const { getConcerts, getConcert, createConcert, deleteConcert } = require('../controllers/concertControllers');

// '/' routes: get all concerts, post concert
router.route('/')
    .get(getConcerts) // view all concerts
    .post(createConcert) // create new concert

// get one concert
router.route('/:id')
    .get(getConcert) // view concert details
    // .patch(updateConcert) // update concert details
    .delete(deleteConcert) // delete concert

router.get('/:id/edit', getConcert) // view editable concert details

module.exports = router;
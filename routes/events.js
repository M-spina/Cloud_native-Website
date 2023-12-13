const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /events'
    });
});

router.post('/', (req, res, next) => {
    const event = {
        name: req.body.name,
        location: req.body.location,
        date: req.body.date,
        description: req.body.description,
        imgURL: req.body.imgURL,
    }
    res.status(200).json({
        message: 'Handling POST requests to /events',
        createdEvent: event
    });
});

router.get('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    if (id === 'special'){
        res.status(200).json({
            message: 'the SPECIAL Id',
            id: id
        });
    }
    else {
        res.status(200).json({
            message: 'you passed an Id'
        });
    }
});

router.patch('/:eventId', (req, res, next) => {
    res.status(200).json({
        message: 'event updated!',
    });
});

router.delete('/:eventId', (req, res, next) => {
    res.status(200).json({
        message: 'event deleted!',
    });
});

module.exports = router;
const router = require('express').Router();
const { Event } = require('../../models');

//Create new event
router.post('/', async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      event_owner: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update Event
// router.put('/', async (req, res) => {

// });

//Delete Event
// router.delete('/', async (req, res) => {

// });
module.exports = router;
const router = require('express').Router();
const { default: events } = require('inquirer/lib/utils/events');
const { Event, Guest } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get('/', async (req, res) => {
  try {
    const dbEventData = await Event.findAll({
      include: [
        {
          model: Event,
          attributes: ['event_name', 'description'],
        },
      ],
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

    router.get('/event/:id', async (req, res) => {
      try {
        const dbEventData = await Event.findByPk(req.params.id, {
          include: [
            {
              model: Event,
              attributes: [
                'event_type',
                'event_name',
                'description',
                'event_date',
                'event_loc',
                'event_owner',
              ],
            },
          ],
        });

        const events= dbEventData.get({ plain: true });
        res.render('event', {
          Event,
          // We are not incrementing the 'countVisit' session variable here
          // but simply sending over the current 'countVisit' session variable to be rendered
          countVisit: req.session.countVisit,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
      
    

module.exports = router;
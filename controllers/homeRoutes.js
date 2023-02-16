const router = require('express').Router();
const { User, Event } = require('../models');
const withAuth = require('../utils/auth');
const { User, Event } = require('../models');

router.get('/', async (req, res)=> {
try {
    const eventData = await Event.findAll ({
        include: [
            {
            model: User,
            attributes: ['name'],
            },
        ],
    });
  
      // Serialize data so the template can read it
      const events = eventData.map((events) => events.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        events, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

  router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Event }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/event/:id', async (req, res) => {
    try {
      const eventData = await Event.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const events = eventData.map((event) => event.get({ plain: true }));

  
      res.render('events', {
        ...events,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('newEvent', withAuth, async (req, res) => {
    try {
      const eventData = await Event.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const events = eventData.map((event) => event.get({ plain: true }));

  
      res.render('newEvent', {
        ...events,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
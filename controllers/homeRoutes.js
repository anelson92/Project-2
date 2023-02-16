const router = require('express').Router();
const { User, Event } = require('../models');
const withAuth = require('../utils/auth');

//This router gets all events and renders our homepage/dashboard
router.get('/', async (req, res)=> {
  try {
    const eventData = await Event.findAll ({
        include: [
            {
            model: User,
            attributes: ['username'],
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

//This route gets and renders an individual event based on ID
router.get('/event/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id);

    const event = eventData.get({ plain: true });
    
    res.render('event', { event });
  } catch (err) {
    console.log(err);
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

  //This route will get and render the profile page if user is logged in
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//This route will get and render the new event page if user is logged in
router.get('/newEvent', withAuth, async (req, res) => {
  try {
    res.render('newEvent');
} catch (err) {
    res.status(500).json(err);
}
});

//This route will get and render the about page regardless of being logged in or not
router.get('/aboutUs', async (req, res)=> {
  try {
    res.render('aboutUs');
} catch (err) {
    res.status(500).json(err);
}
});

  module.exports = router;
<<<<<<< HEAD
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3301;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ });

const sess = {
  secret: 'Group 3',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
=======
const router = require('express').Router();
const { Gallery, Painting } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbGalleryData = await Gallery.findAll({
      include: [
        {
          model: Painting,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const galleries = dbGalleryData.map((gallery) =>
      gallery.get({ plain: true })
    );

    req.session.save(() => {
      // We set up a session variable to count the number of times we visit the homepage
      if (req.session.countVisit) {
        // If the 'countVisit' session variable already exists, increment it by 1
        req.session.countVisit++;
      } else {
        // If the 'countVisit' session variable doesn't exist, set it to 1
        req.session.countVisit = 1;
      }

      res.render('homepage', {
        galleries,
        // We send over the current 'countVisit' session variable to be rendered
        countVisit: req.session.countVisit,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
router.get('/gallery/:id', async (req, res) => {
  try {
    const dbGalleryData = await Gallery.findByPk(req.params.id, {
      include: [
        {
          model: Painting,
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description',
          ],
        },
      ],
    });

    const gallery = dbGalleryData.get({ plain: true });
    res.render('gallery', {
      gallery,
      // We are not incrementing the 'countVisit' session variable here
      // but simply sending over the current 'countVisit' session variable to be rendered
      countVisit: req.session.countVisit,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one painting
router.get('/painting/:id', async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });

    res.render('painting', {
      painting,
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
>>>>>>> 6a68ebac24e2b5d0f4d58f3dba061b2539ba970a

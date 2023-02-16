const { User } = require('../models');

const userData = [
  {
    username: 'Linda',
    email: 'lindaBride@gmail.com',
    password: 'LindaHitched2024!',
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUsers;

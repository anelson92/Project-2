const { Guest } = require("../models");

const guestData = [
  {
    attending: "Yes"
  },
];

const seedGuests = () => Guest.bulkCreate(guestData);

module.exports = seedGuests;

const { Guest } = require("../models");

const guestData = [
  {
    attending: "Yes",
    guest_id: 1,
    event_id: 1,
  },
];

const seedGuests = () => Event.bulkCreate(guestData);

module.exports = seedGuests;

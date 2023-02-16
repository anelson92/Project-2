const { Event } = require("../models");

const eventData = [
  {
    event_name: "Linda & Jeremy's Wedding",
    description: "After five years together, Jeremy finally popped the question and of course Linda said yes! Join us on the evening of October 15th for their union or something.",
    event_date: "10-15-2024",
    event_time: "3:00pm",
    event_loc: "Chicago, IL",
    filename: "Wedding",
    hostedBy: "Linda & Jeremy"
  },
];

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;

const User = require("./User");
// const Guest = require("./User");
const Event = require("./Event");

//A user can have many events
User.hasMany(Event, {
    foreignKey: "event_owner",
    onDelete: "CASCADE",
  });

//An event can only belong to one user
Event.belongsTo(User, {
    foreignKey: "event_owner"
  });

//An event can have many guests
// Event.hasMany(Guest, {
//     foreignKey: "post_id",
//     onDelete: "cascade",
//   });

  module.exports = { User, Event };
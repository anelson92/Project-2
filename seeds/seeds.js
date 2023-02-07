const sequelize = require("../config/connection");
const seedUsers = require("./user");
const seedEvents = require("./event");
const seedGuests = require("./guest");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedEvents();
  await seedGuests();

  process.exit(0);
};

seedDatabase();

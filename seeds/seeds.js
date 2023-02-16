const sequelize = require("../config/connection");
const seedUsers = require("./user");
const seedEvents = require("./event");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedEvents();

  process.exit(0);
};

seedDatabase();

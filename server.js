const express = require("express")
const session = require("express-session");

const PORT = process.eventNames.PORT || 3301;
const db = require("./models");

const app = express();
app.use(express.urlencoded({ extened: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
    session({ secret: "group 3", resave: true, saveUnitialized: true })
);

app.use(.initialize()); //not sure where to direct this to
app.use(.session());

require("")(app);
require("")(app);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(
            "==> Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});


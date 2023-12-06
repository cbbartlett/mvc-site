import express from 'express';
import exphbs from 'express-handlebars'
import 'dotenv/config'
import session, { Store } from 'express-session';
import db from './config/connection.js';
import routeLoader from './lib/routeLoader.js';
import { User, Post, Comment } from './lib/models/index.js'
import helpers from './lib/helpers.js';

const SequelizeStore = connectSequelize(Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 400000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, "127.0.0.1", () =>
    console.log(`Local server started on http://localhost:${PORT}`))
});

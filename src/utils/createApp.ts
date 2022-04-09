// import { config } from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import routes from '../routes';
import store from 'connect-mongo';

// config();
require('../strategies/discord');

export function createApp(): Express {
  const app = express();

  // Enable Parsing Middleware for Requests
  app.use(express.json());
  app.use(express.urlencoded());

  // Enable CORS
  app.use(cors({
    origin: [`${process.env.DASHBOARD_DOMAIN!}`],
    credentials: true,
  }));

  // Enable Sessions
  app.use(session({
    secret: 'FJFGYYTrc56ub7v76ikiuY67IHGc-67IC5Ci7jU56C54ckuyU6-5VJYGfi76l7IX6I5',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 7,
    },
    store: store.create({ mongoUrl: process.env.MONGO_URL! }),
  }));

  // Enable Passport
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', routes);

  return app;
}
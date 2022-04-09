"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const passport_1 = tslib_1.__importDefault(require("passport"));
const routes_1 = tslib_1.__importDefault(require("../routes"));
const connect_mongo_1 = tslib_1.__importDefault(require("connect-mongo"));
(0, dotenv_1.config)();
require('../strategies/discord');
function createApp() {
    const app = (0, express_1.default)();
    // Enable Parsing Middleware for Requests
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded());
    // Enable CORS
    app.use((0, cors_1.default)({
        origin: [`${process.env.DASHBOARD_DOMAIN}`],
        credentials: true,
    }));
    // Enable Sessions
    app.use((0, express_session_1.default)({
        secret: 'FJFGYYTrc56ub7v76ikiuY67IHGc-67IC5Ci7jU56C54ckuyU6-5VJYGfi76l7IX6I5',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60 * 24 * 7,
        },
        store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGO_URL }),
    }));
    // Enable Passport
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use('/api', routes_1.default);
    return app;
}
exports.createApp = createApp;

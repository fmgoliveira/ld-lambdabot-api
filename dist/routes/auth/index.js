"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const passport_1 = tslib_1.__importDefault(require("passport"));
const logsWebhook_1 = require("./logsWebhook");
const router = (0, express_1.Router)();
router.get('/login', passport_1.default.authenticate('discord'), (req, res) => res.sendStatus(200));
router.get('/redirect', passport_1.default.authenticate('discord'), (req, res) => {
    if (req.user)
        (0, logsWebhook_1.sendLogsWebhook)(true, false, req.user);
    res.redirect(`${process.env.DASHBOARD_DOMAIN}/servers`);
});
router.get('/status', (req, res) => {
    return req.user ? res.send(req.user) : res.status(401).send({
        msg: 'Unauthorized'
    });
});
router.get('/logout', (req, res) => {
    console.log(req.method);
    if (req.user)
        (0, logsWebhook_1.sendLogsWebhook)(false, true, req.user);
    req.logout();
    res.redirect(`${process.env.DASHBOARD_DOMAIN}`);
});
exports.default = router;

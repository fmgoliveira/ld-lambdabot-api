"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const schemas_1 = require("../../database/schemas");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const router = (0, express_1.Router)();
router.post("/discordswebhook", body_parser_1.default.json(), async (req, res) => {
    if (!req.headers.authorization || (req.headers.authorization !== process.env.BOTSFORDISCORD_WEBHOOK_TOKEN))
        return res.sendStatus(403);
    res.sendStatus(200);
    if (!req.body)
        return;
    const { user, bot } = req.body;
    if (bot !== process.env.DISCORD_CLIENT_ID)
        return;
    const timestamp = Date.now();
    await schemas_1.Vote.create({
        userId: user,
        timestamp,
        list: "botsfordiscord",
    });
});
router.post("/dblwebhook", body_parser_1.default.json(), async (req, res) => {
    if (!req.headers.authorization || (req.headers.authorization !== process.env.TOP_GG_WEBHOOK_TOKEN))
        return res.sendStatus(403);
    res.sendStatus(200);
    if (!req.body)
        return;
    const { user, bot, type } = req.body;
    if (bot !== process.env.DISCORD_CLIENT_ID)
        return;
    if (type === "test")
        return;
    const timestamp = Date.now();
    await schemas_1.Vote.create({
        userId: user,
        timestamp,
        list: "topgg",
    });
});
exports.default = router;

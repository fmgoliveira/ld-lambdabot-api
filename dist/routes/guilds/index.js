"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guilds_1 = require("../../controllers/guilds");
const middlewares_1 = require("../../utils/middlewares");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.isAuthenticated, guilds_1.getGuildsController);
router.get('/:guildId', middlewares_1.isAuthenticated, middlewares_1.storedGuildSetup, guilds_1.getGuild);
exports.default = router;

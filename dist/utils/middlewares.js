"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAllowed = exports.storedGuildSetup = exports.isAuthenticated = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const schemas_1 = require("../database/schemas");
const guilds_1 = require("../services/guilds");
const constants_1 = require("./constants");
const isAuthenticated = (req, res, next) => req.user ? next() : res.status(403).send({ msg: "Unauthorised" });
exports.isAuthenticated = isAuthenticated;
const storedGuildSetup = async (req, res, next) => {
    const guildId = req.params.guildId;
    const storedGuild = await schemas_1.Guild.findOne({ guildId });
    if (!storedGuild) {
        const user = req.user;
        const { data: guilds } = await (0, guilds_1.getUserGuildsService)(user.id);
        const guild = guilds.filter((g) => g.id === guildId)[0];
        const newStoredGuild = new schemas_1.Guild({
            guildId,
            guildName: guild.name,
            guildIcon: guild.icon,
            guildOwner: guild.owner === true ? user.id : guild.owner,
        });
        await newStoredGuild.save();
    }
    next();
};
exports.storedGuildSetup = storedGuildSetup;
const isAllowed = async (req, res, next) => {
    const guildId = req.params.guildId;
    if (!guildId)
        return next();
    const user = req.user;
    const { data: userGuilds } = await axios_1.default.get(`${constants_1.DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${user.accessToken}` }
    });
    const { data: botGuilds } = await axios_1.default.get(`${constants_1.DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` }
    });
    const guild = userGuilds.filter((g) => g.id === guildId)[0];
    const botGuild = botGuilds.filter((g) => g.id === guildId)[0];
    if (!guild)
        return res.status(404).send({ msg: "Guild not found" });
    if (!botGuild)
        return res.status(404).send({ msg: "Guild not found" });
    if (!guild.owner && (parseInt(guild.permissions) & 0x8) !== 0x8 && (parseInt(guild.permissions) & 0x20) !== 0x20)
        return res.status(403).send({ msg: "Unauthorised" });
    next();
};
exports.isAllowed = isAllowed;

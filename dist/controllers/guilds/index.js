"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuild = exports.getGuildsController = void 0;
const guilds_1 = require("../../services/guilds");
async function getGuildsController(req, res) {
    const user = req.user;
    try {
        const guilds = await (0, guilds_1.getMutualGuildsService)(user.id);
        res.status(200).send({ guilds });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400).send({ msg: "Error" });
    }
}
exports.getGuildsController = getGuildsController;
async function getGuild(req, res) {
    const user = req.user;
    const guildId = req.params.guildId;
    const { data: guilds } = await (0, guilds_1.getUserGuildsService)(user.id);
    const guild = guilds.filter((g) => g.id === guildId)[0];
    res.status(200).send(guild);
}
exports.getGuild = getGuild;

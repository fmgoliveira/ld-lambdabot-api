"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLogsWebhook = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const constants_1 = require("../../utils/constants");
const sendLogsWebhook = (login, logout, user) => {
    const embed = new discord_js_1.MessageEmbed()
        .setColor(login && !logout ? "GREEN" : "RED")
        .setTitle(login && !logout ? "Login Log" : "Logout Log")
        .setDescription(`A user has logged ${login && !logout ? "in into" : "out from"} their account.`)
        .addField("User", `${user.discordUsername}#${user.discordDiscriminator} (\`${user.discordId}\`)`)
        .addField("Time", `<t:${parseInt(String(Date.now() / 1000))}:R> - <t:${parseInt(String(Date.now() / 1000))}:F>`)
        .setFooter("Lambda Dashboard Logs");
    axios_1.default.post(`${constants_1.DISCORD_API_URL}/webhooks/${process.env.LOGS_WEBHOOK_ID}/${process.env.LOGS_WEBHOOK_TOKEN}`, {
        embeds: [embed],
    });
};
exports.sendLogsWebhook = sendLogsWebhook;

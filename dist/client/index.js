"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const statsSystem_1 = tslib_1.__importDefault(require("./statsSystem"));
const votingSystem_1 = tslib_1.__importDefault(require("./votingSystem"));
const client = new discord_js_1.Client({
    intents: 104447,
    presence: {
        status: 'invisible',
    },
    shards: 'auto',
});
exports.client = client;
client.once('ready', () => {
    console.log('Client connection established.');
    (0, votingSystem_1.default)(client);
    console.log('Voting System started.');
    (0, statsSystem_1.default)(client);
    console.log('Post Stats System started.');
});
exports.default = {
    client,
    init: () => {
        client.login(process.env.DISCORD_BOT_TOKEN);
    }
};

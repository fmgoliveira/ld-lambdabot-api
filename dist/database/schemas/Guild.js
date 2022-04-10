"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const GuildSchema = new mongoose_1.Schema({
    guildId: { type: String, required: true },
    guildName: { type: String, required: true },
    guildIcon: { type: String, required: true },
    guildOwner: { type: String, required: true },
    modules: {
        administration: {
            chatbot: {
                enabled: { type: Boolean, required: false, default: false },
                channels: { type: [String], required: false, default: [] },
            },
            autoreact: [{
                    channel: { type: String, required: false, default: '' },
                    emojis: { type: [String], required: false, default: [] },
                }],
        },
        welcome: {
            enabled: { type: Boolean, required: false, default: false },
            channel: { type: String, required: false, default: '' },
            message: { type: String, required: false, default: '*{user}*, welcome to **{guild}**! Have a great time here!' },
            dm: { type: Boolean, required: false, default: false },
            embed: {
                enabled: { type: Boolean, required: false, default: false },
                title: { type: String, required: false, default: 'Welcome!' },
                description: { type: String, required: false, default: '*{user}*, welcome to **{guild}**! Have a great time here!' },
                color: { type: String, required: false, default: '#000000' },
                thumbnail: { type: String, required: false, default: '' },
                titleUrl: { type: String, required: false, default: '' },
                image: { type: String, required: false, default: '' },
                author: {
                    name: { type: String, required: false, default: '' },
                    icon_url: { type: String, required: false, default: '' },
                    url: { type: String, required: false, default: '' },
                },
                footer: {
                    text: { type: String, required: false, default: '' },
                    icon_url: { type: String, required: false, default: '' },
                },
            },
        },
        leave: {
            enabled: { type: Boolean, required: false, default: false },
            channel: { type: String, required: false, default: '' },
            message: { type: String, required: false, default: '*{user_tag}* just left **{guild}**.' },
            dm: { type: Boolean, required: false, default: false },
            embed: {
                enabled: { type: Boolean, required: false, default: false },
                title: { type: String, required: false, default: 'Goodbye!' },
                description: { type: String, required: false, default: '*{user_tag}* just left **{guild}**.' },
                color: { type: String, required: false, default: '#000000' },
                thumbnail: { type: String, required: false, default: '' },
                titleUrl: { type: String, required: false, default: '' },
                image: { type: String, required: false, default: '' },
                author: {
                    name: { type: String, required: false, default: '' },
                    icon_url: { type: String, required: false, default: '' },
                    url: { type: String, required: false, default: '' },
                },
                footer: {
                    text: { type: String, required: false, default: '' },
                    icon_url: { type: String, required: false, default: '' },
                },
            },
        },
        autoroles: {
            enabled: { type: Boolean, required: false, default: false },
            userRoles: { type: [String], required: false, default: [] },
            botRoles: { type: [String], required: false, default: [] },
        },
        tickets: {
            enabled: { type: Boolean, required: false, default: false },
            panelMessage: {
                id: { type: String, required: false, default: '' },
                url: { type: String, required: false, default: '' },
                message: {
                    title: { type: String, required: false, default: 'Open a Ticket' },
                    description: { type: String, required: false, default: 'Click the corresponding button below to open a support ticket between you and the Support Team of {guild}.' },
                    color: { type: String, required: false, default: '#000000' },
                    thumbnail: { type: String, required: false, default: '' },
                    titleUrl: { type: String, required: false, default: '' },
                    image: { type: String, required: false, default: '' },
                    timestamp: { type: Boolean, required: false, default: false },
                },
                channel: { type: String, required: false, default: '' },
            },
            logChannel: { type: String, required: false, default: '' },
            closedCategory: { type: String, required: false, default: '' },
            ticketCount: { type: Number, required: false, default: 0 },
            categories: { type: [{
                        categoryChannel: String,
                        label: String,
                        maxTickets: Number,
                        supportRoles: [String],
                        welcomeMessage: {
                            message: String,
                            color: String,
                        },
                        deleteOnClose: Boolean,
                        moveToClosedCategory: Boolean,
                    }], required: false, default: [] },
        },
        moderation: {
            moderatorRoles: { type: [String], required: false, default: [] },
            includeReason: { type: Boolean, required: false, default: false },
            dm: {
                ban: { type: Boolean, required: false, default: false },
                kick: { type: Boolean, required: false, default: false },
                warn: { type: Boolean, required: false, default: false },
                timeout: { type: Boolean, required: false, default: false },
            },
        },
        altDetection: {
            enabled: { type: Boolean, required: false, default: false },
            logChannel: { type: String, required: false, default: '' },
            accountAge: { type: Number, required: false, default: 7 },
            action: { type: String, required: false, default: 'kick' },
            whitelist: { type: [String], required: false, default: [] },
        },
        logging: {
            enabled: { type: Boolean, required: false, default: false },
            moderation: {
                enabled: { type: Boolean, required: false, default: false },
                channel: { type: String, required: false, default: '' },
                color: { type: String, required: false, default: '#000000' },
                events: {
                    ban: { type: Boolean, required: false, default: false },
                    unban: { type: Boolean, required: false, default: false },
                    kick: { type: Boolean, required: false, default: false },
                    warn: { type: Boolean, required: false, default: false },
                    timeout: { type: Boolean, required: false, default: false },
                },
            },
            serverEvents: {
                enabled: { type: Boolean, required: false, default: false },
                channel: { type: String, required: false, default: '' },
                color: { type: String, required: false, default: '#000000' },
                events: {
                    channelCreate: { type: Boolean, required: false, default: false },
                    channelDelete: { type: Boolean, required: false, default: false },
                    channelUpdate: { type: Boolean, required: false, default: false },
                    roleCreate: { type: Boolean, required: false, default: false },
                    roleDelete: { type: Boolean, required: false, default: false },
                    roleUpdate: { type: Boolean, required: false, default: false },
                    guildUpdate: { type: Boolean, required: false, default: false },
                },
            },
            memberEvents: {
                enabled: { type: Boolean, required: false, default: false },
                channel: { type: String, required: false, default: '' },
                color: { type: String, required: false, default: '#000000' },
                events: {
                    memberJoin: { type: Boolean, required: false, default: false },
                    memberLeave: { type: Boolean, required: false, default: false },
                    rolesUpdate: { type: Boolean, required: false, default: false },
                    nicknameUpdate: { type: Boolean, required: false, default: false },
                },
            },
            messageEvents: {
                enabled: { type: Boolean, required: false, default: false },
                channel: { type: String, required: false, default: '' },
                color: { type: String, required: false, default: '#000000' },
                events: {
                    messageDelete: { type: Boolean, required: false, default: false },
                    messageUpdate: { type: Boolean, required: false, default: false },
                    messagePin: { type: Boolean, required: false, default: false },
                },
            },
        },
        chatFilter: {
            enabled: { type: Boolean, required: false, default: false },
            logChannel: { type: String, required: false, default: '' },
            words: { type: [String], required: false, default: [] },
            bypassRoles: { type: [String], required: false, default: [] },
            bypassUsers: { type: [String], required: false, default: [] },
            bypassChannels: { type: [String], required: false, default: [] },
        },
        verification: {
            enabled: { type: Boolean, required: false, default: false },
            channel: { type: String, required: false, default: '' },
            message: { type: String, required: false, default: 'Click the button below to get verified and have access to all channels.' },
            buttonLabel: { type: String, required: false, default: 'Verify' },
            rolesToAdd: { type: [String], required: false, default: [] },
            rolesToRemove: { type: [String], required: false, default: [] },
            embed: {
                enabled: { type: Boolean, required: false, default: false },
                title: { type: String, required: false, default: 'Verify yourself' },
                description: { type: String, required: false, default: 'Click the button below to get verified and have access to all channels.' },
                color: { type: String, required: false, default: '#000000' },
                thumbnail: { type: String, required: false, default: '' },
                titleUrl: { type: String, required: false, default: '' },
                image: { type: String, required: false, default: '' },
                author: {
                    name: { type: String, required: false, default: '' },
                    icon_url: { type: String, required: false, default: '' },
                    url: { type: String, required: false, default: '' },
                },
                footer: {
                    text: { type: String, required: false, default: '' },
                    icon_url: { type: String, required: false, default: '' },
                },
            },
        },
        suggest: {
            enabled: { type: Boolean, required: false, default: false },
            channel: { type: String, required: false, default: '' },
            staffRoles: { type: [String], required: false, default: [] },
        },
        levels: {
            enabled: { type: Boolean, required: false, default: false },
            channel: { type: String, required: false, default: 'current' },
            message: { type: String, required: false, default: 'GG {user}, you just advanced to level {level}!' },
            roleRewards: [{
                    level: { type: Number, required: false, default: 0 },
                    role: { type: String, required: false, default: '' },
                }],
            roleRewadsStack: { type: Boolean, required: false, default: true },
            xpRate: { type: Number, required: false, default: 1 },
            noXpRoles: { type: [String], required: false, default: [] },
            noXpChannels: { type: [String], required: false, default: [] },
        },
    },
    commands: {
        administration: {
            chatbot: { type: Boolean, required: false, default: false },
            autoreact: { type: Boolean, required: false, default: false },
        },
        tickets: {
            add: { type: Boolean, required: false, default: true },
            remove: { type: Boolean, required: false, default: true },
            close: { type: Boolean, required: false, default: true },
            delete: { type: Boolean, required: false, default: false },
            reopen: { type: Boolean, required: false, default: false },
            transcript: { type: Boolean, required: false, default: false },
            claim: { type: Boolean, required: false, default: false },
            unclaim: { type: Boolean, required: false, default: false },
            lock: { type: Boolean, required: false, default: false },
            unlock: { type: Boolean, required: false, default: false },
        },
        moderation: {
            ban: { type: Boolean, required: false, default: true },
            kick: { type: Boolean, required: false, default: true },
            warn: { type: Boolean, required: false, default: true },
            timeout: { type: Boolean, required: false, default: true },
            clear: { type: Boolean, required: false, default: true },
            warnings: { type: Boolean, required: false, default: true },
            clearwarns: { type: Boolean, required: false, default: true },
            slowmode: { type: Boolean, required: false, default: true },
        },
        verification: {
            verify: { type: Boolean, required: false, default: false },
        },
        levels: {
            rank: { type: Boolean, required: false, default: true },
            leaderboard: { type: Boolean, required: false, default: true },
        }
    },
    leaves: { type: [Object], required: false, default: [] },
});
exports.default = mongoose_1.default.model('guilds', GuildSchema);

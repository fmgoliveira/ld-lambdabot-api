"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLevelsSettings = exports.getLevelsSettings = exports.postVerificationSettings = exports.getVerificationSettings = exports.postChatFilterSettings = exports.getChatFilterSettings = exports.postLoggingSettings = exports.getLoggingSettings = exports.postAltDetectionSettings = exports.getAltDetectionSettings = exports.postModerationSettings = exports.getModerationSettings = exports.postTicketsSettings = exports.getTicketsSettings = exports.postAutorolesSettings = exports.getAutorolesSettings = exports.postLeaveSettings = exports.getLeaveSettings = exports.postWelcomeSettings = exports.getWelcomeSettings = exports.postAdministrationSettings = exports.getAdministrationSettings = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const discord_js_3 = require("discord.js");
const client_1 = require("../../client");
const methods_1 = require("../../client/methods");
const schemas_1 = require("../../database/schemas");
const functions_1 = require("../../utils/functions");
const placeholderReplace_1 = tslib_1.__importDefault(require("../../utils/placeholderReplace"));
async function getAdministrationSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.administration;
    const commands = guild.commands.administration;
    return { settings, commands };
}
exports.getAdministrationSettings = getAdministrationSettings;
async function postAdministrationSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    guild.modules.administration = data.settings;
    guild.commands.administration = data.commands;
    await guild.save();
    return guild;
}
exports.postAdministrationSettings = postAdministrationSettings;
async function getWelcomeSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.welcome;
    return { settings };
}
exports.getWelcomeSettings = getWelcomeSettings;
async function postWelcomeSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (!data)
        return null;
    const embed = (0, functions_1.validEmbed)(data.settings.embed);
    if (embed.error)
        return { error: embed.error };
    if (data.settings.enabled && !data.settings.channel)
        return { error: "You must specify a channel." };
    if (!data.settings.message && !data.settings.embed.enabled)
        return { error: "You must specify a message or an embed." };
    if (data.settings.enabled) {
        const botHasPermissions = (0, methods_1.checkForBotPermissionInChannel)(data.settings.channel, "SEND_MESSAGES");
        if (botHasPermissions === 0)
            return { error: "The channel you specified is not valid." };
        if (botHasPermissions === 1)
            return { error: "The bot does not have permission to send messages in the channel you specified." };
    }
    ;
    guild.modules.welcome = data.settings;
    await guild.save();
    return { guild, error: null };
}
exports.postWelcomeSettings = postWelcomeSettings;
async function getLeaveSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.leave;
    return { settings };
}
exports.getLeaveSettings = getLeaveSettings;
async function postLeaveSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const embed = (0, functions_1.validEmbed)(data.settings.embed);
    if (embed.error)
        return { error: embed.error };
    if (data.settings.enabled && !data.settings.channel)
        return { error: "You must specify a channel." };
    if (!data.settings.message && !data.settings.embed.enabled)
        return { error: "You must specify a message or an embed." };
    if (data.settings.enabled) {
        const botHasPermissions = (0, methods_1.checkForBotPermissionInChannel)(data.settings.channel, "SEND_MESSAGES");
        if (botHasPermissions === 0)
            return { error: "The channel you specified is not valid." };
        if (botHasPermissions === 1)
            return { error: "The bot does not have permission to send messages in the channel you specified." };
    }
    ;
    guild.modules.welcome = data.settings;
    await guild.save();
    return { guild, error: null };
}
exports.postLeaveSettings = postLeaveSettings;
async function getAutorolesSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.autoroles;
    return { settings };
}
exports.getAutorolesSettings = getAutorolesSettings;
async function postAutorolesSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    guild.modules.autoroles = data.settings;
    await guild.save();
    return { guild, error: null };
}
exports.postAutorolesSettings = postAutorolesSettings;
async function getTicketsSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.tickets;
    const commands = guild.commands.tickets;
    return { settings, commands };
}
exports.getTicketsSettings = getTicketsSettings;
async function postTicketsSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (data.settings.enabled) {
        const botHasPermissionsInLogChannel = (0, methods_1.checkForBotPermissionInChannel)(data.settings.logChannel, "SEND_MESSAGES");
        if (botHasPermissionsInLogChannel === 0)
            return { error: "The log channel you specified is not valid." };
        if (botHasPermissionsInLogChannel === 1)
            return { error: "The bot does not have permission to send messages in the log channel you specified." };
        const botHasPermissionsInClosedCategory = (0, methods_1.checkForBotPermissionInCategory)(data.settings.logChannel, "MANAGE_CHANNELS");
        if (botHasPermissionsInClosedCategory === 0)
            return { error: "The closed category you specified is not valid." };
        if (botHasPermissionsInClosedCategory === 1)
            return { error: "The bot does not have permission to manage channels in the closed category you specified." };
        const botHasPermissionsInPanelMessageChannel = (0, methods_1.checkForBotPermissionInChannel)(data.settings.panelMessage.channel, "SEND_MESSAGES");
        if (botHasPermissionsInPanelMessageChannel === 0)
            return { error: "The panel message channel you specified is not valid." };
        if (botHasPermissionsInPanelMessageChannel === 1)
            return { error: "The bot does not have permission to send messages in the panel message channel you specified." };
        if (data.settings.categories.length === 0)
            return { error: "You must specify at least one category." };
        if (data.settings.categories.length > 5)
            return { error: "You can only have a maximum of 5 categories." };
        data.settings.categories.forEach((category) => {
            const botHasPermissionsInCategoryChannel = (0, methods_1.checkForBotPermissionInCategory)(category.categoryChannel, "MANAGE_CHANNELS");
            if (botHasPermissionsInCategoryChannel === 0)
                return { error: "The category channel you specified is not valid." };
            if (botHasPermissionsInCategoryChannel === 1)
                return { error: "The bot does not have permission to manage channels in the category channel you specified." };
            if (category.welcomeMessage.message.length > 4096)
                return { error: "The welcome message you specified is too long." };
            if (category.welcomeMessage.message.length < 1)
                return { error: "The welcome message you specified is too short." };
        });
        const prevData = guild.modules.tickets;
        if (prevData.panelMessage.message !== data.settings.panelMessage.message) {
            const channel = client_1.client.channels.cache.get(data.settings.panelMessage.channel);
            if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT')) {
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(data.settings.panelMessage.message.title)
                    .setDescription((0, placeholderReplace_1.default)(data.settings.panelMessage.message.description, { name: guild.guildName, id: guild.guildId }))
                    .setColor(parseInt(data.settings.panelMessage.message.color.replace('#', ''), 16));
                if (data.settings.panelMessage.message.thumbnail)
                    embed.setThumbnail(data.settings.panelMessage.message.thumbnail);
                if (data.settings.panelMessage.message.titleUrl)
                    embed.setURL(data.settings.panelMessage.message.titleUrl);
                if (data.settings.panelMessage.message.image)
                    embed.setImage(data.settings.panelMessage.message.image);
                if (data.settings.panelMessage.message.timestamp)
                    embed.setTimestamp();
                let components = null;
                if (data.settings.categories.length > 0) {
                    components = new discord_js_3.MessageActionRow();
                    data.settings.categories.forEach((category) => {
                        components.addComponents(new discord_js_2.MessageButton()
                            .setLabel(category.label)
                            .setCustomId(`ticket-create-${category.label.toLowerCase().replaceAll(' ', '-')}`)
                            .setEmoji('📨')
                            .setStyle('SECONDARY'));
                    });
                }
                const prevChannel = client_1.client.channels.cache.get(prevData.panelMessage.channel);
                if (prevChannel && (prevChannel.type === 'GUILD_NEWS' || prevChannel.type === 'GUILD_TEXT')) {
                    const oldMessage = await prevChannel.messages.fetch(prevData.panelMessage.id);
                    if (oldMessage)
                        oldMessage.deletable ? oldMessage.delete().catch((err) => console.log(err)) : null;
                }
                try {
                    const message = await channel.send({
                        embeds: [embed],
                        components: components ? [components] : undefined,
                    });
                    data.settings.panelMessage.id = message.id;
                    data.settings.panelMessage.url = message.url;
                }
                catch (err) {
                    return { error: "There was an error sending the panel message. Please make sure the bot has permissions and try again." };
                }
            }
        }
    }
    if (!data.settings.panelMessage.id)
        data.settings.panelMessage.id = guild.modules.tickets.panelMessage.id;
    if (!data.settings.panelMessage.url)
        data.settings.panelMessage.url = guild.modules.tickets.panelMessage.url;
    guild.modules.tickets = data.settings;
    guild.commands.tickets = data.commands;
    await guild.save();
    return { guild, error: null };
}
exports.postTicketsSettings = postTicketsSettings;
async function getModerationSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.moderation;
    const commands = guild.commands.moderation;
    return { settings, commands };
}
exports.getModerationSettings = getModerationSettings;
async function postModerationSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    guild.modules.moderation = data.settings;
    guild.commands.moderation = data.commands;
    await guild.save();
    return { guild, error: null };
}
exports.postModerationSettings = postModerationSettings;
async function getAltDetectionSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.altDetection;
    return { settings };
}
exports.getAltDetectionSettings = getAltDetectionSettings;
async function postAltDetectionSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (data.settings.enabled) {
        const botHasPermissions = (0, methods_1.checkForBotPermissionInChannel)(data.settings.logChannel, "SEND_MESSAGES");
        if (botHasPermissions === 0)
            return { error: "The log channel you specified is not valid." };
        if (botHasPermissions === 1)
            return { error: "The bot does not have permission to send messages in the log channel you specified." };
    }
    ;
    guild.modules.altDetection = data.settings;
    await guild.save();
    return { guild, error: null };
}
exports.postAltDetectionSettings = postAltDetectionSettings;
async function getLoggingSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.logging;
    return { settings };
}
exports.getLoggingSettings = getLoggingSettings;
async function postLoggingSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (data.settings.enabled) {
        const botHasPermissionsInModerationLogChannel = (0, methods_1.checkForBotPermissionInChannel)(data.settings.moderation.channel, "SEND_MESSAGES");
        if (botHasPermissionsInModerationLogChannel === 0)
            return { error: "The log channel you specified for moderation logging is not valid." };
        if (botHasPermissionsInModerationLogChannel === 1)
            return { error: "The bot does not have permission to send messages in the log channel you specified for moderation logging." };
        const botHasPermissionsInServerEventsLogChannel = (0, methods_1.checkForBotPermissionInChannel)(data.settings.serverEvents.channel, "SEND_MESSAGES");
        if (botHasPermissionsInServerEventsLogChannel === 0)
            return { error: "The log channel you specified for server events logging is not valid." };
        if (botHasPermissionsInServerEventsLogChannel === 1)
            return { error: "The bot does not have permission to send messages in the log channel you specified for server events logging." };
        const botHasPermissionsInMemberEventsLogChannel = (0, methods_1.checkForBotPermissionInChannel)(data.settings.memberEvents.channel, "SEND_MESSAGES");
        if (botHasPermissionsInMemberEventsLogChannel === 0)
            return { error: "The log channel you specified for member events logging is not valid." };
        if (botHasPermissionsInMemberEventsLogChannel === 1)
            return { error: "The bot does not have permission to send messages in the log channel you specified for member events logging." };
        const botHasPermissionsInMessageEventsLogChannel = (0, methods_1.checkForBotPermissionInChannel)(data.settings.messageEvents.channel, "SEND_MESSAGES");
        if (botHasPermissionsInMessageEventsLogChannel === 0)
            return { error: "The log channel you specified for message events logging is not valid." };
        if (botHasPermissionsInMessageEventsLogChannel === 1)
            return { error: "The bot does not have permission to send messages in the log channel you specified for message events logging." };
    }
    ;
    guild.modules.logging = data.settings;
    await guild.save();
    return { guild, error: null };
}
exports.postLoggingSettings = postLoggingSettings;
async function getChatFilterSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.chatFilter;
    return { settings };
}
exports.getChatFilterSettings = getChatFilterSettings;
async function postChatFilterSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (data.settings.enabled) {
        const botHasPermissions = (0, methods_1.checkForBotPermissionInChannel)(data.settings.logChannel, "SEND_MESSAGES");
        if (botHasPermissions === 0)
            return { error: "The log channel you specified is not valid." };
        if (botHasPermissions === 1)
            return { error: "The bot does not have permission to send messages in the log channel you specified." };
    }
    ;
    guild.modules.chatFilter = data.settings;
    await guild.save();
    return { guild, error: null };
}
exports.postChatFilterSettings = postChatFilterSettings;
async function getVerificationSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.verification;
    const commands = guild.commands.verification;
    return { settings, commands };
}
exports.getVerificationSettings = getVerificationSettings;
async function postVerificationSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const embed = (0, functions_1.validEmbed)(data.settings.embed);
    if (embed.error)
        return { error: embed.error };
    if (data.settings.enabled && !data.settings.channel)
        return { error: "You must specify a channel." };
    if (!data.settings.message && !data.settings.embed.enabled)
        return { error: "You must specify a message or an embed." };
    if (data.settings.enabled) {
        const botHasPermissions = (0, methods_1.checkForBotPermissionInChannel)(data.settings.channel, "SEND_MESSAGES");
        if (botHasPermissions === 0)
            return { error: "The channel you specified is not valid." };
        if (botHasPermissions === 1)
            return { error: "The bot does not have permission to send messages in the channel you specified." };
        const prevData = guild.modules.verification;
        if (!prevData.embed.enabled && !data.settings.embed.enabled) {
            if (prevData.message !== data.settings.message) {
                const channel = client_1.client.channels.cache.get(data.settings.channel);
                if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT'))
                    channel.send({
                        content: data.settings.message,
                        components: [
                            new discord_js_3.MessageActionRow().addComponents(new discord_js_2.MessageButton().setLabel(data.settings.buttonLabel).setStyle('SUCCESS').setCustomId('verification-verify').setEmoji('<:check:942750762256175145>')),
                        ],
                    }).catch((err) => { return { error: 'Could not send the verification panel message. Make sure the bot has permissions and try again.' }; });
            }
        }
        else if (prevData.embed.enabled && !data.settings.embed.enabled) {
            if (prevData.embed === data.settings.embed) {
                const channel = client_1.client.channels.cache.get(data.settings.channel);
                if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT'))
                    channel.send({
                        embeds: [
                            {
                                title: data.settings.embed.title,
                                description: data.settings.embed.description,
                                color: parseInt(data.settings.embed.color.replace('#', ''), 16),
                                thumbnail: {
                                    url: data.settings.embed.thumbnail,
                                },
                                url: data.settings.embed.titleUrl,
                                author: {
                                    name: data.settings.embed.author.name,
                                    icon_url: data.settings.embed.author.icon_url,
                                    url: data.settings.embed.author.url,
                                },
                                image: {
                                    url: data.settings.embed.image,
                                },
                                footer: {
                                    text: data.settings.embed.footer.text,
                                    icon_url: data.settings.embed.footer.icon_url,
                                },
                            },
                        ],
                        components: [
                            new discord_js_3.MessageActionRow().addComponents(new discord_js_2.MessageButton().setLabel(data.settings.buttonLabel).setStyle('SUCCESS').setCustomId('verification-verify').setEmoji('<:check:942750762256175145>')),
                        ],
                    }).catch((err) => { return { error: 'Could not send the verification panel message. Make sure the bot has permissions and try again.' }; });
            }
        }
        else if (!prevData.embed.enabled && data.settings.embed.enabled) {
            const channel = client_1.client.channels.cache.get(data.settings.channel);
            if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT'))
                channel.send({
                    embeds: [
                        {
                            title: data.settings.embed.title,
                            description: data.settings.embed.description,
                            color: parseInt(data.settings.embed.color.replace('#', ''), 16),
                            thumbnail: {
                                url: data.settings.embed.thumbnail,
                            },
                            url: data.settings.embed.titleUrl,
                            author: {
                                name: data.settings.embed.author.name,
                                icon_url: data.settings.embed.author.icon_url,
                                url: data.settings.embed.author.url,
                            },
                            image: {
                                url: data.settings.embed.image,
                            },
                            footer: {
                                text: data.settings.embed.footer.text,
                                icon_url: data.settings.embed.footer.icon_url,
                            },
                        },
                    ],
                    components: [
                        new discord_js_3.MessageActionRow().addComponents(new discord_js_2.MessageButton().setLabel(data.settings.buttonLabel).setStyle('SUCCESS').setCustomId('verification-verify').setEmoji('<:check:942750762256175145>')),
                    ],
                }).catch((err) => { return { error: 'Could not send the verification panel message. Make sure the bot has permissions and try again.' }; });
        }
        else if (prevData.embed.enabled && !data.settings.embed.enabled) {
            const channel = client_1.client.channels.cache.get(data.settings.channel);
            if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT'))
                channel.send({
                    content: data.settings.message,
                    components: [
                        new discord_js_3.MessageActionRow().addComponents(new discord_js_2.MessageButton().setLabel(data.settings.buttonLabel).setStyle('SUCCESS').setCustomId('verification-verify').setEmoji('<:check:942750762256175145>')),
                    ],
                }).catch((err) => { return { error: 'Could not send the verification panel message. Make sure the bot has permissions and try again.' }; });
        }
    }
    ;
    guild.modules.verification = data.settings;
    guild.commands.verification = data.commands;
    await guild.save();
    return { guild, error: null };
}
exports.postVerificationSettings = postVerificationSettings;
async function getLevelsSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.levels;
    const commands = guild.commands.levels;
    return { settings, commands };
}
exports.getLevelsSettings = getLevelsSettings;
async function postLevelsSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (!data.settings.message)
        return { error: "You must specify a message to send on level up." };
    if (data.settings.message.length > 2000)
        return { error: "The message you specified is too long." };
    if (data.settings.enabled && !['current', 'dm'].includes(data.settings.channel)) {
        const botHasPermissions = (0, methods_1.checkForBotPermissionInChannel)(data.settings.channel, "SEND_MESSAGES");
        if (botHasPermissions === 0)
            return { error: "The channel you specified is not valid." };
        if (botHasPermissions === 1)
            return { error: "The bot does not have permission to send messages in the channel you specified." };
    }
    ;
    guild.modules.levels = data.settings;
    guild.commands.levels = data.commands;
    await guild.save();
    return { guild, error: null };
}
exports.postLevelsSettings = postLevelsSettings;

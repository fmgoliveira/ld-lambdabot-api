"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActionLog = exports.validEmbed = exports.validURL = void 0;
const schemas_1 = require("../database/schemas");
const validURL = (str) => {
    try {
        new URL(str);
    }
    catch (_) {
        return false;
    }
    return true;
};
exports.validURL = validURL;
const validEmbed = (embed) => {
    if (embed.enabled) {
        if (embed.title.length > 256)
            return { error: "Title is too long. Title length must be lower than 256 characters." };
        if (embed.description.length > 4096)
            return { error: "Description is too long. Description length must be lower than 4096 characters." };
        if (embed.author.name.length > 256)
            return { error: "Author name is too long. Author name length must be lower than 256 characters." };
        if (embed.footer.text.length > 2048)
            return { error: "Footer text is too long. Footer text length must be lower than 2048 characters." };
        if (embed.title.length + embed.author.name.length + embed.footer.text.length + embed.description.length > 6000)
            return { error: "Embed is too long. Embed length must be lower than 6000 characters." };
        if (!embed.title && !embed.description)
            return { error: "Title and description cannot be both empty." };
        if (embed.author.icon_url && !embed.author.name)
            return { error: "Author name cannot be empty if author icon is set." };
        if (embed.author.url && !embed.author.name)
            return { error: "Author name cannot be empty if author url is set." };
        if (embed.footer.icon_url && !embed.footer.text)
            return { error: "Footer text cannot be empty if footer icon is set." };
        if (!(0, exports.validURL)(embed.titleUrl))
            return { error: "Title URL is not a valid URL." };
        if (!(0, exports.validURL)(embed.image))
            return { error: "Image URL is not a valid URL." };
        if (!(0, exports.validURL)(embed.thumbnail))
            return { error: "Thumbnail URL is not a valid URL." };
        if (!(0, exports.validURL)(embed.author.icon_url))
            return { error: "Author icon URL is not a valid URL." };
        if (!(0, exports.validURL)(embed.footer.icon_url))
            return { error: "Footer icon URL is not a valid URL." };
    }
    return { error: null };
};
exports.validEmbed = validEmbed;
const createActionLog = async (guildId, user, module) => {
    let action = '';
    switch (module) {
        case 'administration': {
            action = 'Updated administration module settings.';
            break;
        }
        case 'welcome': {
            action = 'Updated welcome module settings.';
            break;
        }
        case 'leave': {
            action = 'Updated leave module settings.';
            break;
        }
        case 'autoroles': {
            action = 'Updated autoroles module settings.';
            break;
        }
        case 'tickets': {
            action = 'Updated tickets module settings.';
            break;
        }
        case 'moderation': {
            action = 'Updated moderation module settings.';
            break;
        }
        case 'alt detection': {
            action = 'Updated alt detection module settings.';
            break;
        }
        case 'logging': {
            action = 'Updated logging module settings.';
            break;
        }
        case 'chat filter': {
            action = 'Updated chat filter module settings.';
            break;
        }
        case 'verification': {
            action = 'Updated verification module settings.';
            break;
        }
        case 'levels': {
            action = 'Updated levels module settings.';
            break;
        }
        default: {
            action = 'Updated non-specific settings.';
            break;
        }
    }
    ;
    await schemas_1.Logs.create({
        guildId,
        action,
        module,
        timestamp: Date.now().toString(),
        user: {
            id: user.discordId,
            username: user.discordUsername,
            discriminator: user.discordDiscriminator,
            avatar: user.discordAvatar,
        },
    });
};
exports.createActionLog = createActionLog;

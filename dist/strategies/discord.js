"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_1 = tslib_1.__importDefault(require("passport"));
const passport_discord_1 = require("passport-discord");
const schemas_1 = require("../database/schemas");
passport_1.default.serializeUser((user, done) => {
    return done(null, user.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await schemas_1.User.findById(id);
        return user ? done(null, user) : done(null, null);
    }
    catch (err) {
        console.log(err);
        return done(err, null);
    }
});
passport_1.default.use(new passport_discord_1.Strategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_REDIRECT_URL,
    scope: ['identify', 'email', 'guilds'],
}, async (accessToken, refreshToken, profile, done) => {
    const { id, username, discriminator, avatar, email } = profile;
    try {
        const existingUser = await schemas_1.User.findOneAndUpdate({ discordId: id }, {
            discordAvatar: avatar,
            discordDiscriminator: discriminator,
            discordUsername: username,
            email,
            accessToken,
            refreshToken
        }, { new: true });
        if (existingUser)
            return done(null, existingUser);
        const newUser = new schemas_1.User({
            discordId: id,
            discordAvatar: avatar,
            discordDiscriminator: discriminator,
            discordUsername: username,
            email,
            accessToken,
            refreshToken,
        });
        const savedUser = await newUser.save();
        return done(null, savedUser);
    }
    catch (err) {
        console.log(err);
        return done(err, undefined);
    }
}));

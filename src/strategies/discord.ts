import passport from 'passport';
import { Profile, Strategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';
import { User } from '../database/schemas';

passport.serializeUser((user: any, done) => {
  return done(null, user.id);
})
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    return user ? done(null, user) : done(null, null);
  } catch (err) {
    console.log(err);
    return done(err, null);
  }
})

passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      callbackURL: process.env.DISCORD_REDIRECT_URL,
      scope: ['identify', 'email', 'guilds'],
    }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      const { id, username, discriminator, avatar, email } = profile;

      try {
        const existingUser = await User.findOneAndUpdate(
          { discordId: id },
          {
            discordAvatar: avatar,
            discordDiscriminator: discriminator,
            discordUsername: username,
            email,

            accessToken,
            refreshToken
          },
          { new: true },
        );

        if (existingUser) return done(null, existingUser);

        const newUser = new User({
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
      } catch (err) {
        console.log(err);
        return done(err as any, undefined)
      }
    }
  )
);
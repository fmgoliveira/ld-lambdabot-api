import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { Guild } from "../database/schemas";
import { User } from "../database/schemas/User";
import { getBotGuildsService, getUserGuildsService } from "../services/guilds";
import { DISCORD_API_URL } from "./constants";
import { PartialGuild } from "./types";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => req.user ? next() : res.status(403).send({ msg: "Unauthorised" });

export const storedGuildSetup = async (req: Request, res: Response, next: NextFunction) => {
  const guildId = req.params.guildId;
  const storedGuild = await Guild.findOne({ guildId });

  if (!storedGuild) {
    const user = req.user as User;
    const { data: guilds } = await getUserGuildsService(user.id);
    const guild = guilds.filter((g: PartialGuild) => g.id === guildId)[0];

    const newStoredGuild = new Guild({
      guildId,
      guildName: guild.name,
      guildIcon: guild.icon,
      guildOwner: guild.owner === true ? user.id : guild.owner,
    });
    await newStoredGuild.save();
  }

  next();
}

export const isAllowed = async (req: Request, res: Response, next: NextFunction) => {
  const guildId = req.params.guildId;
  if (!guildId) return next();
  const user = req.user as User;

  const { data: userGuilds } = await getUserGuildsService(user.id);
  const { data: botGuilds } = await getBotGuildsService();

  const guild = userGuilds.filter((g: PartialGuild) => g.id === guildId)[0];
  const botGuild = botGuilds.filter((g: PartialGuild) => g.id === guildId)[0];

  if (!guild) return res.status(404).send({ msg: "Guild not found" });
  if (!botGuild) return res.status(404).send({ msg: "Guild not found" });
  if (!guild.owner && (parseInt(guild.permissions) & 0x8) !== 0x8 && (parseInt(guild.permissions) & 0x20) !== 0x20) return res.status(403).send({ msg: "Unauthorised" });

  next();
}
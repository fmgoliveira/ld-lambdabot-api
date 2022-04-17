import axios from 'axios';
import { Guild } from 'discord.js';
import { User } from '../../database/schemas';
import { DISCORD_API_URL } from '../../utils/constants';
import { PartialChannel, PartialGuild, PartialMember, PartialRole } from '../../utils/types';

export function getBotGuildsService() {
  return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` }
  });
}

export async function getUserGuildsService(id: string) {
  const user = await User.findById(id);

  if (!user) throw new Error('No user found');

  return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${user.accessToken}` }
  });
}

export async function getMutualGuildsService(id: string) {
  const { data: botGuilds } = await getBotGuildsService();
  const { data: userGuilds } = await getUserGuildsService(id);

  let guildArray: PartialGuild[] = userGuilds.map((guild: PartialGuild) => guild);

  guildArray.forEach((guild: PartialGuild) => {
    guild.botIn = botGuilds.some((g: PartialGuild) => g.id === guild.id);
    if (guild.owner) return guild.role = 'owner';
    if (((parseInt(guild.permissions) & 0x8) === 0x8)) return guild.role = 'admin';
    if (((parseInt(guild.permissions) & 0x20) === 0x20)) return guild.role = 'manager';
    return guild.role = 'none'
  });

  return guildArray.filter((guild: PartialGuild) => guild.role !== 'none');

}

export async function getGuildChannels(guildId: string) {
  const { data: channels } = await axios.get<PartialChannel[]>(`${DISCORD_API_URL}/guilds/${guildId}/channels`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  });

  return channels.filter((channel: PartialChannel) => [0, 5].includes(channel.type));
}

export async function getGuildCategories(guildId: string) {
  const { data: channels } = await axios.get<PartialChannel[]>(`${DISCORD_API_URL}/guilds/${guildId}/channels`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  });

  return channels.filter((channel: PartialChannel) => channel.type === 4);
}

export async function getGuildRoles(guildId: string) {
  const { data: roles } = await axios.get<PartialRole[]>(`${DISCORD_API_URL}/guilds/${guildId}/roles`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  });

  return roles;
}

export async function getGuildMembers(guildId: string) {
  let members: PartialMember[] = [];
  let membersFetch: PartialMember[] = [];
  let after: string | undefined;

  do {
    membersFetch = (await axios.get<PartialMember[]>(`${DISCORD_API_URL}/guilds/${guildId}/members?limit=1000${after ? "&after=" + after : ""}`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    })).data;

    after = membersFetch[membersFetch.length - 1].user?.id;
    members.push(...membersFetch);
  } while (membersFetch.length === 1000);

  return members;
}
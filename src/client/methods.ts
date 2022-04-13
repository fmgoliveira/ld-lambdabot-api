import { TextBasedChannel } from 'discord.js';
import { PermissionString } from 'discord.js';
import { client } from '.';

export const checkForBotPermissionInChannel = (channelId: string, permission: PermissionString) => {
  const channel = client.channels.cache.find(c => c.id === channelId && c.isText());
  if (!channel) return 0;
  if (channel.type !== 'GUILD_TEXT' && channel.type !== 'GUILD_NEWS') return 0;

  return channel.permissionsFor(process.env.DISCORD_CLIENT_ID!)?.has(permission) ? 2 : 1;
}

export const checkForBotPermissionInCategory = (categoryId: string, permission: PermissionString) => {
  const channel = client.channels.cache.find(c => c.id === categoryId);
  if (!channel) return 0;
  if (channel.type !== 'GUILD_CATEGORY') return 0;

  return channel.permissionsFor(process.env.DISCORD_CLIENT_ID!)?.has(permission) ? 2 : 1;
}

export const checkForBotPermissionManageRole = (roleId: string, guildId: string) => {
  const guild = client.guilds.cache.get(guildId);
  if (!guild) return 0;

  const role = guild.roles.cache.find(r => r.id === roleId);
  if (!role) return 0;
  const rolePosition = role.position;

  if (guild.me?.permissions.has('MANAGE_ROLES') && rolePosition < guild.me?.roles.highest?.position) return 2;
  else return 1;
}
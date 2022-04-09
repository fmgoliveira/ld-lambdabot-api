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
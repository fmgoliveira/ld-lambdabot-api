import axios from 'axios';
import { User } from '../../database/schemas';
import { DISCORD_API_URL } from '../../utils/constants';
import { PartialGuild } from '../../utils/types';

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

  const ownerUserGuilds = userGuilds.filter(
    (guild) => guild.owner
  );
  const mutualOwnerGuilds = ownerUserGuilds.filter((guild) =>
    botGuilds.some((botGuild) => botGuild.id === guild.id)
  );

  const adminUserGuilds = userGuilds.filter(
    (guild) => ((parseInt(guild.permissions) & 0x8) === 0x8) && !guild.owner
  );
  const mutualAdminGuilds = adminUserGuilds.filter((guild) =>
    botGuilds.some((botGuild) => botGuild.id === guild.id)
  );

  const managerUserGuilds = userGuilds.filter(
    (guild) => ((parseInt(guild.permissions) & 0x20) === 0x20) && ((parseInt(guild.permissions) & 0x8) !== 0x8) && !guild.owner
  );
  const mutualManagerGuilds = managerUserGuilds.filter((guild) =>
    botGuilds.some((botGuild) => botGuild.id === guild.id)
  );

  return {
    ownerUserGuilds,
    mutualOwnerGuilds,
    adminUserGuilds,
    mutualAdminGuilds,
    managerUserGuilds,
    mutualManagerGuilds
  }

}
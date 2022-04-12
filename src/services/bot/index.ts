import { client } from "../../client";

export function getBotStatusService() {
  const guildCount = client.guilds.cache.size;
  const userCount = client.users.cache.size;
  const channelCount = client.channels.cache.size;
  const shardCount = client.shard?.count || 0;

  let memberCount = 0;
  client.guilds.cache.forEach(guild => {
    if (guild.members.cache.has(client.user!.id)) memberCount += guild.memberCount;
  });

  let memberCountStr = String(memberCount);
  let guildCountStr = String(guildCount);

  if (memberCountStr.length >= 4) {
    memberCountStr = `${memberCountStr.slice(0, -3)} K+`;
  };
  if (memberCountStr.length >= 7) {
    memberCountStr = `${memberCountStr.slice(0, -6)} M+`;
  };

  if (guildCountStr.length >= 4) {
    guildCountStr = `${guildCountStr.slice(0, -3)} K+`;
  };
  if (guildCountStr.length >= 7) {
    guildCountStr = `${guildCountStr.slice(0, -6)} M+`;
  };

  return {
    guildCount,
    userCount,
    channelCount,
    shardCount,
    memberCountStr,
    guildCountStr,
  };
}
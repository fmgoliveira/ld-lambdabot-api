import { PartialGuild } from "./types";

export default (string: string, guild: { name: string; id: string; }) => {
  let temp = string;

  temp = temp.replace("{guild}", `${guild.name}`);
  temp = temp.replace("{guild_name}", `${guild.name}`);
  temp = temp.replace("{guild_id}", `${guild.id}`);

  return temp;
}
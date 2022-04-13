import axios from "axios"
import { MessageEmbed } from "discord.js";
import { DISCORD_API_URL } from "../../utils/constants"

export const sendLogsWebhook = (login: boolean, logout: boolean, user: any) => {
  const embed = new MessageEmbed()
    .setColor(login && !logout ? "GREEN" : "RED")
    .setTitle(login && !logout ? "Login Log" : "Logout Log")
    .setDescription(`A user has logged ${login && !logout ? "in into" : "out from"} their account.`)
    .addField("User", `${user.discordUsername}#${user.discordDiscriminator} (\`${user.discordId}\`)`)
    .addField("Time", `<t:${parseInt(String(Date.now() / 1000))}:R> - <t:${parseInt(String(Date.now() / 1000))}:F>`)
    .setFooter({ text: "Lambda Dashboard Logs"})

  axios.post(`${DISCORD_API_URL}/webhooks/${process.env.LOGS_WEBHOOK_ID}/${process.env.LOGS_WEBHOOK_TOKEN}`, {
    embeds: [embed],
  });
};
import { MessageEmbed } from "discord.js";
import { ColorResolvable } from "discord.js";
import { MessageButton } from "discord.js";
import { MessageActionRow } from "discord.js";
import { client } from "../../client";
import { checkForBotPermissionInCategory, checkForBotPermissionInChannel, checkForBotPermissionManageRole } from "../../client/methods";
import { Guild } from "../../database/schemas";
import { createActionLog, validEmbed } from "../../utils/functions";
import placeholderReplace from "../../utils/placeholderReplace";

export async function getAdministrationSettings(guildId: string | undefined) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  const settings = guild.modules.administration;
  const commands = guild.commands.administration;

  return { settings, commands };
}

export async function postAdministrationSettings(guildId: string | undefined, data: {
  settings: {
    chatbot: {
      enabled: boolean;
      channels: string[];
    };
    autoreact: {
      channel: string;
      emojis: string[];
    }[];
  };
  commands: {
    chatbot: boolean;
    autoreact: boolean;
    giveaway: {
      start: boolean;
      end: boolean;
      pause: boolean;
      unpause: boolean;
      reroll: boolean;
      delete: boolean;
    };
  }
}) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  if (!data) return null;

  if (data.settings.chatbot.enabled) {
    const errorArray = data.settings.chatbot.channels.map((channelId) => {
      const chatbotPerms = checkForBotPermissionInChannel(channelId, "SEND_MESSAGES");
      if (chatbotPerms === 1) return true;
      else if (chatbotPerms === 2) return false;
    });
    if (errorArray.some((error) => error === true)) return { error: "I don't have permission to send messages in at least one of the chatbot's specified channels." };
  };

  data.settings.autoreact.forEach(async (autoreactObj) => {
    const chatbotPerms = checkForBotPermissionInChannel(autoreactObj.channel, "ADD_REACTIONS");
    if (chatbotPerms === 1) return { error: "I don't have permission to react to messages in at least one of the autoreact's specified channels." };
  });

  guild.modules.administration = data.settings;
  guild.commands.administration = data.commands;

  await guild.save();

  return { guild, error: null };
}


export async function getWelcomeSettings(guildId: string | undefined) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  const welcome = {
    settings: guild.modules.welcome,
  };
  const leave = {
    settings: guild.modules.leave,
  };
  const autoroles = {
    settings: guild.modules.autoroles,
  };

  return { welcome, leave, autoroles };
}

export async function postWelcomeSettings(guildId: string | undefined, data: {
  settings: {
    enabled: boolean;
    channel: string;
    message: string;
    dm: boolean;
    embed: {
      enabled: boolean;
      title: string;
      description: string;
      color: string;
      thumbnail: string;
      titleUrl: string;
      image: string;
      author: {
        name: string;
        icon_url: string;
        url: string;
      };
      footer: {
        text: string;
        icon_url: string;
      };
    };
  };
}) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  if (!data) return null;

  const embed = validEmbed(data.settings.embed);
  if (embed.error) return { error: embed.error };
  if (data.settings.enabled && !data.settings.channel) return { error: "You must specify a channel." };
  if (!data.settings.message && !data.settings.embed.enabled) return { error: "You must specify a message or an embed." };

  if (data.settings.enabled) {
    const botHasPermissions: 0 | 1 | 2 = checkForBotPermissionInChannel(data.settings.channel, "SEND_MESSAGES");
    if (botHasPermissions === 0) return { error: "The channel you specified is not valid." };
    if (botHasPermissions === 1) return { error: "The bot does not have permission to send messages in the channel you specified." };
  };

  guild.modules.welcome = data.settings;

  await guild.save();

  return { guild, error: null };
}

export async function postLeaveSettings(guildId: string | undefined, data: {
  settings: {
    enabled: boolean;
    channel: string;
    message: string;
    dm: boolean;
    embed: {
      enabled: boolean;
      title: string;
      description: string;
      color: string;
      thumbnail: string;
      titleUrl: string;
      image: string;
      author: {
        name: string;
        icon_url: string;
        url: string;
      };
      footer: {
        text: string;
        icon_url: string;
      };
    };
  };
}) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  const embed = validEmbed(data.settings.embed);
  if (embed.error) return { error: embed.error };
  if (data.settings.enabled && !data.settings.channel) return { error: "You must specify a channel." };
  if (!data.settings.message && !data.settings.embed.enabled) return { error: "You must specify a message or an embed." };

  if (data.settings.enabled) {
    const botHasPermissions: 0 | 1 | 2 = checkForBotPermissionInChannel(data.settings.channel, "SEND_MESSAGES");
    if (botHasPermissions === 0) return { error: "The channel you specified is not valid." };
    if (botHasPermissions === 1) return { error: "The bot does not have permission to send messages in the channel you specified." };
  };

  guild.modules.leave = data.settings;

  await guild.save();

  return { guild, error: null };
}

export async function postAutorolesSettings(guildId: string | undefined, data: {
  settings: {
    enabled: boolean;
    userRoles: string[];
    botRoles: string[];
  };
}) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  if (data.settings.enabled) {
    const errorArray1 = data.settings.userRoles.map((role) => {
      const botPerms = checkForBotPermissionManageRole(role, guildId!);
      if (botPerms === 1) return true;
      else if (botPerms === 2) return false;
    });
    if (errorArray1.some((error) => error === true)) return { error: "I don't have permission to manage at least one of the specified user roles." };

    const errorArray2 = data.settings.botRoles.map((role) => {
      const botPerms = checkForBotPermissionManageRole(role, guildId!);
      if (botPerms === 1) return true;
      else if (botPerms === 2) return false;
    });
    if (errorArray2.some((error) => error === true)) return { error: "I don't have permission to manage at least one of the specified bot roles." };
  };

  guild.modules.autoroles = data.settings;

  await guild.save();

  return { guild, error: null };
}


export async function getTicketsSettings(guildId: string | undefined) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  const settings = guild.modules.tickets;
  const commands = guild.commands.tickets;

  return { settings, commands };
}

export async function postTicketsSettings(guildId: string | undefined, data: {
  deletePanelMessage?: boolean;
  settings: {
    enabled: boolean;
    panelMessage: {
      id?: string;
      url?: string;
      message: {
        title: string;
        description: string;
        color: string;
        thumbnail: string;
        titleUrl: string;
        image: string;
        timestamp: boolean;
      };
      channel: string;
    };
    logChannel: string;
    closedCategory: string;
    ticketCount: number;
    categories: {
      categoryChannel: string;
      label: string;
      maxTickets: number;
      supportRoles: string[];
      welcomeMessage: {
        message: string;
        color: string;
      };
      deleteOnClose: boolean;
      moveToClosedCategory: boolean;
    }[];
  };
  commands: {
    add: boolean;
    remove: boolean;
    close: boolean;
    transcript: boolean;
    reopen: boolean;
    delete: boolean;
    claim: boolean;
    unclaim: boolean;
    lock: boolean;
    unlock: boolean;
  };
}) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  if (data.deletePanelMessage) {
    const panelMessage = guild.modules.tickets.panelMessage;
    if (panelMessage.id && panelMessage.channel) {
      const channel = client.channels.cache.get(panelMessage.channel);
      if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT')) {
        const message = await channel.messages.fetch(panelMessage.id);
        if (message) message.deletable ? message.delete().catch((err) => console.log(err)) : null;
      }
    };

    guild.modules.tickets.panelMessage = {
      id: "",
      url: "",
      message: {
        title: "",
        description: "",
        color: "#000000",
        thumbnail: "",
        titleUrl: "",
        image: "",
        timestamp: false,
      },
      channel: "",
    };
    await guild.save();
    return { guild, error: null };
  }

  if (data.settings.enabled) {
    const botHasPermissionsInLogChannel: 0 | 1 | 2 = checkForBotPermissionInChannel(data.settings.logChannel, "SEND_MESSAGES");
    if (botHasPermissionsInLogChannel === 0) return { error: "The log channel you specified is not valid." };
    if (botHasPermissionsInLogChannel === 1) return { error: "The bot does not have permission to send messages in the log channel you specified." };

    const botHasPermissionsInClosedCategory: 0 | 1 | 2 = checkForBotPermissionInCategory(data.settings.logChannel, "MANAGE_CHANNELS");
    if (botHasPermissionsInClosedCategory === 0) return { error: "The closed category you specified is not valid." };
    if (botHasPermissionsInClosedCategory === 1) return { error: "The bot does not have permission to manage channels in the closed category you specified." };

    const botHasPermissionsInPanelMessageChannel: 0 | 1 | 2 = checkForBotPermissionInChannel(data.settings.panelMessage.channel, "SEND_MESSAGES");
    if (botHasPermissionsInPanelMessageChannel === 0) return { error: "The panel message channel you specified is not valid." };
    if (botHasPermissionsInPanelMessageChannel === 1) return { error: "The bot does not have permission to send messages in the panel message channel you specified." };

    if (data.settings.categories.length === 0) return { error: "You must specify at least one category." };
    if (data.settings.categories.length > 5) return { error: "You can only have a maximum of 5 categories." };

    data.settings.categories.forEach((category) => {
      const botHasPermissionsInCategoryChannel: 0 | 1 | 2 = checkForBotPermissionInCategory(category.categoryChannel, "MANAGE_CHANNELS");
      if (botHasPermissionsInCategoryChannel === 0) return { error: "The category channel you specified is not valid." };
      if (botHasPermissionsInCategoryChannel === 1) return { error: "The bot does not have permission to manage channels in the category channel you specified." };

      if (category.welcomeMessage.message.length > 4096) return { error: "The welcome message you specified is too long." };
      if (category.welcomeMessage.message.length < 1) return { error: "The welcome message you specified is too short." };
    });

    const prevData = guild.modules.tickets;
    if (prevData.panelMessage.message !== data.settings.panelMessage.message) {
      const channel = client.channels.cache.get(data.settings.panelMessage.channel);
      if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT')) {
        const embed = new MessageEmbed()
          .setTitle(data.settings.panelMessage.message.title)
          .setDescription(placeholderReplace(data.settings.panelMessage.message.description, { name: guild.guildName, id: guild.guildId }))
          .setColor(parseInt(data.settings.panelMessage.message.color.replace('#', ''), 16));

        if (data.settings.panelMessage.message.thumbnail) embed.setThumbnail(data.settings.panelMessage.message.thumbnail);
        if (data.settings.panelMessage.message.titleUrl) embed.setURL(data.settings.panelMessage.message.titleUrl);
        if (data.settings.panelMessage.message.image) embed.setImage(data.settings.panelMessage.message.image);
        if (data.settings.panelMessage.message.timestamp) embed.setTimestamp();

        let components: null | MessageActionRow = null;
        if (data.settings.categories.length > 0) {
          components = new MessageActionRow();
          data.settings.categories.forEach((category) => {
            components!.addComponents(
              new MessageButton()
                .setLabel(category.label)
                .setCustomId(`ticket-create-${category.label.toLowerCase().replaceAll(' ', '%')}`)
                .setEmoji('📨')
                .setStyle('SECONDARY'),
            );
          });
        }

        const prevChannel = client.channels.cache.get(prevData.panelMessage.channel);
        if (prevChannel && (prevChannel.type === 'GUILD_NEWS' || prevChannel.type === 'GUILD_TEXT')) {
          const oldMessage = await prevChannel.messages.fetch(prevData.panelMessage.id);
          if (oldMessage) oldMessage.deletable ? oldMessage.delete().catch((err) => console.log(err)) : null;
        }

        try {
          const message = await channel.send({
            embeds: [embed],
            components: components ? [components] : undefined,
          });
          data.settings.panelMessage.id = message.id;
          data.settings.panelMessage.url = message.url;

        } catch (err) {
          return { error: "There was an error sending the panel message. Please make sure the bot has permissions and try again." };
        }
      }
    }
  }

  if (!data.settings.panelMessage.id) data.settings.panelMessage.id = guild.modules.tickets.panelMessage.id;
  if (!data.settings.panelMessage.url) data.settings.panelMessage.url = guild.modules.tickets.panelMessage.url;

  guild.modules.tickets = data.settings as {
    enabled: boolean;
    panelMessage: {
      id: string;
      url: string;
      message: {
        title: string;
        description: string;
        color: string;
        thumbnail: string;
        titleUrl: string;
        image: string;
        timestamp: boolean;
      };
      channel: string;
    };
    logChannel: string;
    closedCategory: string;
    ticketCount: number;
    categories: {
      categoryChannel: string;
      label: string;
      maxTickets: number;
      supportRoles: string[];
      welcomeMessage: {
        message: string;
        color: string;
      };
      deleteOnClose: boolean;
      moveToClosedCategory: boolean;
    }[];
  };
  guild.commands.tickets = data.commands;

  await guild.save();

  return { guild, error: null };
}


export async function getModerationSettings(guildId: string | undefined) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  const settings = guild.modules.moderation;
  const commands = guild.commands.moderation;

  return { settings, commands };
}

export async function postModerationSettings(guildId: string | undefined, data: {
  settings: {
    moderatorRoles: string[];
    includeReason: boolean;
    dm: {
      ban: boolean;
      kick: boolean;
      warn: boolean;
      timeout: boolean;
    };
  };
  commands: {
    ban: boolean;
    kick: boolean;
    warn: boolean;
    timeout: boolean;
    clear: boolean;
    slowmode: boolean;
    warnings: boolean;
    clearwarns: boolean;
  };
}) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  guild.modules.moderation = data.settings;
  guild.commands.moderation = data.commands;

  await guild.save();

  return { guild, error: null };
}


export async function getAltDetectionSettings(guildId: string | undefined) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  const settings = guild.modules.altDetection;

  return { settings };
}

export async function postAltDetectionSettings(guildId: string | undefined, data: {
  settings: {
    enabled: boolean;
    logChannel: string;
    accountAge: number;
    action: 'kick' | 'ban' | 'timeout';
    whitelist: string[];
  };
}) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  if (data.settings.enabled) {
    const botHasPermissions = checkForBotPermissionInChannel(data.settings.logChannel, "SEND_MESSAGES");
    if (botHasPermissions === 0) return { error: "The log channel you specified is not valid." };
    if (botHasPermissions === 1) return { error: "The bot does not have permission to send messages in the log channel you specified." };
  };

  guild.modules.altDetection = data.settings;

  await guild.save();

  return { guild, error: null };
}


export async function getLoggingSettings(guildId: string | undefined) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  const settings = guild.modules.logging;

  return { settings };
}

export async function postLoggingSettings(guildId: string | undefined, data: {
  settings: {
    enabled: boolean;
    moderation: {
      enabled: boolean;
      channel: string;
      color: string;
      events: {
        ban: boolean;
        unban: boolean;
        kick: boolean;
        warn: boolean;
        timeout: boolean;
        clear: boolean;
        slowmode: boolean;
      };
    };
    serverEvents: {
      enabled: boolean;
      channel: string;
      color: string;
      events: {
        channelCreate: boolean;
        channelDelete: boolean;
        channelUpdate: boolean;
        roleCreate: boolean;
        roleDelete: boolean;
        roleUpdate: boolean;
        guildUpdate: boolean;
      };
    };
    memberEvents: {
      enabled: boolean;
      channel: string;
      color: string;
      events: {
        memberJoin: boolean;
        memberLeave: boolean;
        rolesUpdate: boolean;
        nicknameUpdate: boolean;
      };
    };
    messageEvents: {
      enabled: boolean;
      channel: string;
      color: string;
      events: {
        messageDelete: boolean;
        messageUpdate: boolean;
        messagePin: boolean;
      };
    };
  };
}) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  if (data.settings.enabled) {
    const botHasPermissionsInModerationLogChannel = checkForBotPermissionInChannel(data.settings.moderation.channel, "SEND_MESSAGES");
    if (botHasPermissionsInModerationLogChannel === 0) return { error: "The log channel you specified for moderation logging is not valid." };
    if (botHasPermissionsInModerationLogChannel === 1) return { error: "The bot does not have permission to send messages in the log channel you specified for moderation logging." };

    const botHasPermissionsInServerEventsLogChannel = checkForBotPermissionInChannel(data.settings.serverEvents.channel, "SEND_MESSAGES");
    if (botHasPermissionsInServerEventsLogChannel === 0) return { error: "The log channel you specified for server events logging is not valid." };
    if (botHasPermissionsInServerEventsLogChannel === 1) return { error: "The bot does not have permission to send messages in the log channel you specified for server events logging." };

    const botHasPermissionsInMemberEventsLogChannel = checkForBotPermissionInChannel(data.settings.memberEvents.channel, "SEND_MESSAGES");
    if (botHasPermissionsInMemberEventsLogChannel === 0) return { error: "The log channel you specified for member events logging is not valid." };
    if (botHasPermissionsInMemberEventsLogChannel === 1) return { error: "The bot does not have permission to send messages in the log channel you specified for member events logging." };

    const botHasPermissionsInMessageEventsLogChannel = checkForBotPermissionInChannel(data.settings.messageEvents.channel, "SEND_MESSAGES");
    if (botHasPermissionsInMessageEventsLogChannel === 0) return { error: "The log channel you specified for message events logging is not valid." };
    if (botHasPermissionsInMessageEventsLogChannel === 1) return { error: "The bot does not have permission to send messages in the log channel you specified for message events logging." };
  };

  guild.modules.logging = data.settings;

  await guild.save();

  return { guild, error: null };
}


export async function getChatFilterSettings(guildId: string | undefined) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  const settings = guild.modules.chatFilter;

  return { settings };
}

export async function postChatFilterSettings(guildId: string | undefined, data: {
  settings: {
    enabled: boolean;
    logChannel: string;
    words: string[];
    bypassRoles: string[];
    bypassUsers: string[];
    bypassChannels: string[];
  };
}) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  if (data.settings.enabled) {
    const botHasPermissions = checkForBotPermissionInChannel(data.settings.logChannel, "SEND_MESSAGES");
    if (botHasPermissions === 0) return { error: "The log channel you specified is not valid." };
    if (botHasPermissions === 1) return { error: "The bot does not have permission to send messages in the log channel you specified." };
  };

  guild.modules.chatFilter = data.settings;

  await guild.save();

  return { guild, error: null };
}


export async function getVerificationSettings(guildId: string | undefined) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  const settings = guild.modules.verification;
  const commands = guild.commands.verification;

  return { settings, commands };
}

export async function postVerificationSettings(guildId: string | undefined, data: {
  settings: {
    enabled: boolean;
    channel: string;
    message: string;
    buttonLabel: string;
    rolesToAdd: string[];
    rolesToRemove: string[];
    embed: {
      enabled: boolean;
      title: string;
      description: string;
      color: string;
      thumbnail: string;
      titleUrl: string;
      image: string;
      author: {
        name: string;
        icon_url: string;
        url: string;
      };
      footer: {
        text: string;
        icon_url: string;
      };
    };
  };
  commands: {
    verify: boolean;
  };
}) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  const embed = validEmbed(data.settings.embed);
  if (embed.error) return { error: embed.error };
  if (data.settings.enabled && !data.settings.channel) return { error: "You must specify a channel." };
  if (!data.settings.message && !data.settings.embed.enabled) return { error: "You must specify a message or an embed." };

  if (data.settings.enabled) {
    const botHasPermissions: 0 | 1 | 2 = checkForBotPermissionInChannel(data.settings.channel, "SEND_MESSAGES");
    if (botHasPermissions === 0) return { error: "The channel you specified is not valid." };
    if (botHasPermissions === 1) return { error: "The bot does not have permission to send messages in the channel you specified." };

    const prevData = guild.modules.verification;
    if (!prevData.embed.enabled && !data.settings.embed.enabled) {
      if (prevData.message !== data.settings.message) {
        const channel = client.channels.cache.get(data.settings.channel);
        if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT')) channel.send({
          content: data.settings.message,
          components: [
            new MessageActionRow().addComponents(
              new MessageButton().setLabel(data.settings.buttonLabel).setStyle('SUCCESS').setCustomId('verification-verify').setEmoji('<:check:942750762256175145>'),
            ),
          ],
        }).catch((err) => { return { error: 'Could not send the verification panel message. Make sure the bot has permissions and try again.' } });
      }
    } else if (prevData.embed.enabled && !data.settings.embed.enabled) {
      if (prevData.embed === data.settings.embed) {
        const channel = client.channels.cache.get(data.settings.channel);
        if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT')) channel.send({
          embeds: [
            {
              title: data.settings.embed.title,
              description: data.settings.embed.description,
              color: parseInt(data.settings.embed.color.replace('#', ''), 16),
              thumbnail: {
                url: data.settings.embed.thumbnail,
              },
              url: data.settings.embed.titleUrl,
              author: {
                name: data.settings.embed.author.name,
                icon_url: data.settings.embed.author.icon_url,
                url: data.settings.embed.author.url,
              },
              image: {
                url: data.settings.embed.image,
              },
              footer: {
                text: data.settings.embed.footer.text,
                icon_url: data.settings.embed.footer.icon_url,
              },
            },
          ],
          components: [
            new MessageActionRow().addComponents(
              new MessageButton().setLabel(data.settings.buttonLabel).setStyle('SUCCESS').setCustomId('verification-verify').setEmoji('<:check:942750762256175145>'),
            ),
          ],
        }).catch((err) => { return { error: 'Could not send the verification panel message. Make sure the bot has permissions and try again.' } });
      }
    } else if (!prevData.embed.enabled && data.settings.embed.enabled) {
      const channel = client.channels.cache.get(data.settings.channel);
      if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT')) channel.send({
        embeds: [
          {
            title: data.settings.embed.title,
            description: data.settings.embed.description,
            color: parseInt(data.settings.embed.color.replace('#', ''), 16),
            thumbnail: {
              url: data.settings.embed.thumbnail,
            },
            url: data.settings.embed.titleUrl,
            author: {
              name: data.settings.embed.author.name,
              icon_url: data.settings.embed.author.icon_url,
              url: data.settings.embed.author.url,
            },
            image: {
              url: data.settings.embed.image,
            },
            footer: {
              text: data.settings.embed.footer.text,
              icon_url: data.settings.embed.footer.icon_url,
            },
          },
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton().setLabel(data.settings.buttonLabel).setStyle('SUCCESS').setCustomId('verification-verify').setEmoji('<:check:942750762256175145>'),
          ),
        ],
      }).catch((err) => { return { error: 'Could not send the verification panel message. Make sure the bot has permissions and try again.' } });
    } else if (prevData.embed.enabled && !data.settings.embed.enabled) {
      const channel = client.channels.cache.get(data.settings.channel);
      if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT')) channel.send({
        content: data.settings.message,
        components: [
          new MessageActionRow().addComponents(
            new MessageButton().setLabel(data.settings.buttonLabel).setStyle('SUCCESS').setCustomId('verification-verify').setEmoji('<:check:942750762256175145>'),
          ),
        ],
      }).catch((err) => { return { error: 'Could not send the verification panel message. Make sure the bot has permissions and try again.' } });
    }
  };

  guild.modules.verification = data.settings;
  guild.commands.verification = data.commands;

  await guild.save();

  return { guild, error: null };
}


export async function getLevelsSettings(guildId: string | undefined) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  const settings = guild.modules.levels;
  const commands = guild.commands.levels;

  return { settings, commands };
}

export async function postLevelsSettings(guildId: string | undefined, data: {
  settings: {
    enabled: boolean;
    channel: 'current' | 'dm' | string;
    message: string;
    roleRewards: {
      level: number;
      role: string;
    }[];
    roleRewadsStack: boolean;
    xpRate: .25 | .5 | .75 | 1 | 1.5 | 2 | 2.5 | 3;
    noXpRoles: string[];
    noXpChannels: string[];
  };
  commands: {
    rank: boolean;
    leaderboard: boolean;
  };
}) {
  const guild = await Guild.findOne({ guildId });
  if (!guild) return null;

  if (!data.settings.message) return { error: "You must specify a message to send on level up." };
  if (data.settings.message.length > 2000) return { error: "The message you specified is too long." };

  if (data.settings.enabled && !['current', 'dm'].includes(data.settings.channel)) {
    const botHasPermissions: 0 | 1 | 2 = checkForBotPermissionInChannel(data.settings.channel, "SEND_MESSAGES");
    if (botHasPermissions === 0) return { error: "The channel you specified is not valid." };
    if (botHasPermissions === 1) return { error: "The bot does not have permission to send messages in the channel you specified." };
  };

  guild.modules.levels = data.settings;
  guild.commands.levels = data.commands;

  await guild.save();

  return { guild, error: null };
}
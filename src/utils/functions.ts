import { Logs } from "../database/schemas";
import { User } from "./types";

export const validURL = (str: string) => {
  try {
    new URL(str);
  } catch (_) {
    return false;
  }

  return true;
}

export const validEmbed = (embed: {
  enabled?: boolean;
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
}) => {
  if (embed.enabled) {
    if (embed.title.length > 256) return { error: "Title is too long. Title length must be lower than 256 characters." };
    if (embed.description.length > 4096) return { error: "Description is too long. Description length must be lower than 4096 characters." };
    if (embed.author.name.length > 256) return { error: "Author name is too long. Author name length must be lower than 256 characters." };
    if (embed.footer.text.length > 2048) return { error: "Footer text is too long. Footer text length must be lower than 2048 characters." };
    if (embed.title.length + embed.author.name.length + embed.footer.text.length + embed.description.length > 6000) return { error: "Embed is too long. Embed length must be lower than 6000 characters." };

    if (!embed.description) return { error: "Description cannot be empty." };

    if (embed.author.icon_url && !embed.author.name) return { error: "Author name cannot be empty if author icon is set." };
    if (embed.author.url && !embed.author.name) return { error: "Author name cannot be empty if author url is set." };

    if (embed.footer.icon_url && !embed.footer.text) return { error: "Footer text cannot be empty if footer icon is set." };

    if (!validURL(embed.titleUrl) && embed.titleUrl.length > 0 && embed.title.length > 0) return { error: "Title URL is not a valid URL." };
    if (!validURL(embed.image) && embed.image.length > 0) return { error: "Image URL is not a valid URL." };
    if (!validURL(embed.thumbnail) && embed.thumbnail.length > 0) return { error: "Thumbnail URL is not a valid URL." };
    if (!validURL(embed.author.icon_url) && embed.author.icon_url.length > 0 && embed.author.name.length > 0) return { error: "Author icon URL is not a valid URL." };
    if (!validURL(embed.footer.icon_url) && embed.footer.icon_url.length > 0 && embed.footer.text.length > 0) return { error: "Footer icon URL is not a valid URL." };
  }

  return { error: null };
}

export const createActionLog = async (guildId: string, user: User, module: string) => {
  let action = '';
  switch (module) {
    case 'administration': {
      action = 'Updated administration module settings.';
      break;
    }
    case 'welcome': {
      action = 'Updated welcome module settings.';
      break;
    }
    case 'leave': {
      action = 'Updated leave module settings.';
      break;
    }
    case 'autoroles': {
      action = 'Updated autoroles module settings.';
      break;
    }
    case 'tickets': {
      action = 'Updated tickets module settings.';
      break;
    }
    case 'moderation': {
      action = 'Updated moderation module settings.';
      break;
    }
    case 'alt detection': {
      action = 'Updated alt detection module settings.';
      break;
    }
    case 'logging': {
      action = 'Updated logging module settings.';
      break;
    }
    case 'chat filter': {
      action = 'Updated chat filter module settings.';
      break;
    }
    case 'verification': {
      action = 'Updated verification module settings.';
      break;
    }
    case 'levels': {
      action = 'Updated levels module settings.';
      break;
    }
    default: {
      action = 'Updated non-specific settings.';
      break;
    }
  };

  await Logs.create({
    guildId,
    action,
    module,
    timestamp: Date.now().toString(),
    user: {
      id: user.discordId,
      username: user.discordUsername,
      discriminator: user.discordDiscriminator,
      avatar: user.discordAvatar,
    },
  });
}
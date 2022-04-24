import mongoose, { Schema } from 'mongoose';
import { PartialMember } from '../../utils/types';

export interface Guild {
  guildId: string;
  guildName: string;
  guildIcon: string;
  guildOwner: string;

  modules: {
    administration: {
      chatbot: {
        enabled: boolean;
        channels: string[];
      };
      autoreact: {
        channel: string;
        emojis: string[];
      }[];
    };

    welcome: {
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

    leave: {
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

    autoroles: {
      enabled: boolean;
      userRoles: string[];
      botRoles: string[];
    };

    tickets: {
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

    moderation: {
      moderatorRoles: string[];
      includeReason: boolean;
      dm: {
        ban: boolean;
        kick: boolean;
        warn: boolean;
        timeout: boolean;
      };
    };

    altDetection: {
      enabled: boolean;
      logChannel: string;
      accountAge: number;
      action: 'kick' | 'ban' | 'timeout';
      whitelist: string[];
    };

    logging: {
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

    chatFilter: {
      enabled: boolean;
      logChannel: string;
      words: string[];
      bypassRoles: string[];
      bypassUsers: string[];
      bypassChannels: string[];
    };

    verification: {
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

    suggest: {
      enabled: boolean;
      channel: string;
      staffRoles: string[];
    };

    levels: {
      enabled: boolean;
      channel: 'disabled' | 'current' | 'dm' | string;
      message: string;
      roleRewards: {
        level: number;
        role: string;
      }[];
      roleRewardsStack: boolean;
      xpRate: .25 | .5 | .75 | 1 | 1.5 | 2 | 2.5 | 3;
      noXpRoles: string[];
      noXpChannels: string[];
    };
  };

  commands: {
    administration: {
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
    },
    tickets: {
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
    moderation: {
      ban: boolean;
      kick: boolean;
      warn: boolean;
      timeout: boolean;
      clear: boolean;
      slowmode: boolean;
      warnings: boolean;
      clearwarns: boolean;
    };
    verification: {
      verify: boolean;
    };
    levels: {
      rank: boolean;
      leaderboard: boolean;
      giveXp: boolean;
      removeXp: boolean;
      setXp: boolean;
    };
  };

  leaves: PartialMember[];
}

const GuildSchema = new Schema<Guild>({
  guildId: { type: String, required: true },
  guildName: { type: String, required: true },
  guildIcon: { type: String, required: true },
  guildOwner: { type: String, required: true },

  modules: {
    administration: {
      chatbot: {
        enabled: { type: Boolean, required: false, default: false },
        channels: { type: [String], required: false, default: [] },
      },
      autoreact: [{
        channel: { type: String, required: false, default: '' },
        emojis: { type: [String], required: false, default: [] },
      }],
    },

    welcome: {
      enabled: { type: Boolean, required: false, default: false },
      channel: { type: String, required: false, default: '' },
      message: { type: String, required: false, default: '*{user}*, welcome to **{guild}**! Have a great time here!' },
      dm: { type: Boolean, required: false, default: false },
      embed: {
        enabled: { type: Boolean, required: false, default: false },
        title: { type: String, required: false, default: 'Welcome!' },
        description: { type: String, required: false, default: '*{user}*, welcome to **{guild}**! Have a great time here!' },
        color: { type: String, required: false, default: '#000000' },
        thumbnail: { type: String, required: false, default: '' },
        titleUrl: { type: String, required: false, default: '' },
        image: { type: String, required: false, default: '' },
        author: {
          name: { type: String, required: false, default: '' },
          icon_url: { type: String, required: false, default: '' },
          url: { type: String, required: false, default: '' },
        },
        footer: {
          text: { type: String, required: false, default: '' },
          icon_url: { type: String, required: false, default: '' },
        },
      },
    },

    leave: {
      enabled: { type: Boolean, required: false, default: false },
      channel: { type: String, required: false, default: '' },
      message: { type: String, required: false, default: '*{user_tag}* just left **{guild}**.' },
      dm: { type: Boolean, required: false, default: false },
      embed: {
        enabled: { type: Boolean, required: false, default: false },
        title: { type: String, required: false, default: 'Goodbye!' },
        description: { type: String, required: false, default: '*{user_tag}* just left **{guild}**.' },
        color: { type: String, required: false, default: '#000000' },
        thumbnail: { type: String, required: false, default: '' },
        titleUrl: { type: String, required: false, default: '' },
        image: { type: String, required: false, default: '' },
        author: {
          name: { type: String, required: false, default: '' },
          icon_url: { type: String, required: false, default: '' },
          url: { type: String, required: false, default: '' },
        },
        footer: {
          text: { type: String, required: false, default: '' },
          icon_url: { type: String, required: false, default: '' },
        },
      },
    },

    autoroles: {
      enabled: { type: Boolean, required: false, default: false },
      userRoles: { type: [String], required: false, default: [] },
      botRoles: { type: [String], required: false, default: [] },
    },

    tickets: {
      enabled: { type: Boolean, required: false, default: false },
      panelMessage: {
        id: { type: String, required: false, default: '' },
        url: { type: String, required: false, default: '' },
        message: {
          title: { type: String, required: false, default: 'Open a Ticket' },
          description: { type: String, required: false, default: 'Click the corresponding button below to open a support ticket between you and the Support Team of {guild}.' },
          color: { type: String, required: false, default: '#000000' },
          thumbnail: { type: String, required: false, default: '' },
          titleUrl: { type: String, required: false, default: '' },
          image: { type: String, required: false, default: '' },
          timestamp: { type: Boolean, required: false, default: false },
        },
        channel: { type: String, required: false, default: '' },
      },
      logChannel: { type: String, required: false, default: '' },
      closedCategory: { type: String, required: false, default: '' },
      ticketCount: { type: Number, required: false, default: 0 },
      categories: { type: [{
        categoryChannel: String,
        label: String,
        maxTickets: Number,
        supportRoles: [String],
        welcomeMessage: {
          message: String,
          color: String,
        },
        deleteOnClose: Boolean,
        moveToClosedCategory: Boolean,
      }], required: false, default: [] },
    },

    moderation: {
      moderatorRoles: { type: [String], required: false, default: [] },
      includeReason: { type: Boolean, required: false, default: false },
      dm: {
        ban: { type: Boolean, required: false, default: false },
        kick: { type: Boolean, required: false, default: false },
        warn: { type: Boolean, required: false, default: false },
        timeout: { type: Boolean, required: false, default: false },
      },
    },

    altDetection: {
      enabled: { type: Boolean, required: false, default: false },
      logChannel: { type: String, required: false, default: '' },
      accountAge: { type: Number, required: false, default: 7 },
      action: { type: String, required: false, default: 'kick' },
      whitelist: { type: [String], required: false, default: [] },
    },

    logging: {
      enabled: { type: Boolean, required: false, default: true },
      moderation: {
        enabled: { type: Boolean, required: false, default: false },
        channel: { type: String, required: false, default: '' },
        color: { type: String, required: false, default: '#000000' },
        events: {
          ban: { type: Boolean, required: false, default: false },
          unban: { type: Boolean, required: false, default: false },
          kick: { type: Boolean, required: false, default: false },
          warn: { type: Boolean, required: false, default: false },
          timeout: { type: Boolean, required: false, default: false },
        },
      },
      serverEvents: {
        enabled: { type: Boolean, required: false, default: false },
        channel: { type: String, required: false, default: '' },
        color: { type: String, required: false, default: '#000000' },
        events: {
          channelCreate: { type: Boolean, required: false, default: false },
          channelDelete: { type: Boolean, required: false, default: false },
          channelUpdate: { type: Boolean, required: false, default: false },
          roleCreate: { type: Boolean, required: false, default: false },
          roleDelete: { type: Boolean, required: false, default: false },
          roleUpdate: { type: Boolean, required: false, default: false },
          guildUpdate: { type: Boolean, required: false, default: false },
        },
      },
      memberEvents: {
        enabled: { type: Boolean, required: false, default: false },
        channel: { type: String, required: false, default: '' },
        color: { type: String, required: false, default: '#000000' },
        events: {
          memberJoin: { type: Boolean, required: false, default: false },
          memberLeave: { type: Boolean, required: false, default: false },
          rolesUpdate: { type: Boolean, required: false, default: false },
          nicknameUpdate: { type: Boolean, required: false, default: false },
        },
      },
      messageEvents: {
        enabled: { type: Boolean, required: false, default: false },
        channel: { type: String, required: false, default: '' },
        color: { type: String, required: false, default: '#000000' },
        events: {
          messageDelete: { type: Boolean, required: false, default: false },
          messageUpdate: { type: Boolean, required: false, default: false },
          messagePin: { type: Boolean, required: false, default: false },
        },
      },
    },

    chatFilter: {
      enabled: { type: Boolean, required: false, default: false },
      logChannel: { type: String, required: false, default: '' },
      words: { type: [String], required: false, default: [] },
      bypassRoles: { type: [String], required: false, default: [] },
      bypassUsers: { type: [String], required: false, default: [] },
      bypassChannels: { type: [String], required: false, default: [] },
    },

    verification: {
      enabled: { type: Boolean, required: false, default: false },
      channel: { type: String, required: false, default: '' },
      message: { type: String, required: false, default: 'Click the button below to get verified and have access to all channels.' },
      buttonLabel: { type: String, required: false, default: 'Verify' },
      rolesToAdd: { type: [String], required: false, default: [] },
      rolesToRemove: { type: [String], required: false, default: [] },
      embed: {
        enabled: { type: Boolean, required: false, default: false },
        title: { type: String, required: false, default: 'Verify yourself' },
        description: { type: String, required: false, default: 'Click the button below to get verified and have access to all channels.' },
        color: { type: String, required: false, default: '#000000' },
        thumbnail: { type: String, required: false, default: '' },
        titleUrl: { type: String, required: false, default: '' },
        image: { type: String, required: false, default: '' },
        author: {
          name: { type: String, required: false, default: '' },
          icon_url: { type: String, required: false, default: '' },
          url: { type: String, required: false, default: '' },
        },
        footer: {
          text: { type: String, required: false, default: '' },
          icon_url: { type: String, required: false, default: '' },
        },
      },
    },

    suggest: {
      enabled: { type: Boolean, required: false, default: false },
      channel: { type: String, required: false, default: '' },
      staffRoles: { type: [String], required: false, default: [] },
    },

    levels: {
      enabled: { type: Boolean, required: false, default: false },
      channel: { type: String, required: false, default: 'current' },
      message: { type: String, required: false, default: 'GG {user}, you just advanced to level {level}!' },
      roleRewards: [{
        level: { type: Number, required: false, default: 0 },
        role: { type: String, required: false, default: '' },
      }],
      roleRewardsStack: { type: Boolean, required: false, default: true },
      xpRate: { type: Number, required: false, default: 1 },
      noXpRoles: { type: [String], required: false, default: [] },
      noXpChannels: { type: [String], required: false, default: [] },
    },
  },

  commands: {
    administration: {
      chatbot: { type: Boolean, required: false, default: false },
      autoreact: { type: Boolean, required: false, default: false },
      giveaway: {
        start: { type: Boolean, required: false, default: true },
        end: { type: Boolean, required: false, default: true },
        pause: { type: Boolean, required: false, default: true },
        unpause: { type: Boolean, required: false, default: true },
        reroll: { type: Boolean, required: false, default: true },
        delete: { type: Boolean, required: false, default: true },
      }
    },
    tickets: {
      add: { type: Boolean, required: false, default: true },
      remove: { type: Boolean, required: false, default: true },
      close: { type: Boolean, required: false, default: true },
      delete: { type: Boolean, required: false, default: false },
      reopen: { type: Boolean, required: false, default: false },
      transcript: { type: Boolean, required: false, default: false },
      claim: { type: Boolean, required: false, default: true },
      unclaim: { type: Boolean, required: false, default: true },
      lock: { type: Boolean, required: false, default: false },
      unlock: { type: Boolean, required: false, default: false },
    },
    moderation: {
      ban: { type: Boolean, required: false, default: true },
      kick: { type: Boolean, required: false, default: true },
      warn: { type: Boolean, required: false, default: true },
      timeout: { type: Boolean, required: false, default: true },
      clear: { type: Boolean, required: false, default: true },
      warnings: { type: Boolean, required: false, default: true },
      clearwarns: { type: Boolean, required: false, default: true },
      slowmode: { type: Boolean, required: false, default: true },
    },
    verification: {
      verify: { type: Boolean, required: false, default: false },
    },
    levels: {
      rank: { type: Boolean, required: false, default: true },
      leaderboard: { type: Boolean, required: false, default: true },
      giveXp: { type: Boolean, required: false, default: true },
      removeXp: { type: Boolean, required: false, default: true },
      setXp: { type: Boolean, required: false, default: true },
    }
  },

  leaves: { type: [Object], required: false, default: [] },
});

export default mongoose.model('guilds', GuildSchema);
export type PartialGuild = {
  id: string;
  name: string;
  icon: string;
  owner: string | boolean;
  permissions: string;
  features: string[];
  botIn?: boolean;
  role?: 'admin' | 'owner' | 'manager' | 'none';
};

export type PartialMember = {
  user?: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: string;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags?: number;
    premium_type?: number;
    public_flags?: number;
  };
  nick?: string;
  avatar?: string;
  roles: string[];
  fullRoles: {
    id?: string;
    name?: string;
    color?: string;
  }[];
  joined_at: string;
  premium_since?: string;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions: string;
  communication_disabled_until?: string;
  displayColor?: string;
};

export type PartialChannel = {
  id: string;
  type: number;
  guild_id?: string;
  position?: number;
  permission_overwrites?: {
    id: string;
    type: number;
    allow: number;
    deny: number;
  }[];
  name?: string;
  topic?: string;
  nsfw?: boolean;
  last_message_id?: string;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: string[];
  icon?: string;
  owner_id?: string;
  application_id?: string;
  parent_id?: string;
  last_pin_timestamp?: string;
  rtc_region?: string;
  video_quality_mode?: number;
  message_count?: number;
  member_count?: number;
  thread_metadata?: {
    archived: boolean;
    auto_archive_duration: number;
    archive_timestamp: string;
    locked: boolean;
    invitable?: boolean;
    create_timestamp?: string;
  };
  member?: {
    id?: string;
    user_id?: string;
    join_timestamp: string;
    flags: number;
  };
  default_auto_archive_duration?: number;
  permissions?: string;
};

export type PartialRole = {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string;
  unicode_emoji?: string;
  position: number;
  permissions: number;
  managed: boolean;
  mentionable: boolean;
  tags?: {
    bot_id?: string;
    integration_id?: string;
    premium_subscriber?: null;
  };
};

export type User = {
  _id?: string;
  __v?: number;

  discordId: string;
  discordUsername: string;
  discordDiscriminator: string;
  discordAvatar?: string;
  email?: string;

  blacklisted?: boolean;
  acceptedPolicy?: boolean;

  voted?: boolean;
  voteAmount?: number;

  accessToken?: string;
  refreshToken?: string;
};

export type ExtendedUser = {
  _id?: string;
  __v?: number;

  discordId: string;
  discordUsername: string;
  discordDiscriminator: string;
  discordAvatar?: string;
  email?: string;

  blacklisted?: boolean;
  acceptedPolicy?: boolean;

  voted?: boolean;
  voteAmount?: number;

  accessToken?: string;
  refreshToken?: string;

  guilds: PartialGuild[];
}
import axios from 'axios';
import { Guild, Logs } from '../../database/schemas';
import { DISCORD_API_URL } from '../../utils/constants';
import { PartialChannel, PartialMember, PartialRole } from '../../utils/types';

export async function getChartsData(guildId: string) {
  let members: PartialMember[] = [];
  let membersFetch: PartialMember[] = [];
  let after: string | undefined;

  do {
    membersFetch = (await axios.get<PartialMember[]>(`${DISCORD_API_URL}/guilds/${guildId}/members?limit=1000${after ? "&after=" + after : ""}`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    })).data;

    after = membersFetch[membersFetch.length - 1].user?.id;
    members.push(...membersFetch);
  } while (membersFetch.length === 1000);

  let bots: number = 0;
  let humans: number = 0;

  members.forEach((member: PartialMember) => {
    if (member.user?.bot) bots++;
    else humans++;
  });

  const { data: channels } = await axios.get<PartialChannel[]>(`${DISCORD_API_URL}/guilds/${guildId}/channels`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  });

  let channelCount: number = 0;
  let textChannelCount: number = 0;
  let voiceChannelCount: number = 0;

  channels.forEach((channel: PartialChannel) => {
    if ([0, 5].includes(channel.type)) channelCount++ && textChannelCount++;
    else if ([2, 13].includes(channel.type)) channelCount++ && voiceChannelCount++;
  });

  const { data: roles } = await axios.get<PartialRole[]>(`${DISCORD_API_URL}/guilds/${guildId}/roles`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  });

  let roleCount: number = 0;
  let systemRoleCount: number = 0;
  let userRoleCount: number = 0;

  roles.forEach((role: PartialRole) => {
    if (role.managed || role.tags?.bot_id || role.tags?.integration_id || role.tags?.premium_subscriber) systemRoleCount++ && roleCount++;
    else userRoleCount++ && roleCount++;
  });

  const latestMembers: PartialMember[] = [];
  const membersTemp: PartialMember[] = [...members];

  for (let i = 0; i < 7; i++) {
    if (membersTemp.length > 0) {
      const member = membersTemp.reduce((prev, curr) => prev.joined_at > curr.joined_at ? prev : curr);
      membersTemp.splice(membersTemp.indexOf(member), 1);
      latestMembers.push(member);
    }
  }

  latestMembers.forEach((member: PartialMember) => {
    member.fullRoles = [];
    member.roles.forEach((role) => {
      if (roles.find((r: PartialRole) => r.id === role)) {
        const _role = roles.find((r: PartialRole) => r.id === role);
        if (_role?.name === "@everyone") return;
        let color = `#${_role?.color.toString(16)}`;
        if (color.length < 7) color = "#000000";

        member.fullRoles.push({
          id: _role?.id,
          name: _role?.name,
          color,
        });
      }
    });
  });

  const actions = await Logs.find({ guildId });
  const actionsTemp = actions;
  const latestActions = [];

  for (let i = 0; i < 4; i++) {
    if (actionsTemp.length > 0) {
      const action = actionsTemp.reduce((prev, curr) => prev.timestamp > curr.timestamp ? prev : curr);
      actionsTemp.splice(actions.indexOf(action), 1);
      latestActions.push(action);
    }
  }

  const join24 = [];
  const join7 = [];
  const leave24 = [];
  const leave7 = [];

  members.forEach((member: PartialMember) => {
    let day = 24 * 60 * 60 * 1000;
    let x = Date.now() - parseInt(member.joined_at);
    let created = Math.floor(x / day);

    if (7 > created) join7.push(member);
    else if (1 > created) join24.push(member);
  });

  const guildStore = await Guild.findOne({ guildId });

  guildStore?.leaves.forEach((leave: PartialMember) => {
    let day = 24 * 60 * 60 * 1000;
    let x = parseInt(leave.joined_at) - Date.now();
    let left = Math.floor(x / day);

    if (7 > left) leave7.push(leave);
    else if (1 > left) leave24.push(leave);
  });

  return {
    bots,
    humans,
    members: members.length,
    channels: channelCount,
    textChannels: textChannelCount,
    voiceChannels: voiceChannelCount,
    roles: roleCount,
    systemRoles: systemRoleCount,
    userRoles: userRoleCount,
    latestMembers,
    latestActions,
    join24: join24.length,
    join7: join7.length,
    leave24: leave24.length,
    leave7: leave7.length,
  };
}

export async function getMembers(guildId: string) {
  const { data: roles } = (await axios.get<PartialRole[]>(`${DISCORD_API_URL}/guilds/${guildId}/roles`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  }));

  let members: PartialMember[] = [];
  let membersFetch: PartialMember[] = [];
  let after: string | undefined;

  do {
    membersFetch = (await axios.get<PartialMember[]>(`${DISCORD_API_URL}/guilds/${guildId}/members?limit=1000${after ? "&after=" + after : ""}`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    })).data;

    after = membersFetch[membersFetch.length - 1].user?.id;
    members.push(...membersFetch);
  } while (membersFetch.length === 1000);

  members.forEach((member: PartialMember) => {
    member.fullRoles = [];
    member.roles.forEach((role) => {
      if (roles.find((r: PartialRole) => r.id === role)) {
        const _role = roles.find((r: PartialRole) => r.id === role);
        if (_role?.name === "@everyone") return;
        let color = `#${_role?.color.toString(16)}`;
        if (color.length < 7) color = "#000000";

        member.fullRoles.push({
          id: _role?.id,
          name: _role?.name,
          color,
        });
      }
    });

    const fullRoles = member.roles.map((roleId: string) => roles.find((role: PartialRole) => role.id === roleId));
    const onlyColorRoles = fullRoles.filter((role) => role?.color);
    if (onlyColorRoles.length > 0) {
      const highestRole = onlyColorRoles.reduce((prev, curr) => prev && curr ? prev.position > curr.position ? prev : curr : prev);
      const color = `#${highestRole?.color.toString(16)}`;
      if (color.length < 7) return member.displayColor = "#000000";
      member.displayColor = color;
    } else member.displayColor = '#000000';
  });

  return members;
}

export async function getLogs(guildId: string) {
  const logs = await Logs.find({ guildId });
  const reversedLogs = logs.reverse();
  return reversedLogs;
}
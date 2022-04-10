"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (string, guild) => {
    let temp = string;
    temp = temp.replace("{guild}", `${guild.name}`);
    temp = temp.replace("{guild_name}", `${guild.name}`);
    temp = temp.replace("{guild_id}", `${guild.id}`);
    return temp;
};

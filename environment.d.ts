declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      ENV: "development" | "production" | "debug";
      DASHBOARD_DOMAIN: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
      DISCORD_REDIRECT_URL: string;
      DISCORD_BOT_TOKEN: string;
      MONGO_URL: string;
      LOGS_WEBHOOK_ID: string;
      LOGS_WEBHOOK_TOKEN: string;
      LAMBDA_GUILD_ID: string;
      SCARPS_BOTLIST_TOKEN: string;
      DISCORD_LABS_TOKEN: string;
      BOTSFORDISCORD_TOKEN: string;
      TOP_GG_TOKEN: string;
      BOTSFORDISCORD_WEBHOOK_TOKEN: string;
      TOP_GG_WEBHOOK_TOKEN: string;
      VOTED1_ROLE: string;
      VOTED2_ROLE: string;
      VOTED3_ROLE: string;
      VOTED4_ROLE: string;
    }
}
}

export { };
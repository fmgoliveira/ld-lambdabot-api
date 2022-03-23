declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      ENV: "development" | "production" | "debug";
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
      DISCORD_REDIRECT_URL: string;
      DISCORD_BOT_TOKEN: string;
      MONGO_URL: string;
    }
  }
}

export { };
import { Router } from 'express';
import { Vote } from '../../database/schemas';
import bodyParser from 'body-parser';

const router = Router();

router.post("/discordswebhook", bodyParser.json(), async (req, res) => {
  if (!req.headers.authorization || (req.headers.authorization !== process.env.BOTSFORDISCORD_WEBHOOK_TOKEN)) return res.sendStatus(403);
  res.sendStatus(200);

  if (!req.body) return;

  const { user, bot } = req.body;

  if (bot !== process.env.DISCORD_CLIENT_ID) return;
  const timestamp = Date.now();

  await Vote.create({
    userId: user,
    timestamp,
    list: "botsfordiscord",
  });
});

router.post("/dblwebhook", bodyParser.json(), async (req, res) => {
  if (!req.headers.authorization || (req.headers.authorization !== process.env.TOP_GG_WEBHOOK_TOKEN)) return res.sendStatus(403);
  res.sendStatus(200);

  if (!req.body) return;

  const { user, bot, type } = req.body;

  if (bot !== process.env.DISCORD_CLIENT_ID) return;
  if (type === "test") return;
  const timestamp = Date.now();

  await Vote.create({
    userId: user,
    timestamp,
    list: "topgg",
  });
});

export default router;
import { Request, Response } from "express";
import { User } from "../../database/schemas/User";
import { getBotGuildsService, getMutualGuildsService, getUserGuildsService } from "../../services/guilds";

export async function getGuildsController(req: Request, res: Response) {
  const user = req.user as User;

  try {
    const guilds = await getMutualGuildsService(user.id);
    res.status(200).send({ guilds });
  } catch (err) {
    console.log(err);
    res.sendStatus(400).send({ msg: "Error" })
  }
}
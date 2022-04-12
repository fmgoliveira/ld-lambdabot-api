import { Request, Response } from "express";
import { User } from "../../database/schemas/User";
import { getBotStatusService } from "../../services/bot";

export async function getBotStats(req: Request, res: Response) {
  try {
    const data = getBotStatusService();
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400).send({ msg: "Error" })
  }
}
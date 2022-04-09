import { Request, Response } from "express";
import { getChartsData, getLogs, getMembers } from "../../services/insights";

export async function getDashboardController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  const data = await getChartsData(guildId);

  res.status(200).send(data);
}

export async function getMembersController(req:Request, res: Response) {
  const guildId = req.params.guildId;
  const data = await getMembers(guildId);

  res.status(200).send(data); 
}

export async function getLogsController(req:Request, res: Response) {
  const guildId = req.params.guildId;
  const data = await getLogs(guildId);

  res.status(200).send(data); 
}
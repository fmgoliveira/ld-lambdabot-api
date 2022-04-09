import { Request, Response } from "express";
import {
  getAdministrationSettings,
  getAltDetectionSettings,
  getAutorolesSettings,
  getChatFilterSettings,
  getLeaveSettings,
  getLevelsSettings,
  getLoggingSettings,
  getModerationSettings,
  getTicketsSettings,
  getVerificationSettings,
  getWelcomeSettings,
  postAdministrationSettings,
  postAltDetectionSettings,
  postAutorolesSettings,
  postChatFilterSettings,
  postLeaveSettings,
  postLevelsSettings,
  postLoggingSettings,
  postModerationSettings,
  postTicketsSettings,
  postVerificationSettings,
  postWelcomeSettings
} from "../../services/manage";
import { createActionLog } from "../../utils/functions";
import { User } from "../../utils/types";

export async function getAdministrationSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await getAdministrationSettings(guildId);
  if (!data) return res.status(404).send({ msg: "Guild not found" });

  res.status(200).send(data);
}

export async function postAdministrationSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await postAdministrationSettings(guildId, req.body.data);
  if (!data) return res.status(404).send({ msg: "Guild not found" });

  await createActionLog(guildId, req.user as User, "administration");

  res.status(200).send(data);
}

export async function getWelcomeSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await getWelcomeSettings(guildId);
  if (!data) return res.status(404).send({ msg: "Guild not found" });

  res.status(200).send(data);
}

export async function postWelcomeSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await postWelcomeSettings(guildId, req.body.data);
  if (data?.error) return res.status(400).send(data?.error);
  if (!data?.guild || !data) return res.status(404).send({ msg: "Guild not found" });

  await createActionLog(guildId, req.user as User, "welcome");

  res.status(200).send(data);
}

export async function getLeaveSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await getLeaveSettings(guildId);
  if (!data) return res.status(404).send({ msg: "Guild not found" });

  res.status(200).send(data);
}

export async function postLeaveSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await postLeaveSettings(guildId, req.body.data);
  if (data?.error) return res.status(400).send(data?.error);
  if (!data?.guild || !data) return res.status(404).send({ msg: "Guild not found" });

  await createActionLog(guildId, req.user as User, "leave");

  res.status(200).send(data);
}

export async function getAutorolesSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await getAutorolesSettings(guildId);
  if (!data) return res.status(404).send({ msg: "Guild not found" });

  res.status(200).send(data);
}

export async function postAutorolesSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await postAutorolesSettings(guildId, req.body.data);
  if (data?.error) return res.status(400).send(data?.error);
  if (!data?.guild || !data) return res.status(404).send({ msg: "Guild not found" });

  await createActionLog(guildId, req.user as User, "autoroles");

  res.status(200).send(data);
}

export async function getTicketsSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await getTicketsSettings(guildId);
  if (!data) return res.status(404).send({ msg: "Guild not found" });

  res.status(200).send(data);
}

export async function postTicketsSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await postTicketsSettings(guildId, req.body.data);
  if (data?.error) return res.status(400).send(data?.error);
  if (!data?.guild || !data) return res.status(404).send({ msg: "Guild not found" });

  await createActionLog(guildId, req.user as User, "tickets");

  res.status(200).send(data);
}

export async function getModerationSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await getModerationSettings(guildId);
  if (!data) return res.status(404).send({ msg: "Guild not found" });

  await createActionLog(guildId, req.user as User, "moderation");

  res.status(200).send(data);
}

export async function postModerationSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await postModerationSettings(guildId, req.body.data);
  if (data?.error) return res.status(400).send(data?.error);
  if (!data?.guild || !data) return res.status(404).send({ msg: "Guild not found" });

  res.status(200).send(data);
}

export async function getAltDetectionSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await getAltDetectionSettings(guildId);
  if (!data) return res.status(404).send({ msg: "Guild not found" });

  await createActionLog(guildId, req.user as User, "alt detection");

  res.status(200).send(data);
}

export async function postAltDetectionSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await postAltDetectionSettings(guildId, req.body.data);
  if (data?.error) return res.status(400).send(data?.error);
  if (!data?.guild || !data) return res.status(404).send({ msg: "Guild not found" });

  res.status(200).send(data);
}

export async function getLoggingSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await getLoggingSettings(guildId);
  if (!data) return res.status(404).send({ msg: "Guild not found" });

  await createActionLog(guildId, req.user as User, "logging");

  res.status(200).send(data);
}

export async function postLoggingSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await postLoggingSettings(guildId, req.body.data);
  if (data?.error) return res.status(400).send(data?.error);
  if (!data?.guild || !data) return res.status(404).send({ msg: "Guild not found" });

  res.status(200).send(data);
}

export async function getChatFilterSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await getChatFilterSettings(guildId);
  if (!data) return res.status(404).send({ msg: "Guild not found" });

  await createActionLog(guildId, req.user as User, "chat filter");

  res.status(200).send(data);
}

export async function postChatFilterSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await postChatFilterSettings(guildId, req.body.data);
  if (data?.error) return res.status(400).send(data?.error);
  if (!data?.guild || !data) return res.status(404).send({ msg: "Guild not found" });

  res.status(200).send(data);
}

export async function getVerificationSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await getVerificationSettings(guildId);
  if (!data) return res.status(404).send({ msg: "Guild not found" });

  res.status(200).send(data);
}

export async function postVerificationSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await postVerificationSettings(guildId, req.body.data);
  if (data?.error) return res.status(400).send(data?.error);
  if (!data?.guild || !data) return res.status(404).send({ msg: "Guild not found" });

  await createActionLog(guildId, req.user as User, "verification");

  res.status(200).send(data);
}

export async function getLevelsSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await getLevelsSettings(guildId);
  if (!data) return res.status(404).send({ msg: "Guild not found" });

  res.status(200).send(data);
}

export async function postLevelsSettingsController(req: Request, res: Response) {
  const guildId = req.params.guildId;
  if (!guildId) return res.status(404).send({ msg: "Guild not found" });

  const data = await postLevelsSettings(guildId, req.body.data);
  if (data?.error) return res.status(400).send(data?.error);
  if (!data?.guild || !data) return res.status(404).send({ msg: "Guild not found" });

  await createActionLog(guildId, req.user as User, "levels");

  res.status(200).send(data);
}
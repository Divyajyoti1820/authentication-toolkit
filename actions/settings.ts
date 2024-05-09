"use server";

import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { error } from "console";
import { db } from "@/lib/db";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  await db.user.update({
    where: { id: user.id },
    data: { ...values },
  });

  return { success: "Settings updated" };
};

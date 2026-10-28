"use server";

import { revalidatePath } from "next/cache";
import { updateGiverProfile } from "@/lib/api/giver";

/**
 * Runs on the server when "Save changes" is pressed, so the change is kept
 * where the Profile screen reads it. Returns { error } instead of throwing,
 * so the form can show the message.
 */
export async function saveProfile(changes) {
  try {
    await updateGiverProfile(changes);
  } catch (err) {
    return { error: err.message };
  }
  revalidatePath("/giver/profile");
  revalidatePath("/giver/profile/edit");
  return { error: null };
}

"use server";

import { revalidatePath } from "next/cache";
import { updateRecipientProfile } from "@/lib/api/recipient";

/**
 * Runs on the server when "Save changes" is pressed, so the change is kept
 * where the Profile screen reads it. Returns { error } instead of throwing,
 * so the form can show the message.
 */
export async function saveProfile(changes) {
  try {
    await updateRecipientProfile(changes);
  } catch (err) {
    return { error: err.message };
  }
  revalidatePath("/recipient/profile");
  revalidatePath("/recipient/profile/edit");
  return { error: null };
}

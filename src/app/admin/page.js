import { redirect } from "next/navigation";

// The admin home is the request queue (first item in the side menu)
export default function AdminHome() {
  redirect("/admin/requests");
}

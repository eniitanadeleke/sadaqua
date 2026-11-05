import AdminAuthLayout from "@/components/admin/AdminAuthLayout";
import AdminForgotForm from "@/components/admin/AdminForgotForm";

export const metadata = { title: "Admin forgot password | Sadaqua" };

export default function AdminForgotPasswordPage() {
  return (
    <AdminAuthLayout>
      <AdminForgotForm />
    </AdminAuthLayout>
  );
}

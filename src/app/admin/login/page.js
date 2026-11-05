import AdminAuthLayout from "@/components/admin/AdminAuthLayout";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata = { title: "Admin log in | Sadaqua" };

export default function AdminLoginPage() {
  return (
    <AdminAuthLayout>
      <AdminLoginForm />
    </AdminAuthLayout>
  );
}

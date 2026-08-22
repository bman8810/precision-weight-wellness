import LoginForm from "@/components/clinic/LoginForm";

export default function StaffLoginPage() {
  return (
    <LoginForm
      heading="Staff login"
      redirectTo="/staff"
      expectedRole="staff"
    />
  );
}

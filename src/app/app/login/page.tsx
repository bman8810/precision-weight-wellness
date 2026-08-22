import LoginForm from "@/components/clinic/LoginForm";

export default function PatientLoginPage() {
  return (
    <LoginForm
      heading="Patient login"
      redirectTo="/app"
      expectedRole="patient"
    />
  );
}

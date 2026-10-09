import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/auth/PasswordInput";

// A private test page for checking components. Delete before launch.
export default function DevPage() {
  return (
    <main style={{ padding: 24, display: "grid", gap: 16, maxWidth: 420 }}>
      <h1 style={{ fontSize: "var(--text-h7)" }}>Inputs</h1>

      <Input name="email" type="email" placeholder="Enter your email address" />
      <Input name="fullName" placeholder="Enter your full name" defaultValue="John Grey" />
      <Input
        name="badEmail"
        type="email"
        defaultValue="examplegmail.co"
        error="Invalid email! Please enter a valid email"
      />
      <Input
        name="displayName"
        label="Full name"
        required
        placeholder="John Doe"
        hint="This is how your name appears on your profile."
      />
      <Input name="lockedEmail" label="Email address" defaultValue="example@sadaqua.org" disabled />
      <Input name="amount" prefix={"\u20A6"} inputMode="numeric" placeholder="Enter Amount" />
      <PasswordInput name="password" placeholder="Enter password" defaultValue="test1234" />
      <PasswordInput
        name="newPassword"
        placeholder="Create password"
        hint="Use 8 or more characters with a mix of letters and numbers."
      />
      <PasswordInput
        name="wrongPassword"
        placeholder="Enter password"
        defaultValue="quu234"
        error="The password you entered is incorrect"
      />

      <h1 style={{ fontSize: "var(--text-h7)" }}>Buttons</h1>

      <Button fullWidth>Create account</Button>
      <Button variant="outlined" fullWidth>Continue</Button>
      <Button fullWidth disabled>Continue</Button>
      <Button fullWidth loading loadingText="Creating account...">
        Create account
      </Button>
      <Button href="/giver/causes" fullWidth>Browse all causes</Button>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button size="medium">Give now</Button>
        <Button size="medium" variant="outlined">Give</Button>
        <Button size="small">Give now</Button>
        <Button size="small" variant="outlined">Browse causes</Button>
      </div>
    </main>
  );
}

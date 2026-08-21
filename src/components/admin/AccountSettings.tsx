import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const emailSchema = z.string().trim().email({ message: "Enter a valid email address" }).max(255);
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(72);

const AccountSettings = ({ currentEmail }: { currentEmail: string }) => {
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const updateEmail = async () => {
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const { error } = await supabase.auth.updateUser(
      { email: parsed.data },
      { emailRedirectTo: `${window.location.origin}/admin` },
    );
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Confirmation sent. Check both your old and new inbox to confirm the change.");
  };

  const updatePassword = async () => {
    const parsed = passwordSchema.safeParse(password);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    if (password !== confirm) return toast.error("Passwords do not match");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: parsed.data });
    setBusy(false);
    if (error) return toast.error(error.message);
    setPassword("");
    setConfirm("");
    toast.success("Password updated");
  };

  const sendRecovery = async () => {
    const parsed = emailSchema.safeParse(currentEmail);
    if (!parsed.success) return toast.error("No valid email on this account");
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(`Recovery link sent to ${parsed.data}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin email</CardTitle>
          <CardDescription>Currently signed in as {currentEmail}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email address</Label>
            <Input
              id="admin-email"
              type="email"
              maxLength={255}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button onClick={updateEmail} disabled={busy || email === currentEmail}>
            Update email
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>Set a new password for this admin account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-pass">New password</Label>
              <Input
                id="new-pass"
                type="password"
                maxLength={72}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pass">Confirm password</Label>
              <Input
                id="confirm-pass"
                type="password"
                maxLength={72}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={updatePassword} disabled={busy}>
              Update password
            </Button>
            <Button variant="outline" onClick={sendRecovery} disabled={busy}>
              Email me a recovery link
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;

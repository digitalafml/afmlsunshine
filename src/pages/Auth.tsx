import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const credentialsSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(72),
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/admin", { replace: true });
  }, [user, loading, navigate]);

  const validate = () => {
    const result = credentialsSchema.safeParse({ email, password });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return null;
    }
    return result.data;
  };

  const signIn = async () => {
    const values = validate();
    if (!values) return;
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(values.email),
      password: String(values.password),
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate("/admin", { replace: true });
  };

  const signUp = async () => {
    const values = validate();
    if (!values) return;
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: String(values.email),
      password: String(values.password),
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created. You can sign in now.");
  };

  const forgotPassword = async () => {
    const parsed = credentialsSchema.shape.email.safeParse(email);
    if (!parsed.success) {
      toast.error("Enter your email address first");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(String(parsed.data), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Recovery link sent. Check your inbox.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Sunshine Admin</CardTitle>
          <CardDescription>Sign in to manage the website content and colors.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <div className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  maxLength={255}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  maxLength={72}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                />
              </div>
            </div>

            <TabsContent value="signin">
              <Button className="w-full mt-6" onClick={signIn} disabled={busy}>
                Sign in
              </Button>
              <Button variant="link" className="w-full mt-2" onClick={forgotPassword} disabled={busy}>
                Forgot password?
              </Button>
            </TabsContent>
            <TabsContent value="signup">
              <Button className="w-full mt-6" onClick={signUp} disabled={busy}>
                Create account
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
};

export default Auth;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, ArrowRight, Loader2, Mail, UserX } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

function Auth({ redirectAfterAuth }: { redirectAfterAuth?: string }) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("returnTo") ?? redirectAfterAuth ?? "/dashboard";
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect, { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
    } catch (error) {
      console.error("Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "We couldn't send the verification code. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      navigate(redirect, { replace: true });
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("That code didn't match. Please try again.");
      setOtp("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
      navigate(redirect, { replace: true });
    } catch (error) {
      console.error("Guest login error:", error);
      setError(
        `Guest sign-in failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md border-border/60 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto flex w-fit items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-teal-400 p-3 shadow-md">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="mt-4 text-xl">
              Welcome to GHOSTFACE KILLAH
            </CardTitle>
            <CardDescription>
              Signed in users get the full tool dashboard and the ability to send
              feedback straight to the developer's Telegram bot.
            </CardDescription>
          </CardHeader>

          {step === "signIn" ? (
            <form onSubmit={handleEmailSubmit}>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    name="email"
                    placeholder="you@example.com"
                    type="email"
                    className="pl-9"
                    disabled={isLoading}
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending code...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="relative flex items-center">
                  <Separator className="flex-1" />
                  <span className="bg-card px-3 text-xs text-muted-foreground">
                    or
                  </span>
                  <Separator className="flex-1" />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                  onClick={handleGuestLogin}
                >
                  <UserX className="mr-2 h-4 w-4" />
                  Continue as guest
                </Button>
              </CardContent>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <CardContent className="space-y-4">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Check your inbox</CardTitle>
                  <CardDescription>
                    We sent a code to {step.email}
                  </CardDescription>
                </CardHeader>

                <input type="hidden" name="email" value={step.email} />
                <input type="hidden" name="code" value={otp} />

                <div className="flex justify-center">
                  <InputOTP
                    value={otp}
                    onChange={setOtp}
                    maxLength={6}
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && otp.length === 6 && !isLoading) {
                        const form = (e.target as HTMLElement).closest("form");
                        if (form) form.requestSubmit();
                      }
                    }}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}

                <p className="text-sm text-muted-foreground text-center">
                  Didn't get a code?{" "}
                  <Button
                    variant="link"
                    className="h-auto p-0"
                    onClick={() => setStep("signIn")}
                    disabled={isLoading}
                  >
                    Try a different email
                  </Button>
                </p>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setStep("signIn")}
                  disabled={isLoading}
                >
                  Use a different email
                </Button>
              </CardContent>
            </form>
          )}

          <div className="rounded-b-lg border-t border-border/60 bg-muted/40 py-4 px-6 text-xs text-center text-muted-foreground">
            Secured by GHOSTFACE KILLAH · Built with the LUCKY HUB theme
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function AuthPage(props: { redirectAfterAuth?: string }) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Box,
  FileCode,
  Shield,
  Zap,
  Send,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  ExternalLink,
  Layers,
  MousePointer2,
  Bot,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldSet } from "@/components/ui/fieldset";
import { sendFeedbackReport } from "@/convex/feedback";
import { useMutation } from "convex/react";

function NativeSelect({
  value,
  onChange,
  children,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
    </select>
  );
}

const tools = [
  {
    name: "Pak Manager",
    description:
      "Unpack, repack, inject, and protect game Pak files using the same workflows your Python toolchain already supports.",
    icon: Box,
    tags: ["Unpack", "Repack", "Inject", "Protect"],
    routeHint: "Pak workflows",
  },
  {
    name: "Lua Build Pipeline",
    description:
      "Compile, decode, and rebuild Lua bytecode with language selection and path-aware repacking.",
    icon: FileCode,
    tags: ["Compile", "Decode", "Repack Lua"],
    routeHint: "Lua workflows",
  },
  {
    name: "Apk Protection Portal",
    description:
      "A web interface for the APK protection flow: select input, choose a protection package, and download the signed output.",
    icon: Shield,
    tags: ["Encrypt Mod", "Encrypt Loader", "SHA-256"],
    routeHint: "APK workflows",
  },
  {
    name: "GHOSTFACE KILLAH Core",
    description:
      "The unified toolkit experience — every tool under one name, one channel, and one developer identity.",
    icon: Zap,
    tags: ["Unified", "Channel", "Lucky Hathungo Wala"],
    routeHint: "Main experience",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackKind, setFeedbackKind] = useState<"bug" | "feedback" | "tool">("feedback");
  const [feedbackTool, setFeedbackTool] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackResult, setFeedbackResult] = useState<"sent" | "error" | null>(null);
  const [copied, setCopied] = useState(false);
  const submitFeedbackMutation = useMutation(sendFeedbackReport as unknown as Parameters<typeof useMutation>[0]);

  const submitFeedback = async () => {
    if (!feedbackMessage.trim()) return;
    setFeedbackSubmitting(true);
    setFeedbackResult(null);
    try {
      const result = await submitFeedbackMutation({
        kind: feedbackKind,
        tool: feedbackTool || undefined,
        message: feedbackMessage.trim(),
        userEmail: feedbackEmail || undefined,
      }) as { ok: boolean };
      if (result.ok) {
        setFeedbackResult("sent");
        setFeedbackOpen(false);
        setFeedbackMessage("");
        setFeedbackEmail("");
      } else {
        setFeedbackResult("error");
      }
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const channelUrl = "https://t.me/LUCKY_HUB_DEV";
  const copyChannel = async () => {
    try {
      await navigator.clipboard.writeText(channelUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */ }
  };

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-background px-6 py-10 text-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #2dd4bf)",
                  boxShadow: "0 0 18px rgba(124, 58, 237, 0.45)",
                }}
              >
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Authenticated workspace
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight">
                  GHOSTFACE KILLAH Dashboard
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 rounded-xl shadow-md shadow-indigo-500/20">
                    <Send className="h-4 w-4" />
                    Send feedback
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-indigo-500" />
                      Send a report to the developer
                    </DialogTitle>
                    <DialogDescription>
                      Bug reports, feedback, and tool notes are sent to the
                      developer's Telegram bot. This is the same channel as{" "}
                      <a
                        href={channelUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline underline-offset-4 hover:text-primary/90"
                      >
                        @LUCKY_HUB_DEV
                      </a>
                      .
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 pt-2">
                    <FieldSet className="flex flex-wrap items-center gap-3">
                      <Label className="text-sm">Report type</Label>
                      <NativeSelect
                        value={feedbackKind}
                        onChange={(value) =>
                          setFeedbackKind(value as typeof feedbackKind)
                        }
                      >
                        <option value="feedback">Feedback</option>
                        <option value="bug">Bug report</option>
                        <option value="tool">Tool issue</option>
                      </NativeSelect>
                    </FieldSet>

                    <FieldSet className="space-y-2">
                      <Label htmlFor="feedback-tool">Tool</Label>
                      <NativeSelect
                        value={feedbackTool}
                        onChange={setFeedbackTool}
                      >
                        <option value="">Pick a tool or leave blank</option>
                        {tools.map((tool) => (
                          <option key={tool.name} value={tool.name}>
                            {tool.name}
                          </option>
                        ))}
                      </NativeSelect>
                    </FieldSet>

                    <div className="space-y-2">
                      <Label htmlFor="feedback-email">Your email</Label>
                      <Input
                        id="feedback-email"
                        type="email"
                        placeholder="Optional — helps the developer follow up"
                        value={feedbackEmail}
                        onChange={(e) => setFeedbackEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback-message">Message</Label>
                      <Textarea
                        id="feedback-message"
                        placeholder="Describe what happened, what you expected, and any steps to reproduce."
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        rows={5}
                      />
                    </div>

                    {feedbackResult === "sent" ? (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        Report sent. The developer will see it on Telegram.
                      </div>
                    ) : feedbackResult === "error" ? (
                      <div className="flex items-center gap-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        Couldn't send the report. Check your connection and try again.
                      </div>
                    ) : null}

                    <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setFeedbackOpen(false)}
                        disabled={feedbackSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={submitFeedback}
                        disabled={
                          feedbackSubmitting || !feedbackMessage.trim()
                        }
                      >
                        {feedbackSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send to Telegram bot
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => navigate("/")}>
                      Back to landing
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Return to the GHOSTFACE KILLAH landing page</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <div className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-medium">@LUCKY_HUB_DEV</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 shrink-0"
                    onClick={copyChannel}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 text-teal-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TooltipProvider>
            </div>
          </header>

          <Card className="border-border/70 shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Select a tool</CardTitle>
              <CardDescription>
                Each tool mirrors a workflow from your Python codebase and opens the
                authenticated workspace for it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Card
                      key={tool.name}
                      className="group border-border/60 bg-card/80 transition-shadow hover:shadow-md"
                    >
                      <CardHeader>
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-lg"
                          style={{
                            background:
                              "linear-gradient(135deg, #7c3aed, #2dd4bf)",
                          }}
                        >
                          <Icon className="h-5.5 w-5.5 text-white" />
                        </div>
                        <CardTitle className="mt-3 text-base">
                          {tool.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {tool.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {tool.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="border-border/60 bg-muted/50 text-xs">
                              <Check className="h-1.5 w-1.5 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-400" />
                  Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-lg border-border/50 bg-muted/40 px-4 py-3">
                  <span className="text-muted-foreground">Tool name</span>
                  <span className="font-semibold">GHOSTFACE KILLAH</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border-border/50 bg-muted/40 px-4 py-3">
                  <span className="text-muted-foreground">Channel</span>
                  <a
                    href={channelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 font-medium text-primary underline-offset-4 hover:text-primary/90 hover:underline"
                  >
                    @LUCKY_HUB_DEV
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="flex items-center justify-between rounded-lg border-border/50 bg-muted/40 px-4 py-3">
                  <span className="text-muted-foreground">Developer</span>
                  <span className="font-medium">Lucky Hathungo Wala</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border-border/50 bg-muted/40 px-4 py-3">
                  <span className="text-muted-foreground">Theme</span>
                  <span className="font-medium">LUCKY HUB</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MousePointer2 className="h-5 w-5 text-teal-400" />
                  Quick actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col gap-1.5 rounded-lg border border-border/50 bg-muted/40 px-4 py-3">
                  <p className="text-sm font-medium">Open the tool portal</p>
                  <p className="text-xs text-muted-foreground">
                    Start from the landing page and enter the authenticated workflow.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 rounded-lg border border-border/50 bg-muted/40 px-4 py-3">
                  <p className="text-sm font-medium">Send feedback or a bug report</p>
                  <p className="text-xs text-muted-foreground">
                    Use the dashboard widget to report issues straight to Telegram.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 rounded-lg border border-border/50 bg-muted/40 px-4 py-3">
                  <p className="text-sm font-medium">Join the channel</p>
                  <p className="text-xs text-muted-foreground">
                    Follow @LUCKY_HUB_DEV for updates from Lucky Hathungo Wala.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </TooltipProvider>
  );
}

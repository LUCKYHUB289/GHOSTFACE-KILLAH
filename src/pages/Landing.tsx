import { motion } from "framer-motion";
import {
  Link2,
  Shield,
  Zap,
  Box,
  FileCode,
  Bot,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Layers,
  MousePointer2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router";

const LUCKY_HUB = "#0b1120";
const ACCENT = "#7c3aed";
const GLOW_TEAL = "#2dd4bf";
const GLOW_PINK = "#f472b6";

const tools = [
  {
    name: "Pak Manager",
    description:
      "Unpack, repack, inject, and protect game Pak files through the same workflows your Python toolchain already supports.",
    icon: Box,
    tags: ["Unpack", "Repack", "Inject", "Protect"],
  },
  {
    name: "Lua Build Pipeline",
    description:
      "Compile, decode, and rebuild Lua bytecode using the same tool logic you rely on, with language and path controls built in.",
    icon: FileCode,
    tags: ["Compile", "Decode", "Repack Lua", "Multi-language"],
  },
  {
    name: "Apk Protection Portal",
    description:
      "A web interface for the APK protection flow: select input, choose a protection package, and download the signed output.",
    icon: Shield,
    tags: ["Encrypt Mod", "Encrypt Loader", "SHA-256"],
  },
  {
    name: "GHOSTFACE KILLAH Core",
    description:
      "The main toolkit experience 묶 everything together under one name, one channel, and one developer identity.",
    icon: Zap,
    tags: ["Unified", "Channel", "Lucky Hathungo Wala"],
  },
];

const featureRows = [
  {
    label: "Signature auth flow",
    description:
      "Sign in or continue as a guest, then land straight on the tool dashboard you came for.",
  },
  {
    label: "Branded control surface",
    description:
      "Every screen uses the LUCKY HUB visual identity instead of a generic starter template.",
  },
  {
    label: "Telegram feedback route",
    description:
      "Send bug reports and tool feedback directly to the developer's Telegram bot from the dashboard.",
  },
  {
    label: "Tool-aware navigation",
    description:
      "Each tool gets its own card, description, and workflow entry point from the authenticated workspace.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(1200px 600px at 10% -10%, rgba(124, 58, 237, 0.25), transparent 60%),
            radial-gradient(900px 500px at 90% 0%, rgba(45, 212, 191, 0.20), transparent 60%),
            radial-gradient(800px 500px at 50% 110%, rgba(244, 114, 182, 0.15), transparent 60%)
          `,
        }}
      />

      <header className="relative z-10 border-b border-border/40 backdrop-blur supports-backdrop-blur:border-border/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${GLOW_TEAL})`,
                boxShadow: `0 0 18px rgba(124, 58, 237, 0.5)`,
              }}
            >
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-base font-semibold tracking-tight">
                GHOSTFACE KILLAH
              </span>
              <span className="hidden text-xs text-muted-foreground sm:block">
                {" "}
                / LUCKY HUB DEV
              </span>
            </div>
          </div>            <nav className="flex items-center gap-4 text-sm">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hidden sm:inline-flex"
                      onClick={() => navigate("/auth?returnTo=/dashboard")}
                    >
                      Enter the tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Open the authenticated tool</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                asChild
              >
                <Link to="/auth?returnTo=/dashboard">
                  <MessageCircle className="h-5 w-5" />
                </Link>
              </Button>
            </nav>
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/40 px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                Tool portal from Lucky Hathungo Wala
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-indigo-500 via-teal-400 to-pink-400 bg-clip-text text-transparent">
                  GHOSTFACE KILLAH
                </span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                A web control surface for the Python toolchain you already trust.
                Pak workflows, Lua build logic, APK protection, and a direct line
                to the{" "}
                <a
                  href="https://t.me/LUCKY_HUB_DEV"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline underline-offset-4 hover:text-primary/90"
                >
                  @LUCKY_HUB_DEV
                </a>{" "}
                channel, all inside one branded experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="rounded-xl shadow-lg shadow-indigo-500/20"
                  onClick={() => navigate("/auth?returnTo=/dashboard")}
                >
                  Open the tool
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-teal-400/40 text-teal-400"
                  asChild
                >
                  <a
                    href="https://t.me/LUCKY_HUB_DEV"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Channel @LUCKY_HUB_DEV
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40% 0px" }}
              variants={fadeUp}
              className="mt-16 grid gap-6 lg:grid-cols-3"
            >
              {[
                {
                  icon: Shield,
                  title: "Encrypted output flow",
                  description:
                    "Select your input, choose a protection package, and get a signed APK out with SHA-256 verification.",
                },
                {
                  icon: Layers,
                  title: "Pak toolkit in one place",
                  description:
                    "Unpack, repack, inject, and protect operations are organized as real tool cards instead of raw scripts.",
                },
                {
                  icon: MousePointer2,
                  title: "Lua build pipeline",
                  description:
                    "Compile, decode, and rebuild Lua bytecode with language selection and path-aware repacking.",
                },
              ].map((item) => (
                <Card
                  key={item.title}
                  className="border-border/50 bg-card/70 backdrop-blur-sm shadow-sm"
                >
                  <CardHeader>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${ACCENT}, ${GLOW_PINK})`,
                      }}
                    >
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        <Separator className="mx-auto w-24" />

        <section className="mt-20 px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40% 0px" }}
              variants={fadeUp}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold tracking-tight">The toolset</h2>
              <p className="mt-2 text-muted-foreground">
                Four primary tool experiences under the GHOSTFACE KILLAH name, each
                wired to the workflows you already use.
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40% 0px" }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card
                    className="group relative border-border/50 bg-card/80 backdrop-blur-sm shadow-sm transition-shadow hover:shadow-md"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, ${ACCENT}, ${GLOW_TEAL})`,
                          }}
                        >
                          <tool.icon className="h-5.5 w-5.5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {tool.tags[0]}
                        </span>
                      </div>
                      <CardTitle className="mt-3 text-lg">{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40% 0px" }}
              variants={fadeUp}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold tracking-tight">
                Built around LUCKY HUB
              </h2>
              <p className="mt-2 text-muted-foreground">
                Identity, channel, and developer name are part of the product, not
                an afterthought.
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              {featureRows.map((row) => (
                <div
                  key={row.label}
                  className="flex gap-4 rounded-xl border border-border/40 bg-card/70 px-5 py-4 backdrop-blur-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
                  <div>
                    <p className="font-medium">{row.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {row.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 px-6 pb-28">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40% 0px" }}
              variants={fadeUp}
              className="rounded-2xl border border-border/40 bg-card/70 p-8 backdrop-blur-sm shadow-xl"
            >
              <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${GLOW_PINK})`,
                  }}
                >
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Talk to the developer</h3>
                  <p className="text-sm text-muted-foreground">
                    Bug reports, feature requests, and tool feedback go straight to
                    the Telegram bot.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="rounded-xl shadow-lg shadow-indigo-500/20"
                  onClick={() => navigate("/auth?returnTo=/dashboard")}
                >
                  Send feedback from the dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-teal-400/40 text-teal-400"
                  asChild
                >
                  <a
                    href="https://t.me/LUCKY_HUB_DEV"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Telegram channel @LUCKY_HUB_DEV
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>      <footer className="border-t border-border/40 px-6 pb-8 pt-6">
        <TooltipProvider>
          <div className="mx-auto max-w-6xl flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              GHOSTFACE KILLAH · Tool portal by Lucky Hathungo Wala
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://t.me/LUCKY_HUB_DEV"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                @LUCKY_HUB_DEV
              </a>
              <span className="text-xs">Built with the LUCKY HUB theme</span>
            </div>
          </div>
        </TooltipProvider>
      </footer>
    </div>
  );
}


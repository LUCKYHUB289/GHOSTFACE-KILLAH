import { motion } from "framer-motion";
import { Link2, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";

const ACCENT = "#7c3aed";
const GLOW_TEAL = "#2dd4bf";
const GLOW_PINK = "#f472b6";

export default function NotFound() {
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

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, ${GLOW_TEAL})`,
              boxShadow: `0 0 24px rgba(124, 58, 237, 0.5)`,
            }}
          >
            <MessageCircle className="h-8 w-8 text-white" />
          </div>

          <Card className="mt-6 border-border/50 bg-card/70 backdrop-blur-sm shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold tracking-tight">
                404
              </CardTitle>
              <CardDescription className="mt-2">
                Page not found in GHOSTFACE KILLAH.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              The page you wanted isn't here. Head back to the tool portal or reach
              out on the developer channel.
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="rounded-xl shadow-md shadow-indigo-500/20"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to the tool
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

          <p className="mt-8 text-xs text-muted-foreground">
            GHOSTFACE KILLAH · Tool portal by Lucky Hathungo Wala
          </p>
        </motion.div>
      </div>
    </div>
  );
}

import { action } from "./_generated/server";
import { v } from "convex/values";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const sendFeedbackReport = action({
  args: {
    kind: v.union(v.literal("bug"), v.literal("feedback"), v.literal("tool")),
    tool: v.optional(v.string()),
    message: v.string(),
    screenshotUrl: v.optional(v.string()),
    userEmail: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return {
        ok: false,
        error: "Telegram credentials are not configured yet.",
      };
    }

    const timestamp = Date.now();
    const escapedMessage = args.message
      .replace(/\n/g, "\\n")
      .replace(/</g, "\\<")
      .replace(/>/g, "\\>");

    const escapedTool =
      args.tool?.replace(/</g, "\\<").replace(/>/g, "\\>") ?? "General";

    const lines = [
      "🔊 *GHOSTFACE KILLAH — New Report*",
      "",
      `*Type:* ${args.kind}`,
      `*Tool:* ${escapedTool}`,
      `*Time:* ${new Date(timestamp).toISOString()}`,
      args.userEmail ? `*Email:* ${args.userEmail}` : "",
      "*Message:*",
      "_" + escapedMessage + "_",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(
      lines,
    )}&parse_mode=Markdown`;

    let status: "sent" | "failed" = "sent";
    let error: string | undefined;

    try {
      const response = await fetch(url, {
        method: "POST",
      });

      if (!response.ok) {
        const body = await response.text();
        status = "failed";
        error = `Telegram API responded ${response.status}: ${body.slice(0, 500)}`;
      }
    } catch (err) {
      status = "failed";
      error =
        err instanceof Error ? err.message : "Unknown error while sending report";
    }

    return { ok: status === "sent", status, error, createdAt: timestamp };
  },
});


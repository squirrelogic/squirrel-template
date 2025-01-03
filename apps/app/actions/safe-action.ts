import * as Sentry from "@sentry/nextjs";
import { setupAnalytics } from "@repo/analytics/server";
import { ratelimit } from "@repo/kv/ratelimit";
import { getLogger } from "@repo/logger";
import { getUser } from "@repo/supabase/queries";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";

const handleServerError = (e: Error) => {
  const logger = getLogger().child({
    module: "safe-action",
  });

  logger.error(`Action error ${e.message}`, {
    error: e.message,
    stack: e.stack,
  });

  if (e instanceof Error) {
    return e.message;
  }

  return DEFAULT_SERVER_ERROR_MESSAGE;
};

export const actionClient = createSafeActionClient({
  handleServerError,
});

export const actionClientWithMeta = createSafeActionClient({
  handleServerError,
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
      track: z
        .object({
          event: z.string(),
          channel: z.string(),
        })
        .optional(),
    });
  },
});

export const authActionClient = actionClientWithMeta
  .use(async ({ next, clientInput, metadata }) => {
    const logger = getLogger().child({
      module: "actionClientWithMeta",
    });

    const result = await next({ ctx: {} });

    if (process.env.NODE_ENV === "development") {
      logger.info(`Input -> ${JSON.stringify(clientInput)}`);
      logger.info(`Result -> ${JSON.stringify(result.data)}`);
      logger.info(`Metadata -> ${JSON.stringify(metadata)}`);

      return result;
    }

    return result;
  })
  .use(async ({ next, metadata }) => {
    const ip = (await headers()).get("x-forwarded-for");

    const { success, remaining } = await ratelimit.limit(
      `${ip}-${metadata.name}`,
    );

    if (!success) {
      throw new Error("Too many requests");
    }

    return next({
      ctx: {
        ratelimit: {
          remaining,
        },
      },
    });
  })
  .use(async ({ next, metadata }) => {
    const { data: user, error } = await getUser();

    if (error || !user) {
      throw new Error("Unauthorized");
    }

    if (metadata) {
      const analytics = await setupAnalytics({
        userId: user.id,
      });

      if (metadata.track) {
        await analytics.track(metadata.track);
      }
    }

    return Sentry.withServerActionInstrumentation(metadata.name, async () => {
      return next({
        ctx: {
          user,
        },
      });
    });
  });

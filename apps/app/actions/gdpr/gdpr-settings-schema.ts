import { z } from "zod";

export const gdprSettingsSchema = z.object({
  user_id: z.string().uuid(),
  essential_data_collection: z.boolean().optional(),
  analytics_improvements: z.boolean().optional(),
});

export type GdprSettingsSchema = z.infer<typeof gdprSettingsSchema>;

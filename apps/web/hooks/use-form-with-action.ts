import { useForm, UseFormProps, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import type { HookSafeActionFn } from "next-safe-action/hooks";
import { useState } from "react";
import { logger } from "@repo/logger";

/**
 * Type definition for action validation errors.
 */
export type ActionValidationErrors = {
  /**
   * Global errors.
   */
  _errors?: string[];
  /**
   * Field-specific errors.
   */
  [key: string]: { _errors?: string[] } | undefined | string[];
};

/**
 * Type definition for action result.
 */
export type ActionResult<TData> = {
  /**
   * Action data.
   */
  data?: TData;
  /**
   * Server error message.
   */
  serverError?: string;
  /**
   * Validation errors.
   */
  validationErrors?: ActionValidationErrors;
  /**
   * Bind args validation errors.
   */
  bindArgsValidationErrors?: readonly [];
};

/**
 * Hook for using a form with an action.
 */
export function useFormWithAction<
  /**
   * Zod schema type.
   */
  TSchema extends z.ZodType<any, any, any>,
  /**
   * Data type.
   */
  TData = unknown,
>(
  /**
   * Zod schema.
   */
  schema: TSchema,
  /**
   * Action function.
   */
  action: HookSafeActionFn<
    z.ZodType<z.infer<TSchema>>,
    z.ZodType<z.infer<TSchema>>,
    z.infer<TSchema>,
    never[],
    TData,
    never[]
  >,
  /**
   * Form options.
   */
  options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">,
) {
  /**
   * Form instance.
   */
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues: {} as DefaultValues<z.infer<TSchema>>,
    ...options,
  });
  const [serverError, setServerError] = useState<string>("");

  /**
   * Action state.
   */
  const { execute, result, status } = useAction(action, {
    onSuccess: () => {
      form.reset();
    },
    onError: (error) => {
      if (error?.error) {
        logger.error("Server Error:", error);
        if (typeof error.error.serverError === "string") {
          setServerError(error.error.serverError);
        }
      }
    },
  });

  /**
   * Form submission handler.
   */
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await execute(data);
    } catch (error) {
      if (error instanceof Error) {
        logger.error("Form submission error", {
          error: error.message,
          formId: form.formId,
          actionName: action.name,
        });
        form.setError("root", {
          type: "server",
          message: error.message,
        });
      }
    }
  });

  return {
    form,
    onSubmit,
    serverError,
    clearServerError: () => setServerError(""),
    result,
    status,
    isLoading: status === "executing",
  };
}

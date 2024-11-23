import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useStateAction } from "next-safe-action/stateful-hooks";
import type { HookSafeStateActionFn } from "next-safe-action/hooks";
import type { SafeActionResult } from "next-safe-action";

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
export type ActionResult<TState> = {
  /**
   * Action data.
   */
  data?: TState;
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
  TSchema extends z.ZodType<any, any>,
  /**
   * State type.
   */
  TState extends { message?: string },
>(
  /**
   * Zod schema.
   */
  schema: TSchema,
  /**
   * Action function.
   */
  action: HookSafeStateActionFn<
    string,
    TSchema,
    z.infer<TSchema>,
    [],
    TState,
    []
  >,
  /**
   * Form options.
   */
  options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">,
  /**
   * Initial state.
   */
  initialState?: SafeActionResult<
    string,
    TSchema,
    z.infer<TSchema>,
    [],
    TState,
    []
  >,
) {
  /**
   * Form instance.
   */
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    ...options,
  });

  /**
   * Action state.
   */
  const { execute, result, status, input } = useStateAction(action, {
    initResult: initialState,
  });

  /**
   * Form submission handler.
   */
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      /**
       * Execute the action.
       */
      console.log("entering onSubmit", data);
      await execute(data);

      /**
       * Handle validation errors from zod.
       */
      if (result.validationErrors) {
        Object.entries(result.validationErrors || {}).forEach(
          ([key, value]) => {
            if (key === "_errors") {
              if (Array.isArray(value)) {
                form.setError("root", {
                  type: "manual",
                  message: value[0],
                });
              }
            } else if (
              typeof value === "object" &&
              value &&
              "_errors" in value
            ) {
              form.setError(key as any, {
                type: "manual",
                message: (value as { _errors?: string[] })._errors?.[0],
              });
            }
          },
        );
      }

      /**
       * Handle state errors (e.g., from stateAction).
       */
      if (result.data && "message" in result.data) {
        form.setError("root", {
          type: "manual",
          message: (result.data as { message: string }).message,
        });
      }

      return result;
    } catch (error) {
      console.error("Form submission error:", error);
      throw error;
    }
  });

  return {
    form,
    onSubmit,
    result,
    status,
    input,
  };
}

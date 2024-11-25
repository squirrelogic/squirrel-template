import { ReactNode } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Control, ControllerRenderProps } from "react-hook-form";

interface FormInputFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  description?: string;
  // eslint-disable-next-line no-unused-vars
  children: (field: ControllerRenderProps<any, string>) => ReactNode;
  // eslint-disable-next-line no-unused-vars
  onChange?: (...event: any[]) => void;
  value?: any;
  onBlur?: () => void;
  ref?: any;
}

export function FormInputField({
  control,
  name,
  label,
  description,
  children,
}: FormInputFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}


import React, { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  className?: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  id,
  error,
  className,
  ...props
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        {...props}
        className={cn(
          error && "border-red-500 focus:ring-red-500",
          "w-full rounded-md"
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default InputWithLabel;

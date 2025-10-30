"use client";

// import { ValueLabel } from "@/lib/types";

import { Controller, useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";
import { Label } from "../label";
import {
  SelectLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../select";
import { Button } from "../button";
import { X } from "lucide-react";

import { type ComponentProps } from "react";

type Valuelabel = [{ value: string; label: string }];
type ControlledSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  options?: Valuelabel;
  placeholder?: string;
  clearable?: boolean;
  containerClassName?: string;
  onUpdate?: (value: string) => void;
} & ComponentProps<"select">;

export const ControlledSelect = <T extends FieldValues>({
  name,
  label,
  options,
  placeholder,
  clearable,
  containerClassName,
  onUpdate,
  // ...props
}: ControlledSelectProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <div className="w-full">
      {!!label && (
        <Label className="mb-2" htmlFor={name}>
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({
          field: { value, onChange, ...restField },
          fieldState: { error },
        }) => (
          <>
            <Select
              value={
                value === undefined || value === null ? "" : value.toString()
              }
              onValueChange={(val) => {
                onUpdate?.(val);
                onChange(val);
              }}
              {...restField}
            >
              <div className={`relative flex w-full ${containerClassName} `}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                {clearable && !!value && (
                  <Button
                    variant="ghost"
                    className="text-foreground
                /40 hover:bg-accent/0 absolute top-1/2 right-0 size-4 -translate-y-1/2"
                    size="icon"
                    onClick={() => {
                      onChange("");
                    }}
                  >
                    <X />
                  </Button>
                )}
              </div>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {options?.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {!!error && (
              <p className="text-destructive text-sm">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

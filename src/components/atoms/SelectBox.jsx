"use client";

import { useState, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const getOptionKey = (option) => `${option.language}-${option.name}`;

const getSelectedOptionLabel = (type, option) => {
  if (!option) return `Select ${type === "language" ? "Language" : "Country"}`;
  return type === "language"
    ? `${option.language} (${option.name})`
    : option.name;
};

export default function SelectBox({ options, type, value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const { setValue } = useFormContext();

  const selectedOption = useMemo(() => {
    if (!value) return null;
    if (type === "language") {
      const [lang, country] = value.split("::");
      return (
        options.find((opt) => opt.language === lang && opt.name === country) ||
        null
      );
    }
    return options.find((opt) => opt.name === value) || null;
  }, [value, options, type]);

  useEffect(() => {
    if (!value) setOpen(false);
  }, [value]);

  const handleSelect = (option) => {
    const selectedValue =
      type === "language" ? `${option.language}::${option.name}` : option.name;

    setOpen(false);
    onChange(selectedValue);

    setValue(type, selectedValue);
    if (type === "country") setValue("flag", option.flag);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={`Select ${type}`}
          className={cn(
            "w-full font-normal justify-between items-center px-4 py-2 rounded-md border",
            "bg-white text-gray-600 transition-all",
            "hover:shadow-[0_0_0_3px_rgba(97,63,221,0.12)] focus:outline-none focus:ring-2 focus:ring-[#A48AF4]",
            open && "shadow-[0_0_0_3px_rgba(97,63,221,0.2)]",
            error ? "border-red-500" : "border-[#EAEAEA]"
          )}
        >
          <div className="flex items-center gap-2">
            {selectedOption?.flag && (
              <Image
                src={selectedOption.flag}
                alt="flag"
                width={20}
                height={15}
              />
            )}
            <span className="text-[#0F0C1B66] font-medium text-[14px] leading-[20px] tracking-normal">
              {getSelectedOptionLabel(type, selectedOption)}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[250px] p-0 mt-2 rounded-md border border-[#EAEAEA] shadow-lg bg-white"
        aria-describedby="select-tooltip"
      >
        <Command>
          <CommandInput placeholder="Search..." className="h-9 px-3 text-sm" />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected =
                  type === "language"
                    ? `${option.language}::${option.name}` === value
                    : option.name === value;

                return (
                  <CommandItem
                    key={getOptionKey(option)}
                    value={`${option.language} ${option.name}`}
                    onSelect={() => handleSelect(option)}
                    aria-label={`Select ${option.name}`}
                    className="px-3 py-2 flex items-center gap-2 text-sm cursor-pointer rounded-sm"
                  >
                    <Image
                      src={option.flag}
                      alt="flag"
                      width={20}
                      height={15}
                    />
                    <span>
                      {type === "language" ? option.language : option.name}
                    </span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4 text-gray-400",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { searchRule } from "@/services/rule.service";

export function Search({
  onSelect,
  className,
  label = "in the docs",
}: {
  onSelect: (name: string) => void;
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const data = searchRule(query);
        setResults(data);
      } catch (err) {
        console.error("PubChem Autocomplete Error", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <div className={`${className}`}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-sidebar border-white/10 text-foreground hover:bg-sidebar/5"
          >
            {value || `Search ${label}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) z-100 p-0 border-white/10 bg-[#161618]"
          style={{ pointerEvents: "auto" }}
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={`search ${label} ...`}
              onValueChange={setQuery}
              className="text-white"
            />
            <CommandList>
              {loading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                </div>
              )}
              {!loading && results.length === 0 && query.length > 1 && (
                <CommandEmpty>No molecule found.</CommandEmpty>
              )}
              <CommandGroup>
                {results.map((name) => (
                  <CommandItem
                    key={name}
                    value={name}
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      onSelect(currentValue);
                      setOpen(false);
                    }}
                    className="text-white hover:bg-white/10 cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === name ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
}

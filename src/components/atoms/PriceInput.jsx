import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function PriceInput({
  value,
  onChange,
  name,
  disabled = false,
  className = "",
  error,
}) {
  return (
    <div className="w-full md:w-[262px]">
      <div className="relative">
        <div
          className={cn(
            "absolute left-0 top-0 h-full flex items-center pl-3 pr-2 border border-[#EAEAEA] rounded-l-md bg-white z-10",
            error && !disabled && "border-red-500"
          )}
        >
          <DollarSign className="text-[#B3B3B3] h-4 w-4" />
        </div>

        <Input
          type="number"
          name={name}
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          placeholder="54"
          className={cn(
            "pl-12 rounded-md text-[#09090B] font-medium text-[14px] leading-[20px] tracking-normal",
            "placeholder:text-[#0F0C1B66] border-[#EAEAEA]",
            "hover:shadow-[0_0_0_3px_rgba(97,63,221,0.1)]",
            "focus:outline-none focus:shadow-[inset_0_0_5.5px_0_rgba(0,0,0,0.1)]",
            "transition focus:ring-0 focus-visible:ring-0 focus-visible:border-[#EAEAEA]",
            className,
            error && !disabled && "border-red-500"
          )}
        />
      </div>

      {error && !disabled && (
        <span className="text-red-500 text-sm mt-1 block">{error}</span>
      )}
    </div>
  );
}

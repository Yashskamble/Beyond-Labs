import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import LabelComponent from "./LabelComponent";
import PriceInput from "./PriceInput";

export default function OfferCategory({category, control, errors, disabled }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        disabled && "opacity-20 pointer-events-none select-none"
      )}
    >
      <h3 className="font-semibold text-[16px] leading-[24px] tracking-[-0.25px] text-[#0F0C1B99]">
        {category}
      </h3>
      <div className="flex flex-col gap-2">
        <LabelComponent label="Price for Guest Posting" />
        <Controller
          name={`offers.greyNicheOffer.categories.${category}.guestPost`}
          control={control}
          render={({ field }) => (
            <PriceInput
              {...field}
              disabled={disabled}
              error={
                errors?.offers?.greyNicheOffer?.categories?.[category]
                  ?.guestPost?.message
              }
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <LabelComponent label="Price for Link Insertion" />
        <Controller
          name={`offers.greyNicheOffer.categories.${category}.linkInsertion`}
          control={control}
          render={({ field }) => (
            <PriceInput
              {...field}
              disabled={disabled}
              error={
                errors?.offers?.greyNicheOffer?.categories?.[category]
                  ?.linkInsertion?.message
              }
            />
          )}
        />
      </div>
    </div>
  );
}

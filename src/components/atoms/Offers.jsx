import { Controller, useFormContext } from "react-hook-form";
import LabelComponent from "./LabelComponent";
import PriceInput from "./PriceInput";
import { cn } from "@/lib/utils";

const categories = ["Gambling", "Crypto", "Adult", "CBD", "Pharmacy", "Loan"];

export default function Offers({ disabled }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {categories.map((category) => (
        <div
          key={category}
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
      ))}
    </>
  );
}

import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function RadioItem({ question, option, name }) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-[#0F0C1B] font-normal text-[14px] leading-[20px] tracking-[0.25px]">
        {question}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup {...field} onValueChange={field.onChange} value={field.value}>
            {option.map(({ value }) => {
              const id = `${name}-${value}`;
              return (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    id={id}
                    value={value}
                    aria-labelledby={`${id}-label`}
                    className="w-4 h-4 rounded-full text-[#613FDD] data-[state=checked]:border-[#613FDD] [&_svg]:fill-[#613FDD] hover:ring-4 hover:ring-[#613FDD1C] hover:bg-[#613FDD1C] border-[#BABABA]"
                  />
                  <Label
                    htmlFor={id}
                    id={`${id}-label`}
                    className="font-normal text-[14px] leading-[20px] tracking-[0.25px] text-[#0F0C1B99] transition-colors duration-200 data-[state=checked]:text-[#0F0C1B] data-[state=checked]:font-medium"
                  >
                    {value}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        )}
      />
    </div>
  );
}

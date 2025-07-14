import { Label } from "../ui/label";

export default function LabelComponent({ label }) {
  return (
    <Label
      htmlFor={label}
      className="text-[#0F0C1B] font-medium text-[14px] leading-[20px] tracking-normal"
    >
      {label}
    </Label>
  );
}

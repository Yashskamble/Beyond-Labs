import { useFormContext } from "react-hook-form";
import OfferCategory from "./OfferCategory";

const categories = ["Gambling", "Crypto", "Adult", "CBD", "Pharmacy", "Loan"];

export default function Offers({ disabled }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {categories.map((category) => (
        <OfferCategory
          key={category}
          category={category}
          control={control}
          errors={errors}
          disabled={disabled}
        />
      ))}
    </>
  );
}

"use client";

import { memo, useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/store/store";
import Heading from "../atoms/Heading";
import LabelComponent from "../atoms/LabelComponent";
import SelectBox from "../atoms/SelectBox";

const categories = [
  "Animals / Pets",
  "Art",
  "Auto",
  "Beauty",
  "Blogging",
  "Business / Entrepreneur",
  "Directory",
  "Education",
  "Energy & Solar Energy",
  "Entertainment & Music",
  "Environment",
  "Events",
  "Family / Parenting",
  "Fashion",
  "Finance",
  "Food",
  "Gambling",
  "Gaming",
  "General",
  "Health & Fitness",
  "Home & Garden",
  "Italian Sites",
  "Legal",
  "Lifestyle",
  "Marijuana / Vaporizers",
  "Marketing",
  "Medical",
  "News",
  "Other",
  "Outdoors",
  "Photography",
  "Politics",
  "Real Estate",
  "EnvironmentSafety",
  "SEO",
  "Sex & Adult",
  "Shopping",
];

function WebsiteDetail() {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext();

  const countries = useStore(state => state?.countries)

  const selectedCategory = watch("categories") || [];
  const isOwner = watch("isOwner") || false;

  const uniqueCountries = useMemo(() => {
    const map = new Map();
    for (const country of countries) {
      if (!map.has(country.name)) map.set(country.name, country);
    }
    return Array.from(map.values());
  }, [countries]);

  const handleSelect = (category) => {
    const updated = selectedCategory.includes(category)
      ? selectedCategory.filter((c) => c !== category)
      : [...selectedCategory, category];

    setValue("categories", updated);
  };

  return (
    <div className="mt-16 mb-10">
      <Heading heading="Website detail" />
      <Card className="shadow-xs border-none my-6 p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col space-y-1 gap-2 w-full md:w-[264px]">
            <LabelComponent label="Enter website" />
            <Input
              {...register("website")}
              placeholder="Website URL"
              aria-label="Enter the URL of your website"
              aria-required="true"
              className={`font-medium text-[14px] leading-[20px] tracking-normal placeholder:text-[#0F0C1B66] border-[#EAEAEA] rounded-md hover:shadow-[0_0_0_3px_rgba(97,63,221,0.1)] focus:outline-none focus:shadow-[inset_0_0_5.5px_0_rgba(0,0,0,0.1)] transition focus:ring-0 focus-visible:ring-0 focus-visible:border-[#EAEAEA] ${errors.website?.message ? "border-red-500" : ""
                }`}
            />
            {errors.website?.message && (
              <span className="text-red-500 text-sm">
                {errors.website?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-1 gap-2 w-full md:w-[264px]">
            <LabelComponent label="Website’s Primary language" />
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <SelectBox
                  options={countries}
                  type="language"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.language?.message}
                />
              )}
            />
            {errors.language?.message && (
              <span className="text-red-500 text-sm">
                {errors.language?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-1 gap-2 w-full md:w-[264px]">
            <LabelComponent label="Your Majority of traffic comes from" />
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <SelectBox
                  options={uniqueCountries}
                  type="country"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.country?.message}
                />
              )}
            />
            {errors.country?.message && (
              <span className="text-red-500 text-sm">
                {errors.country?.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <LabelComponent label="Main Category" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6 m-2">
            {categories.map((category) => (
              <Label
                key={category}
                className="flex items-center gap-2 cursor-pointer text-[14px] text-[#0F0C1B99] font-medium leading-[20px] tracking-normal"
              >
                <Checkbox
                  checked={selectedCategory.includes(category)}
                  onCheckedChange={() => handleSelect(category)}
                  className="h-5 w-5 data-[state=checked]:bg-[#613FDD] data-[state=checked]:border-transparent hover:ring-4 hover:ring-[#613FDD1C] hover:bg-[#613FDD1C] border-[#BABABA]"
                />
                {category}
              </Label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 my-2">
          <LabelComponent label="Description of Website" />
          <Textarea
            {...register("description")}
            placeholder="Description"
            className={`w-full h-32 lg:w-[856px] font-medium text-[14px] leading-[20px] tracking-normal placeholder:text-[#0F0C1B99] border-[#EAEAEA] rounded-md hover:shadow-[0_0_0_3px_rgba(97,63,221,0.1)] focus:outline-none focus:shadow-[inset_0_0_5.5px_0_rgba(0,0,0,0.1)] transition focus:ring-0 focus-visible:ring-0 focus-visible:border-[#EAEAEA] ${errors.description?.message && "border-red-500"
              }`}
          />
          {errors.description?.message && (
            <span className="text-red-500 text-sm">
              {errors.description?.message}
            </span>
          )}
        </div>

        <div className="flex gap-2 my-2 items-center">
          <Checkbox
            checked={isOwner}
            onCheckedChange={() => setValue("isOwner", !isOwner)}
            className="h-5 w-5 data-[state=checked]:bg-[#613FDD] data-[state=checked]:border-transparent hover:ring-4 hover:ring-[#613FDD1C] hover:bg-[#613FDD1C] border-[#BABABA]"
          />
          <Label className="text-[#0F0C1B] font-medium text-[14px] leading-[20px] tracking-normal">
            I am the owner of the website
          </Label>
        </div>
      </Card>
    </div>
  );
}

export default memo(WebsiteDetail);

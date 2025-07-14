"use client";

import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import Heading from "../atoms/Heading";
import RadioItem from "../atoms/RadioItem";

const NumberInput = ({ name, placeholder }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = name.split(".").reduce((acc, key) => acc?.[key], errors);

  return (
    <div className="flex flex-col w-[95px]">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            placeholder={placeholder}
            className={`h-[40px] text-[14px] ${
              error?.message ? "border-red-500" : ""
            }`}
            value={field.value || ""}
            onChange={(e) => {
              const val = e.target.value;
              const numeric = val === "" ? undefined : parseFloat(val);
              field.onChange(numeric);
            }}
          />
        )}
      />
      {error?.message && (
        <span className="text-red-500 text-sm">{error.message}</span>
      )}
    </div>
  );
};

function ArticleSpecificationComponent() {
  return (
    <div className="mt-10 mb-10 lg:w-[1024px] w-full">
      <Heading heading="Article specification" />

      <Card className="shadow-xs border-none my-6 p-6 flex flex-col gap-8 lg:gap-16 lg:flex-row">
        <div className="flex flex-col gap-6">
          <RadioItem
            question="Is writing of an article included in the offer?"
            name="article.writingIncluded"
            option={[
              { value: "Yes" },
              {
                value:
                  "No, the advertiser (client) needs to provide the content",
              },
            ]}
          />

          <div className="flex flex-col gap-2">
            <RadioItem
              question="Number of words in the article"
              name="article.wordLimit"
              option={[
                { value: "Length of the article is not limited." },
                {
                  value:
                    "No, the advertiser (client) needs to provide the content",
                },
              ]}
            />
            <div className="flex gap-6 mx-4">
              <NumberInput name="article.minWords" placeholder="Min" />
              <NumberInput name="article.maxWords" placeholder="Max" />
            </div>
          </div>

          <RadioItem
            name="article.doFollowLinks"
            question="I allow DOFOLLOW links in the article"
            option={[{ value: "Yes" }, { value: "No" }]}
          />

          <RadioItem
            name="article.linkType"
            question="Type of links allowed:"
            option={[
              { value: "Only brand links, URL, navigational, graphic links." },
              { value: "Only branded and generic links." },
              { value: "Also mixed links (partly exact match anchors)." },
              { value: "All links, including exact match anchors." },
            ]}
          />
        </div>

        <div className="flex flex-col gap-6">
          <RadioItem
            name="article.taggingPolicy"
            question="Tagging articles policy:"
            option={[
              { value: "We do not tag paid articles." },
              {
                value: "Articles are tagged only at the advertiser’s request.",
              },
              { value: `We always tag articles: "Sponsored article".` },
            ]}
          />

          <div className="flex flex-col gap-2">
            <RadioItem
              name="article.advertiserLinkLimit"
              question="A number of links to the advertiser in the article:"
              option={[
                { value: "We do not tag paid articles." },
                { value: "A maximum number of links to the advertiser:" },
              ]}
            />
            <div className="flex gap-6 mx-4">
              <NumberInput
                name="article.minAdvertiserLinks"
                placeholder="Min"
              />
              <NumberInput
                name="article.maxAdvertiserLinks"
                placeholder="Max"
              />
            </div>
          </div>

          <RadioItem
            name="article.otherLinksPolicy"
            question="Other links in the article:"
            option={[
              {
                value:
                  "We allow links to other websites in the content of the article.",
              },
              {
                value:
                  "We DO NOT allow links to other websites in the content of the article.",
              },
            ]}
          />

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="article.otherSpec"
              className="text-[#0F0C1B] text-[14px] font-[400] leading-[20px]"
            >
              Other content rules/specifications:
            </Label>
            <Controller
              name="article.otherSpec"
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Description"
                  className="w-full md:w-[471px] h-24 font-medium text-[14px] leading-[20px] tracking-normal placeholder:text-[#0F0C1B66] border-[#EAEAEA] rounded-md hover:shadow-[0_0_0_3px_rgba(97,63,221,0.1)] focus:outline-none focus:shadow-[inset_0_0_5.5px_0_rgba(0,0,0,0.1)] transition focus:ring-0 focus-visible:ring-0 focus-visible:border-[#EAEAEA]"
                />
              )}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default memo(ArticleSpecificationComponent);

"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { websiteFormSchema } from "@/schema/formSchema";
import Precondition from "../molecules/PreconditionComponent";

const CreateOffer = dynamic(() =>
  import("@/components/molecules/CreateOfferComponent")
);
const ArticleSpecification = dynamic(() =>
  import("@/components/molecules/ArticleSpecificationComponent")
);
const WebsiteDetail = dynamic(() =>
  import("@/components/molecules/WebsiteDetailComponet")
);

const INITIAL_VALUES = {
  website: "",
  language: "",
  country: "",
  flag: "",
  description: "",
  categories: [],
  isOwner: false,
  preconditionAccepted: false,
  offers: {
    normal: { guestPost: 0, linkInsertion: 0 },
    greyNicheOffer: {
      samePrice: false,
      price: 0,
      categories: {
        Gambling: { guestPost: 0, linkInsertion: 0 },
        Crypto: { guestPost: 0, linkInsertion: 0 },
        Adult: { guestPost: 0, linkInsertion: 0 },
        CBD: { guestPost: 0, linkInsertion: 0 },
        Pharmacy: { guestPost: 0, linkInsertion: 0 },
        Loan: { guestPost: 0, linkInsertion: 0 },
      },
    },
    homepageOffer: { price: 0, description: "" },
  },
  article: {
    writingIncluded: "Yes",
    wordLimit: "Length of the article is not limited.",
    doFollowLinks: "Yes",
    linkType: "Only brand links, URL, navigational, graphic links.",
    taggingPolicy: "We do not tag paid articles.",
    advertiserLinkLimit: "We do not tag paid articles.",
    otherLinksPolicy:
      "We DO NOT allow links to other websites in the content of the article.",
    otherSpec: "",
    minWords: undefined,
    maxWords: undefined,
    minAdvertiserLinks: undefined,
    maxAdvertiserLinks: undefined,
  },
};

export default function WebsiteForm() {
  const {
    countries,
    addData,
    selectedWebsite,
    data,
    setSelectedWebsite,
    fetchCountries,
  } = useStore();

  const formMethods = useForm({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: INITIAL_VALUES,
    mode: "onSubmit",
  });

  const { watch, setValue, handleSubmit, reset, setFocus, formState } =
    formMethods;
  const { errors } = formState;

  const draft = watch();
  useEffect(() => {
    localStorage.setItem("websiteFormData", JSON.stringify(draft));
  }, [draft]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (countries.length === 0) fetchCountries();

    const savedDraft = localStorage.getItem("websiteFormData");

    if (selectedWebsite) {
      Object.entries(selectedWebsite).forEach(([k, v]) => setValue(k, v));
    } else if (savedDraft) {
      const parsed = JSON.parse(savedDraft);
      Object.entries(parsed).forEach(([k, v]) => setValue(k, v));
    }

    setLoading(false);
  }, [countries.length, fetchCountries, selectedWebsite, setValue]);

  const onSubmit = useCallback(
    (payload) => {
      if (selectedWebsite) {
        const idx = data.findIndex(
          (i) => i.website === selectedWebsite.website
        );
        if (idx !== -1) useStore.getState().data[idx] = payload;
      } else {
        addData(payload);
      }

      localStorage.removeItem("websiteFormData");
      reset(INITIAL_VALUES);
      setSelectedWebsite(null);
      redirect("/");
    },
    [addData, data, reset, selectedWebsite, setSelectedWebsite]
  );

  useEffect(() => {
    if (!errors) return;
    const firstError = Object.keys(errors)[0];
    if (firstError) setFocus(firstError);
  }, [errors, setFocus]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h2 className="mx-6 font-semibold text-[32px] leading-[44px] tracking-[-0.25px]">
        {selectedWebsite ? "Edit Website" : "Add a website"}
      </h2>

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Precondition />
          {errors.preconditionAccepted?.message && (
            <span className="text-red-500 text-sm">
              {errors.preconditionAccepted?.message}
            </span>
          )}

          <WebsiteDetail />
          <CreateOffer />
          <ArticleSpecification />

          <div className="flex justify-end">
            <Button type="submit" className="bg-[#613FDD] text-white">
              {selectedWebsite ? "Edit Website" : "Add a website"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

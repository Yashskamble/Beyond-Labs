import { z } from "zod";

export const websiteFormSchema = z.object({
  website: z.string().url("Invalid URL").min(1, "Website is required"),
  language: z.string().min(1, "Language is required"),
  country: z.string().min(1, "Country is required"),
  flag: z.string().min(1, "Flag is required"),
  description: z.string().min(1, "Description is required"),
  categories: z.array(z.string()).optional(),
  isOwner: z.boolean(),
  preconditionAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the preconditions",
  }),

  offers: z.object({
    normal: z.object({
      guestPost: z
        .number()
        .min(0, "Guest post price cannot be negative")
        .optional(),
      linkInsertion: z
        .number()
        .min(0, "Link insertion price cannot be negative")
        .optional(),
    }),

    greyNicheOffer: z.object({
      samePrice: z.boolean(),
      price: z.number().min(0, "Price cannot be negative"),
      categories: z.object({
        Gambling: z.object({
          guestPost: z.number().min(0, "Price cannot be negative"),
          linkInsertion: z.number().min(0, "Price cannot be negative"),
        }),
        Crypto: z.object({
          guestPost: z.number().min(0, "Price cannot be negative"),
          linkInsertion: z.number().min(0, "Price cannot be negative"),
        }),
        Adult: z.object({
          guestPost: z.number().min(0, "Price cannot be negative"),
          linkInsertion: z.number().min(0, "Price cannot be negative"),
        }),
        CBD: z.object({
          guestPost: z.number().min(0, "Price cannot be negative"),
          linkInsertion: z.number().min(0, "Price cannot be negative"),
        }),
        Pharmacy: z.object({
          guestPost: z.number().min(0, "Price cannot be negative"),
          linkInsertion: z.number().min(0, "Price cannot be negative"),
        }),
        Loan: z.object({
          guestPost: z.number().min(0, "Price cannot be negative"),
          linkInsertion: z.number().min(0, "Price cannot be negative"),
        }),
      }),
    }),

    homepageOffer: z.object({
      price: z.number().min(0, "Price cannot be negative"),
      description: z.string().min(1, "Description is required"),
    }),
  }),

  article: z
    .object({
      writingIncluded: z.string(),
      wordLimit: z.string(),
      doFollowLinks: z.string(),
      linkType: z.string(),
      taggingPolicy: z.string(),
      advertiserLinkLimit: z.string(),
      otherLinksPolicy: z.string(),
      otherSpec: z.string().optional(),
      minWords: z.number().optional(),
      maxWords: z.number().optional(),
      minAdvertiserLinks: z.number().optional(),
      maxAdvertiserLinks: z.number().optional(),
    })
    .refine(
      (data) => {
        if (
          data.wordLimit ===
          "No, the advertiser (client) needs to provide the content"
        ) {
          if (data.minWords === undefined) {
            return false;
          }
        }
        return true;
      },
      {
        message:
          "Min words are required when the advertiser provides the content.",
        path: ["minWords"],
      }
    )
    .refine(
      (data) => {
        if (
          data.wordLimit ===
          "No, the advertiser (client) needs to provide the content"
        ) {
          if (data.maxWords === undefined) {
            return false;
          }
        }
        return true;
      },
      {
        message:
          "Max words are required when the advertiser provides the content.",
        path: ["maxWords"],
      }
    )
    .refine(
      (data) => {
        if (
          data.advertiserLinkLimit ===
          "A maximum number of links to the advertiser:"
        ) {
          if (data.minAdvertiserLinks === undefined) {
            return false;
          }
        }
        return true;
      },
      {
        message: "Min number of links are required.",
        path: ["minAdvertiserLinks"],
      }
    )
    .refine(
      (data) => {
        if (
          data.advertiserLinkLimit ===
          "A maximum number of links to the advertiser:"
        ) {
          if (data.maxAdvertiserLinks === undefined) {
            return false;
          }
        }
        return true;
      },
      {
        message: "Max number of links are required.",
        path: ["maxAdvertiserLinks"],
      }
    ),
});


import { create } from "zustand";

const parseCountries = (countries = []) => {
  const result = [];

  countries.forEach((country) => {
    const name = country?.name?.common || "";
    const flag = country?.flags?.png || "";
    const languages = Object.values(country.languages || {});

    languages.forEach((lang) => {
      result.push({
        language: typeof lang === "string" ? lang : String(lang),
        flag,
        name,
      });
    });
  });

  return result;
};

export const useStore = create((set, get) => ({
  data: [],
  countries: [],
  selectedWebsite: null,

  addData: (newData) => {
    const currentData = get().data;
    set({ data: [...currentData, newData] });
  },

  setSelectedWebsite: (website) => {
    set({ selectedWebsite: website });
  },

  fetchCountries: async () => {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,languages,flags"
      );
      const rawData = await res.json();

      const parsed = parseCountries(rawData);
      set({ countries: parsed });
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  },
}));

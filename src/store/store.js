import { create } from "zustand";

export const useStore = create((set) => ({
  data: [],
  countries: [],
  selectedWebsite: null,
  addData: (newData) =>
    set((state) => ({ data: [...state.data, newData] })),
  setSelectedWebsite: (website) => set({ selectedWebsite: website }),
  fetchCountries: async () => {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,languages,flags"
      );
      const data = await res.json();

      const countryArr = [];

      if (data.length > 0) {
        data.forEach((country) => {
          const languages = Object.values(country.languages);
          if (languages.length > 1) {
            for (const lang of languages) {
              countryArr.push({
                language: typeof lang === "string" ? lang : String(lang),
                flag: country?.flags?.png || "",
                name: country?.name?.common || "",
              });
            }
          } else {
            countryArr.push({
              language:
                typeof languages[0] === "string"
                  ? languages[0]
                  : String(languages[0]),
              flag: country?.flags?.png || "",
              name: country?.name?.common || "",
            });
          }
        });
      }
      set({ countries: countryArr});
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  },
}));

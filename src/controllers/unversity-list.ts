/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { University } from "../models/datatypes";
import { getData, storeData } from "../utils/LocalStorage";

const universityDataKey = "university_data";

const formatAndStoreData = async (data: any[]) => {
  if (data && data.length > 0) {
    // format data as per the modal
    let formattedData: University[] = [];
    formattedData = data.map((item, i) => ({
      id: `${i + 1}`,
      name: item?.name ?? "",
      domains: item?.domains ?? [],
      country: item?.country ?? "",
      state_province: item["state-province"] ?? "",
      country_code: item.alpha_two_code ?? "",
      web_pages: item.web_pages ?? [],
    }));

    //  store in browser storage for caching
    storeData(universityDataKey, formattedData);

    return formattedData;
  } else {
    return [];
  }
};

const filterUniversitiesByName = async (
  searchKey: string,
  callBack: (d: University[]) => void
) => {
  try {
    const universities = (await getData(universityDataKey)) as University[];
    if (searchKey.trim().length > 0 && universities?.length > 0) {
      callBack(
        universities.filter((university) =>
          university.name.toLowerCase().includes(searchKey.toLowerCase().trim())
        )
      );
    } else {
      callBack(universities?.length > 0 ? universities : []);
    }
  } catch (error) {
    //
  }
};

export { formatAndStoreData, universityDataKey, filterUniversitiesByName };

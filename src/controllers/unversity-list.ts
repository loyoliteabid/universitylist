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

const deleteUniversityById = (
  id: string,
  isLastItem: boolean,
  list: University[],
  callBack: (u: University[]) => void
) => {
  const onDeleteItemEx = () => {
    const upatedList = list.filter((item) => item.id !== id);

    //  update browser storage for caching
    storeData(universityDataKey, upatedList);
    callBack(upatedList);
  };

  if (isLastItem) {
    onDeleteItemEx();
  } else {
    // Animate list item opacity on delete
    const listItem = document.getElementById(`university_${id}`);
    if (listItem) {
      // After the animation , I see some item's empty space is visible, so appending hidden to the class
      listItem.classList.add("hidden");
    }
    onDeleteItemEx();
  }
};

export {
  formatAndStoreData,
  universityDataKey,
  filterUniversitiesByName,
  deleteUniversityById,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";

import { SortBy, University } from "../models/datatypes";
import UniversityListItem from "../components/UniversityListItem";
import {
  deleteUniversityById,
  filterUniversitiesByName,
  formatAndStoreData,
  universityDataKey,
} from "../controllers/unversity-list";
import { useHttpClient } from "../hooks/http-hooks";
import UniversityListItemSkeleton from "../components/UniversityListItemSkeleton";
import { getData } from "../utils/LocalStorage";
import SearchUniversityName from "../components/SearchUniversityName";
import SortByUniversityName from "../components/SortByUniversityName";

const UniversityList = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchKey, setSearchKey] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("asc");

  // custom hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const sortUniversities = useCallback((data: University[], sort: SortBy) => {
    if (sort === "asc") {
      setUniversities(data.sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setUniversities(data.sort((a, b) => b.name.localeCompare(a.name)));
    }
  }, []);

  const initializeData = useCallback(async () => {
    try {
      const data = (await sendRequest(
        "/search?country=United%20Arab%20Emirates"
      )) as any[];
      const fetchedData = await formatAndStoreData(data);
      sortUniversities(fetchedData, "asc");
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [sortUniversities, sendRequest]);

  useEffect(() => {
    // check if already data fetched
    const existingData = getData(universityDataKey);

    if (!existingData || existingData.length === 0) {
      initializeData();
    } else {
      sortUniversities(existingData, "asc");
    }
  }, [sortUniversities, initializeData]);

  const handleTryAgain = () => {
    clearError();
    initializeData(); // Recalls the api
  };

  useEffect(() => {
    // update list on typing search
    filterUniversitiesByName(searchKey, (data) => {
      sortUniversities(data, sortBy);
    });
  }, [sortUniversities, searchKey, sortBy]);

  return (
    <div className="flex flex-col m-5 lg:m-24 shadow-sm bg-white gap-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold leading-5 text-deep-blue capitalize">
          {`University List (${universities.length})`}
        </h2>
        <button
          disabled={isLoading}
          onClick={initializeData}
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Reload
        </button>
      </div>

      <div className="flex sm:justify-between sm:items-center flex-col gap-2 sm:flex-row">
        <SearchUniversityName searchKey={searchKey} onChange={setSearchKey} />
        <SortByUniversityName onChange={setSortBy} />
      </div>

      <div className="flex flex-col gap-2">
        {!isLoading &&
          universities.map((item, i) => (
            <UniversityListItem
              item={item}
              onDelete={() =>
                deleteUniversityById(
                  item.id,
                  i === universities.length - 1,
                  universities,
                  setUniversities
                )
              }
              key={`university_${i}`}
            />
          ))}
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <UniversityListItemSkeleton key={`skeleton_${index}`} />
          ))}
      </div>
      {!!error && (
        <div className="flex flex-col items-center justify-center bg-red-50 text-red-700 p-4 rounded shadow-sm">
          <p>Error: {error.message}</p>
          <p>Please check your internet connection</p>
          <button onClick={handleTryAgain} className="underline font-semibold">
            Try Again
          </button>
        </div>
      )}
      {universities.length === 0 && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center bg-red-50 text-red-700 p-4 rounded shadow-sm">
          <p>No data found</p>
        </div>
      )}
    </div>
  );
};

export default UniversityList;

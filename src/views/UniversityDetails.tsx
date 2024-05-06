import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { University } from "../models/datatypes";
import { getData } from "../utils/LocalStorage";
import { universityDataKey } from "../controllers/unversity-list";

const UniversityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Type the ID parameter
  const [university, setUniversity] = useState<University | null>(null);

  useEffect(() => {
    const getUniversity = async () => {
      const data = (await getData(universityDataKey)) as University[];

      const _university =
        data && data.length > 0 ? data.find((item) => item.id === id) : null;
      if (_university) {
        setUniversity(_university);
      }
    };

    getUniversity();
  }, [id]);

  return (
    <div className="flex flex-col m-5 lg:m-24 shadow-sm bg-white gap-5">
      <Link to="/" className="flex items-center mb-5">
        Back to List
      </Link>
      {university ? (
        <>
          <h2 className="text-xl font-bold leading-5 text-deep-blue capitalize">
            University Details
          </h2>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Name:</p>
            <p>{university.name}</p>
            <p className="font-bold">Country:</p>
            <p>{university.country}</p>
            <p className="font-bold">Website:</p>
            {university.web_pages.map((web, i) => (
              <a key={`web-${i}`} href={web} target="_blank">
                {web}
              </a>
            ))}
          </div>
        </>
      ) : (
        <p>University not found.</p>
      )}
    </div>
  );
};

export default UniversityDetails;

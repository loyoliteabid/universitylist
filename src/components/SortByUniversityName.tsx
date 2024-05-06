import { SortBy } from "../models/datatypes";

const SortByUniversityName = ({
  onChange,
}: {
  onChange: (s: SortBy) => void;
}) => {
  return (
    <select
      className="rounded-md border border-gray-300 py-2 px-3"
      onChange={(e) => {
        onChange(e.target.value as SortBy);
      }}
    >
      <option value={"asc"}>Name (A-Z)</option>
      <option value={"dsc"}>Name (Z-A)</option>
    </select>
  );
};

export default SortByUniversityName;

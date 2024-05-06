const SearchUniversityName = ({
  searchKey,
  onChange,
}: {
  searchKey: string;
  onChange: (s: string) => void;
}) => {
  return (
    <div className="flex items-center w-full">
      <input
        type="text"
        value={searchKey}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search University Name"
        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 max-sm:flex-1 sm:w-full sm:max-w-lg"
      />
      <button
        onClick={() => onChange("")}
        className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-md"
      >
        Clear
      </button>
    </div>
  );
};

export default SearchUniversityName;

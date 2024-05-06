const UniversityListItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded shadow-sm">
      <div className="flex flex-col w-full">
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
};

export default UniversityListItemSkeleton;

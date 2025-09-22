import React from "react";

interface FilterBarProps {
  selectedLocation: string;
  selectedCategory: string;
  onLocationChange: (location: string) => void;
  onCategoryChange: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedLocation,
  selectedCategory,
  onLocationChange,
  onCategoryChange,
}) => {
  const locations = ["전체", "서울", "부산", "제주도", "강원도"];
  const categories = ["전체", "해양스포츠", "도심체험", "겨울스포츠", "육상스포츠"];

  return (
    <div className="mb-4">
      {/* 지역 필터 */}
      <div className="mb-3">
        <h3 className="text-xs font-medium text-gray-700 mb-1.5">지역</h3>
        <div className="flex flex-wrap gap-1.5">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => onLocationChange(location)}
              className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                selectedLocation === location
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div>
        <h3 className="text-xs font-medium text-gray-700 mb-1.5">카테고리</h3>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 
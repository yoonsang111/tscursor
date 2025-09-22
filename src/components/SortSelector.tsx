import React from "react";

interface SortSelectorProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: "popular", label: "인기순" },
    { value: "latest", label: "최신순" },
    { value: "price-low", label: "가격 낮은순" },
    { value: "price-high", label: "가격 높은순" },
  ];

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-700">정렬:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-2.5 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortSelector; 
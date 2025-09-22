import React from "react";

const partners = ["네이버", "카카오", "WAUG", "KKday", "클룩"];

const PartnerWidget: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">제휴사</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {partners.map((name, idx) => (
          <div 
            key={idx} 
            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100 text-blue-700 font-medium text-xs hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 cursor-pointer"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerWidget; 
import React, { useState } from "react";

interface ProductCardProps {
  product: any;
  onProductClick?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  // 상품 데이터에서 가격 정보 가져오기
  const price = product.price || 50000;
  const discount = product.discount || 0;
  const finalPrice = discount > 0 ? Math.floor(price * (1 - discount / 100)) : price;

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product.id);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="p-4">
        {/* 상단 헤더 */}
        <div className="flex items-start justify-between mb-3">
          {/* 카테고리 */}
          <div className="flex gap-1">
            {product.categories.slice(0, 1).map((category: string, idx: number) => (
              <span key={idx} className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">
                {category}
              </span>
            ))}
          </div>
          
          {/* 찜 버튼 */}
          <button
            onClick={handleLikeClick}
            className="p-1 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg 
              className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* 제목 */}
        <h2 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h2>

        {/* 설명 */}
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* 위치 */}
        <div className="flex items-center gap-1 mb-2">
          <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs text-gray-600">{product.locations[0]}</span>
        </div>

        {/* 태그 (해시태그 스타일) */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map((tag: string, idx: number) => (
            <span key={idx} className="text-xs text-blue-600">
              #{tag}
            </span>
          ))}
        </div>

        {/* 하단 가격 영역 */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            {discount > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ₩{price.toLocaleString()}
              </span>
            )}
            <span className="text-lg font-bold text-blue-600">
              ₩{finalPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {discount > 0 && (
              <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                {discount}% 할인
              </span>
            )}
            <span className="text-xs text-gray-500">1인당</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 
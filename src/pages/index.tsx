import React, { useState, useMemo } from "react";
import { products as mockProducts } from "../mock/products";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import SortSelector from "../components/SortSelector";
import PartnerWidget from "../components/PartnerWidget";
import Footer from "../components/Footer";

// Google Analytics 이벤트 추적 함수
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortBy, setSortBy] = useState("popular");

  // 필터링된 상품들 - 성능 최적화
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter((product) => {
      // 검색어 필터
      const searchTarget = [
        product.name,
        product.description,
        ...product.tags,
        ...product.categories,
        ...product.locations,
      ].join(" ").toLowerCase();
      
      const keywordMatch = keyword === "" || searchTarget.includes(keyword.toLowerCase());

      // 지역 필터
      const locationMatch = selectedLocation === "전체" || 
        product.locations.some(location => location.includes(selectedLocation));

      // 카테고리 필터
      const categoryMatch = selectedCategory === "전체" || 
        product.categories.includes(selectedCategory);

      return keywordMatch && locationMatch && categoryMatch;
    });

    // 정렬 - 성능 최적화된 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.views - a.views;
        case "latest":
          // ID 순서로 정렬 (최신 등록 순)
          return parseInt(b.id.split('_')[1]) - parseInt(a.id.split('_')[1]);
        default:
          return 0;
      }
    });

    return filtered;
  }, [keyword, selectedLocation, selectedCategory, sortBy]);

  // 추천 상품들
  const recommendedProducts = useMemo(() => {
    return filteredProducts.filter(product => product.isRecommended);
  }, [filteredProducts]);

  // 일반 상품들
  const regularProducts = useMemo(() => {
    return filteredProducts.filter(product => !product.isRecommended);
  }, [filteredProducts]);

  const handleProductClick = (productId: string) => {
    // Google Analytics 이벤트 추적
    trackEvent('product_click', {
      product_id: productId,
      event_category: 'engagement',
      event_label: 'product_card_click'
    });
    
    // 실제로는 라우터를 사용하여 상품 상세 페이지로 이동
    console.log(`상품 ${productId} 클릭됨`);
    // window.location.href = `/product/${productId}`;
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      trackEvent('search', {
        search_term: searchTerm,
        event_category: 'search',
        event_label: 'keyword_search'
      });
    }
  };

  const handleFilterChange = (filterType: string, filterValue: string) => {
    trackEvent('filter_change', {
      filter_type: filterType,
      filter_value: filterValue,
      event_category: 'engagement',
      event_label: 'filter_interaction'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            TourStream
          </h1>
        </div>

            {/* 검색바 */}
            <div className="mb-4">
              <SearchBar 
                value={keyword} 
                onChange={(value) => {
                  setKeyword(value);
                  handleSearch(value);
                }} 
              />
            </div>

        {/* 필터 및 정렬 */}
        <div className="mb-4">
          <FilterBar
            selectedLocation={selectedLocation}
            selectedCategory={selectedCategory}
            onLocationChange={(location) => {
              setSelectedLocation(location);
              handleFilterChange('location', location);
            }}
            onCategoryChange={(category) => {
              setSelectedCategory(category);
              handleFilterChange('category', category);
            }}
          />
          <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        {/* 추천 상품 섹션 */}
        {recommendedProducts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">🔥 추천 상품</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {recommendedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* 일반 상품 리스트 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {filteredProducts.length > 0 ? "모든 상품" : "검색 결과"}
          </h2>
          {regularProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {regularProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 text-base mb-2">🔍</div>
              <p className="text-gray-500">검색 결과가 없습니다</p>
              <p className="text-gray-400 text-sm">다른 키워드로 검색해보세요</p>
            </div>
          )}
        </div>

        {/* 제휴사 */}
        <PartnerWidget />
      </div>
      
      <Footer />
    </div>
  );
} 
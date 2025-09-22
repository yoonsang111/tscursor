import React from "react";
import { products as mockProducts } from "../../mock/products";
import Footer from "../../components/Footer";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const product = mockProducts.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">상품을 찾을 수 없습니다</h1>
          <a href="/" className="text-blue-600 hover:text-blue-700">홈으로 돌아가기</a>
        </div>
      </div>
    );
  }

  const finalPrice = product.discount > 0 
    ? Math.floor(product.price * (1 - product.discount / 100)) 
    : product.price;

  return (
    <>
      {/* SEO 메타태그 */}
      <head>
        <title>{product.name} - 투어 스트림</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
      </head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 뒤로가기 버튼 */}
          <div className="mb-6">
            <a 
              href="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              목록으로 돌아가기
            </a>
          </div>

          {/* 상품 이미지 */}
          <div className="mb-6">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Tour+Image';
              }}
            />
          </div>

          {/* 상품 정보 */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            {/* 카테고리 */}
            <div className="flex gap-2 mb-3">
              {product.categories.map((category: string, idx: number) => (
                <span key={idx} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {category}
                </span>
              ))}
            </div>

            {/* 제목 */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* 위치 */}
            <div className="flex items-center gap-2 mb-4">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-600">{product.locations.join(", ")}</span>
            </div>

            {/* 설명 */}
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag: string, idx: number) => (
                <span key={idx} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* 가격 */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {product.discount > 0 && (
                    <span className="text-lg text-gray-400 line-through">
                      ₩{product.price.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-blue-600">
                    ₩{finalPrice.toLocaleString()}
                  </span>
                </div>
                <span className="text-sm text-gray-500">1인당</span>
              </div>

              {/* 할인 정보 */}
              {product.discount > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <span className="text-red-600 font-medium">
                    {product.discount}% 할인 중!
                  </span>
                </div>
              )}

              {/* 예약 버튼들 */}
              <div className="space-y-3">
                {product.externalUrls.map((url: string, idx: number) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {idx === 0 ? "예약하기" : `예약 링크 ${idx + 1}`}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">상품 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">조회수:</span>
                <span className="ml-2 text-gray-900">{product.views.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-500">추천 상품:</span>
                <span className="ml-2 text-gray-900">{product.isRecommended ? "예" : "아니오"}</span>
              </div>
              <div>
                <span className="text-gray-500">예약 가능:</span>
                <span className="ml-2 text-gray-900">{product.isAvailable ? "예" : "아니오"}</span>
              </div>
              <div>
                <span className="text-gray-500">기간:</span>
                <span className="ml-2 text-gray-900">
                  {new Date(product.startDate).toLocaleDateString()} ~ {new Date(product.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
} 
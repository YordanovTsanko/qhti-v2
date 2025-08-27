import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { data, user } from "../../utils/utils";
import { 
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaTag,
  FaInfoCircle,
  FaTachometerAlt,
  FaGasPump,
  FaUsers,
  FaRuler,
  FaExpand,
  FaDesktop,
  FaCheck,
  FaClock,
  FaAward
} from "react-icons/fa";

const SelectedAd = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const selected = data.find((item) => String(item.id) === id);
    setAd(selected);
    console.log(selected && selected.createBy === user.id);
    
    // Check if this ad was created by our user
    if (selected && selected.createBy === user.id) {
      setSeller(user);
    }
  }, [id]);

  if (!ad) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Зареждане...</p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('bg-BG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 mx-auto">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Promo Badge */}
        {ad.promo && (
          <div className="mb-4 inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full">
            <FaTag />
            <span className="font-semibold">ПРОМОЦИЯ</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Image */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={ad.image} 
                alt={ad.name} 
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{ad.name}</h1>
              
              {/* Price */}
              <div className="text-3xl font-bold text-blue-600 mb-6">
                {ad.price} лв.
              </div>

              {/* Basic Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <FaTag className="text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Марка</p>
                    <p className="font-semibold">{ad.brand}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaAward className="text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Модел</p>
                    <p className="font-semibold">{ad.model}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Година</p>
                    <p className="font-semibold">{ad.year}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaInfoCircle className="text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Състояние</p>
                    <p className="font-semibold">{ad.condition}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Местоположение</p>
                    <p className="font-semibold">{ad.place}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaDesktop className="text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Екран</p>
                    <p className="font-semibold">{ad.screenSize}</p>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Технически данни</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <FaTachometerAlt className="text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Конски сили</p>
                      <p className="font-semibold">{ad.horsepower}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Макс брой хора</p>
                      <p className="font-semibold">{ad.maxLoadCapacity}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaRuler className="text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Дължина</p>
                      <p className="font-semibold">{ad.length} м</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaExpand className="text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Ширина</p>
                      <p className="font-semibold">{ad.width} м</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaGasPump className="text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Газене</p>
                      <p className="font-semibold">{ad.fuel} м</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              {ad.features && ad.features.length > 0 && (
                <div className="border-t pt-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Характеристики</h2>
                  <div className="flex flex-wrap gap-2">
                    {ad.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="inline-flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
                      >
                        <FaCheck className="text-green-500 text-sm" />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Допълнителна информация</h2>
                <p className="text-gray-700 leading-relaxed">{ad.description}</p>
              </div>

              {/* Posted Date */}
              <div className="border-t pt-4 mt-6 flex items-center gap-2 text-gray-500">
                <FaClock />
                <span className="text-sm">Публикувана на: {formatDate(ad.createDate)}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Seller Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaUser className="text-blue-500" />
                Информация за продавача
              </h3>
              
              {seller ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Име</p>
                    <p className="font-semibold text-gray-800">{seller.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Телефон</p>
                    <a 
                      href={`tel:${seller.phone}`} 
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      <FaPhone />
                      {seller.phone}
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Имейл</p>
                    <a 
                      href={`mailto:${seller.email}`} 
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 break-all"
                    >
                      <FaEnvelope />
                      {seller.email}
                    </a>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-6">
                    Свържете се с продавача
                  </button>
                  
                  <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                    Изпрати съобщение
                  </button>
                </div>
              ) : (
                <div className="text-gray-500">
                  <p>Информацията за продавача не е налична</p>
                </div>
              )}

              {/* Location Map Placeholder */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  Местоположение
                </h4>
                <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">{ad.place}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedAd;
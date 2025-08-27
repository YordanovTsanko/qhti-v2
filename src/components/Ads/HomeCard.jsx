import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { formatDate } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const HomeCard = ({ ad }) => {
  const navigate = useNavigate()
  return (
    <div 
    onClick={()=>navigate(`/ads/${ad.id}`)}
    className="border cursor-pointer border-cyan-700 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition relative">

        {ad.promo &&<div className="absolute top-0 right-0 bg-cyan-700 text-white py-1 px-2 text-xs font-semibold"><p>ПРОМО</p></div>}
      {/* Image always flush to the border */}
      <div className="w-full h-44">
        <img
          src={ad.image}
          alt={ad.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-1">
        <h2 className="text-base font-bold line-clamp-1">{ad.name}</h2>
        <h4 className="text-sm font-semibold text-gray-800">
          {(ad.price / 1.96).toFixed(2)} EUR / {ad.price} лв.
        </h4>
        <h3 className="flex items-center gap-1 text-sm font-medium text-gray-600">
          <FaLocationDot size={13} className="text-cyan-700" />
          Обл. {ad.place}
        </h3>
        <h3 className="text-xs text-gray-400">
          {formatDate(new Date(ad.createDate))}
        </h3>
      </div>
    </div>
  );
};

export default HomeCard;

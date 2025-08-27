import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaSearch, FaHistory } from "react-icons/fa";
import { categories, fieldConfigs } from "../utils/utils";

const SearchForm = ({ type = "lodki" }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const config = fieldConfigs[type] || fieldConfigs.lodki;

  const initialValues = {
    category: type,
    brand: "",
    model: "",
    priceMin: "",
    priceMax: "",
    yearMin: "",
    yearMax: "",
    condition: "",
    sortBy: "brand_model_price",
  };

  const validationSchema = Yup.object({
    priceMin: Yup.number().positive("Цената трябва да е положителна"),
    priceMax: Yup.number()
      .positive("Цената трябва да е положителна")
      .when("priceMin", (priceMin, schema) => {
        return priceMin
          ? schema.min(priceMin, "Макс цената трябва да е по-голяма от мин")
          : schema;
      }),
    yearMin: Yup.number().min(1900, "Годината трябва да е след 1900"),
    yearMax: Yup.number()
      .max(new Date().getFullYear() + 1, "Невалидна година")
      .when("yearMin", (yearMin, schema) => {
        return yearMin
          ? schema.min(yearMin, "Макс годината трябва да е по-голяма от мин")
          : schema;
      }),
  });

  const handleSubmit = (values) => {
    console.log("Search submitted:", values);
    // Add to search history
    const newSearch = {
      ...values,
      timestamp: new Date().toISOString(),
      categoryName: categories.find((c) => c.eu === values.category)?.bg,
    };
    setSearchHistory((prev) => [newSearch, ...prev.slice(0, 4)]);
  };

  return (
    <div className="bg-gradient-to-br w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r text-blue-800 p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {(() => {
                const category = categories.find((c) => c.eu === type);
                return category ? (
                  <category.Icon className="w-12 h-12" />
                ) : null;
              })()}
              Търсене в категория: {categories.find((c) => c.eu === type)?.bg}
            </h2>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ errors, touched, values }) => (
              <Form className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Brand */}
                  {config.brands && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        МАРКА
                      </label>
                      <Field
                        as="select"
                        name="brand"
                        className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                      >
                        <option value="">Всички</option>
                        {config.brands.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </Field>
                    </div>
                  )}

                  {/* Model */}
                  {config.models && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        МОДЕЛ
                      </label>
                      <Field
                        as="select"
                        name="model"
                        className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                      >
                        <option value="">Всички</option>
                        {config.models.map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </Field>
                    </div>
                  )}

                  {/* Categories (for electronics/fishing/parts) */}
                  {config.categories && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ТИП
                      </label>
                      <Field
                        as="select"
                        name="subcategory"
                        className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                      >
                        <option value="">Всички</option>
                        {config.categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </Field>
                    </div>
                  )}

                  {/* Part Type */}
                  {config.partType && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ТИП ЧАСТ
                      </label>
                      <Field
                        as="select"
                        name="partType"
                        className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                      >
                        <option value="">Всички</option>
                        {config.partType.map((part) => (
                          <option key={part} value={part}>
                            {part}
                          </option>
                        ))}
                      </Field>
                    </div>
                  )}

                  {/* Year Range */}
                  {config.hasYear && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ГОДИНА
                      </label>
                      <div className="flex gap-2">
                        <Field
                          type="number"
                          name="yearMin"
                          placeholder="От"
                          className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                        <Field
                          type="number"
                          name="yearMax"
                          placeholder="До"
                          className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      {errors.yearMin && touched.yearMin && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.yearMin}
                        </p>
                      )}
                      {errors.yearMax && touched.yearMax && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.yearMax}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Price Range */}
                  {config.hasPrice && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        МАКСИМАЛНА ЦЕНА (лв)
                      </label>
                      <div className="flex gap-2">
                        <Field
                          type="number"
                          name="priceMin"
                          placeholder="От"
                          className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                        <Field
                          type="number"
                          name="priceMax"
                          placeholder="До"
                          className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      {errors.priceMin && touched.priceMin && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.priceMin}
                        </p>
                      )}
                      {errors.priceMax && touched.priceMax && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.priceMax}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Length (for boats) */}
                  {config.hasLength && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ДЪЛЖИНА (м)
                      </label>
                      <div className="flex gap-2">
                        <Field
                          type="number"
                          name="lengthMin"
                          placeholder="От"
                          className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                        <Field
                          type="number"
                          name="lengthMax"
                          placeholder="До"
                          className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Horsepower (for engines) */}
                  {config.horsepower && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        КОНСКИ СИЛИ
                      </label>
                      <div className="flex gap-2">
                        <Field
                          type="number"
                          name="horsepowerMin"
                          placeholder="От"
                          className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                        <Field
                          type="number"
                          name="horsepowerMax"
                          placeholder="До"
                          className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Hours (for engines/jets) */}
                  {config.hasHours && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        РАБОТНИ ЧАСОВЕ
                      </label>
                      <Field
                        type="number"
                        name="maxHours"
                        placeholder="Максимум"
                        className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Max Weight (for trailers) */}
                  {config.maxWeight && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        МАКС ТЕГЛО (кг)
                      </label>
                      <Field
                        type="number"
                        name="maxWeight"
                        placeholder="Максимум"
                        className="w-full px-3 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Condition */}
                  {config.hasCondition && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        СЪСТОЯНИЕ
                      </label>
                      <Field
                        as="select"
                        name="condition"
                        className="w-full px-4 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                      >
                        <option value="">Всички</option>
                        <option value="new">Ново</option>
                        <option value="used">Употребявано</option>
                        <option value="refurbished">Реновирано</option>
                      </Field>
                    </div>
                  )}

                  {/* Sort By */}
                  <div className="lg:col-span-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ПОДРЕДИ РЕЗУЛТАТИТЕ ПО
                    </label>
                    <Field
                      as="select"
                      name="sortBy"
                      className="w-full md:w-96 px-4 py-1 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                    >
                      <option value="brand_model_price">
                        МАРКА / МОДЕЛ / ЦЕНА
                      </option>
                      <option value="price_asc">Цена (възходящо)</option>
                      <option value="price_desc">Цена (низходящо)</option>
                      <option value="year_desc">Година (най-нови)</option>
                      <option value="year_asc">Година (най-стари)</option>
                    </Field>
                  </div>

                  {/* Checkboxes */}
                  <div className="lg:col-span-3 flex flex-wrap gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Field
                        type="checkbox"
                        name="negotiable"
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        УПОТРЕБЯВАНИ
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Field
                        type="checkbox"
                        name="new"
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        НОВИ
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Field
                        type="checkbox"
                        name="parts"
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        НА ЧАСТИ
                      </span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className=" text-orange-600 text-xs md:text-sm font-semibold hover:text-orange-700 transition-colors"
                    >
                      ИЗЧИСТИ ФИЛТРИ
                    </button>
                    <button
                      type="button"
                      className=" text-blue-600 text-xs md:text-sm font-semibold hover:text-blue-700 transition-colors"
                    >
                      ПОДРОБНО ТЪРСЕНЕ
                    </button>
                  </div>{" "}
                  <button
                    type="submit"
                    className="w-full sm:w-auto sm:px-44 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                  >
                    <FaSearch />
                    ТЪРСИ
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Recent Searches */}
          {searchHistory.length > 0 && (
            <div className="border-t bg-gray-50 px-8 py-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FaHistory className="text-orange-500" />
                ВАШИТЕ ПОСЛЕДНИ ТЪРСЕНИЯ
              </h3>
              <div className="flex flex-wrap gap-3">
                {searchHistory.map((search, idx) => (
                  <button
                    key={idx}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-sm"
                    onClick={() => console.log("Load search:", search)}
                  >
                    {search.categoryName}
                    {search.brand && ` - ${search.brand}`}
                    {search.priceMax && ` до ${search.priceMax}лв`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default SearchForm;

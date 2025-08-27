import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { categories, data } from "../utils/utils";
import SearchForm from "../components/SearchForm";
import HomeCard from "../components/Ads/HomeCard";
import { motion, AnimatePresence } from "framer-motion";

const initialCounts = {
  new: 12,
  dvigateli: 12,
  sonari: 12,
  lodki: 12,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Home = () => {
  const [search, setSearch] = useState("lodki");
  const [dataToShow, setDataToShow] = useState(initialCounts);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleViewMore = (section) => {
    setDataToShow((prev) => ({
      ...prev,
      [section]: Math.min(data.length, (prev[section] || 0) + 12),
    }));
  };

  return (
    <div className="w-full h-full">
      <header className={`relative w-full  ${searchHistory ? "py-3 md:h-[1040px] lg:h-[950px]" : "md:h-[930px] lg:h-[850px]"}`}>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/main-bg-yacht.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-transparent pointer-events-none z-10" />
        <NavBar />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 flex items-start justify-start pt-10 flex-col gap-8 mx-auto h-full max-w-[1280px] px-4 xl:px-0"
        >
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.04 } },
            }}
          >
            {categories.map((category) => {
              return (
                <motion.button
                  key={category.eu}
                  onClick={() => setSearch(category.eu)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="md:py-2 py-1 px-4 flex items-center text-sm md:text-md md:gap-2 gap-1 rounded-md border border-white text-white hover:bg-white hover:text-blue-800 transition duration-500"
                  aria-label={`Категория ${category.eu}`}
                >
                  {<category.Icon />}
                  {category.bg}
                </motion.button>
              );
            })}
          </motion.div>
          <motion.h2
            className="text-white text-2xl md:text-4xl font-bold max-w-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Купувай и продавай — всичко за морето: лодки, яхти, джетове и
            оборудване на едно място.
          </motion.h2>
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SearchForm
              type={search}
              searchHistory={searchHistory}
              setSearchHistory={setSearchHistory}
            />
          </motion.div>
        </motion.div>
      </header>
      <main className="max-w-[1280px] mx-auto px-4 xl:px-0 mt-10 space-y-10">
        <section>
          <h2 className="text-cyan-600 text-2xl font-bold">Най-нови обяви</h2>
          <motion.div
            key={`new-${dataToShow.new}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="mt-3"
          >
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {data.slice(0, dataToShow.new).map((ad, idx) => {
                  return (
                    <motion.div
                      key={ad.id || `${idx}-new`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <HomeCard ad={ad} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => handleViewMore("new")}
                className="text-cyan-600 underline cursor-pointer"
              >
                Виж още
              </button>
            </div>
          </motion.div>
        </section>
        <section>
          <h2 className="text-cyan-600 text-2xl font-bold">
            Най-ново от двигатели
          </h2>
          <motion.div
            key={`dvigateli-${dataToShow.dvigateli}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="mt-3"
          >
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {data.slice(0, dataToShow.dvigateli).map((ad, idx) => {
                  return (
                    <motion.div
                      key={ad.id || `${idx}-dv`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <HomeCard ad={ad} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => handleViewMore("dvigateli")}
                className="text-cyan-600 underline cursor-pointer"
              >
                Виж още
              </button>
            </div>
          </motion.div>
        </section>
        <section>
          <h2 className="text-cyan-600 text-2xl font-bold">
            Най-ново от сонари
          </h2>
          <motion.div
            key={`sonari-${dataToShow.sonari}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="mt-3"
          >
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {data.slice(0, dataToShow.sonari).map((ad, idx) => {
                  return (
                    <motion.div
                      key={ad.id || `${idx}-son`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <HomeCard ad={ad} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => handleViewMore("sonari")}
                className="text-cyan-600 underline cursor-pointer"
              >
                Виж още
              </button>
            </div>
          </motion.div>
        </section>
        <section>
          <h2 className="text-cyan-600 text-2xl font-bold">
            Най-ново от лодки
          </h2>
          <motion.div
            key={`lodki-${dataToShow.lodki}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="mt-3"
          >
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {data.slice(0, dataToShow.lodki).map((ad, idx) => {
                  return (
                    <motion.div
                      key={ad.id || `${idx}-lod`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <HomeCard ad={ad} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => handleViewMore("lodki")}
                className="text-cyan-600 underline cursor-pointer"
              >
                Виж още
              </button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Home;

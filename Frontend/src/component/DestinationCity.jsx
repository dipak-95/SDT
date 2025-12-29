import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiX,
    FiStar,
    FiClock,
    FiCalendar,
    FiFileText
} from "react-icons/fi";

import {
    AiFillStar,
    AiOutlineStar
} from "react-icons/ai";

import { BsStarHalf } from "react-icons/bs";

export default function DestinationCity({ cityName, places, heroImg }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    return (
        <div className="min-h-screen bg-white pb-10">

            {/* PAGE HERO */}
            <div className="relative h-[250px] md:h-[65vh] overflow-hidden">

                {/* ⭐ HERO IMAGE ANIMATION */}
                <motion.img
                    src={heroImg || places[0].img}
                    alt={cityName}
                    className="absolute w-full h-full object-center"
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />

                <div className="absolute inset-0 bg-black/50" />

                {/* ⭐ HERO TEXT ANIMATION */}
                <motion.div
                    className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-[#f4612b]">{cityName}</h1>
                    <p className="text-white/90 mt-2">
                        Explore the best tourist attractions and hidden gems of {cityName}
                    </p>
                </motion.div>
            </div>

            {/* ===================== PLACES GRID ===================== */}
            <div className="max-w-6xl mx-auto px-4 mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {places.map((place, index) => {
                    const rating = parseFloat(place.rating) || 0;
                    const fullStars = Math.floor(rating);
                    const halfStar = rating % 1 >= 0.5;
                    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

                    return (
                        <motion.div
                            key={index}

                            /* ⭐ CARD LOAD ANIMATION */
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}

                            whileHover={{ scale: 1.03 }}
                            className="rounded-xl overflow-hidden shadow-lg bg-white transition"
                        >
                            {/* IMAGE */}
                            <div
                                className="glass-img cursor-pointer"
                                onClick={() => setSelectedImage(place.img)}
                            >
                                <img
                                    src={place.img}
                                    alt={place.name}
                                    className="h-52 w-full object-cover"
                                />
                            </div>

                            {/* CARD CONTENT */}
                            <div className="p-4 space-y-2 text-sm">
                                <h3 className="font-semibold text-gray-800 text-lg">
                                    {place.name}
                                </h3>

                                {/* ⭐ HALF STAR RATING */}
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {Array.from({ length: fullStars }).map((_, i) => (
                                            <AiFillStar key={`full-${i}`} className="text-[#F4612B] text-lg" />
                                        ))}
                                        {halfStar && <BsStarHalf className="text-[#F4612B] text-lg" />}
                                        {Array.from({ length: emptyStars }).map((_, i) => (
                                            <AiOutlineStar key={`empty-${i}`} className="text-gray-300 text-lg" />
                                        ))}
                                    </div>

                                    <span className="font-semibold text-[#F4612B] text-sm">
                                        {rating.toFixed(1)}
                                        <span className="text-[#F4612B] text-sm ml-0.5">/ 5</span>
                                    </span>
                                </div>

                                {/* 🕒 TIMINGS */}
                                <div className="flex items-center gap-2 mt-3">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 shadow-sm text-[#F4612B]">
                                        <FiClock className="text-sm" />
                                        {place.timings}
                                    </span>
                                </div>

                                {/* 🍁 SEASON */}
                                <div className="flex items-center gap-2 mt-3">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 shadow-sm text-[#F4612B]">
                                        <FiCalendar className="text-sm" />
                                        {place.season}
                                    </span>
                                </div>

                                {/* BUTTON */}
                                <button
                                    onClick={() => setSelectedPlace(place)}
                                    className="mt-3 bg-[#F4612B] text-white px-4 py-2 w-full rounded-full text-sm hover:opacity-90"
                                >
                                    View Info
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ===================== IMAGE POPUP ===================== */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.img
                            src={selectedImage}
                            className="max-h-[80vh] rounded-xl shadow-lg"
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.7 }}
                        />

                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-5 right-5 bg-white text-black rounded-full p-2 shadow-lg"
                        >
                            <FiX size={22} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===================== INFO POPUP ===================== */}
            <AnimatePresence>
                {selectedPlace && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="
                                bg-white p-6 rounded-xl max-w-lg w-full relative shadow-xl 
                                overflow-y-auto max-h-[90vh] hide-scrollbar
                            "
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <button
                                onClick={() => setSelectedPlace(null)}
                                className="absolute top-3 right-3 text-gray-700 hover:text-black"
                            >
                                <FiX size={22} />
                            </button>

                            <h2 className="text-2xl font-semibold text-gray-800">
                                {selectedPlace.name}
                            </h2>

                            <img
                                src={selectedPlace.img}
                                alt={selectedPlace.name}
                                className="rounded-lg mt-4"
                            />

                            {/* INFO BOX */}
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FFF4EF] p-4 rounded-xl text-sm">
                                <p className="flex items-center gap-2 text-gray-700">
                                    <FiStar className="text-[#F4612B]" />
                                    <strong>Rating:</strong> {selectedPlace.rating}
                                </p>

                                <p className="flex items-center gap-2 text-gray-700 col-span-2">
                                    <FiClock className="text-[#F4612B]" />
                                    <strong>Timings:</strong> {selectedPlace.timings}
                                </p>

                                <p className="flex items-center gap-2 text-gray-700 col-span-2">
                                    <FiCalendar className="text-[#F4612B]" />
                                    <strong className="text-[13px]">Best Season:</strong> {selectedPlace.season}
                                </p>

                                <p className="flex items-center gap-2 text-gray-700 col-span-2">
                                    <FiFileText className="text-[#F4612B]" />
                                    <strong>Entry Fee:</strong> {selectedPlace.entry}
                                </p>
                            </div>

                            {/* DESCRIPTION */}
                            <div className="mt-4 space-y-2">
                                {Array.isArray(selectedPlace.desc)
                                    ? selectedPlace.desc.map((line, i) => (
                                        <p key={i} className="text-gray-600 text-sm leading-relaxed flex gap-2">
                                            <span className="text-[#F4612B] text-lg leading-4">•</span>
                                            {line}
                                        </p>
                                    ))
                                    : (
                                        <p className="text-gray-600 text-sm leading-relaxed flex gap-2">
                                            <span className="text-[#F4612B] text-lg leading-4">•</span>
                                            {selectedPlace.desc}
                                        </p>
                                    )}
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

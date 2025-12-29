import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, Star, Users, Gauge, MapPin,
  Calendar, Shield, Zap, Award, BusFront, CarTaxiFront, TrendingUp, X
} from 'lucide-react';
import { useNavigate } from "react-router-dom";


export default function RentalCar() {
  const [showTempoMenu, setShowTempoMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([14, 40]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const tempoRef = useRef(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const navigate=useNavigate()


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tempoRef.current && !tempoRef.current.contains(e.target)) {
        setShowTempoMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  /* ===================== VEHICLES ===================== */
  const cars = [
    // -------- CARS --------
    {
      id: 1,
      name: 'Swift Dzire',
      category: 'cars',
      price: 14,
      image: '/Dezire.webp',
      rating: 4.6,
      seats: 5,
      transmission: 'Manual',
      fuel: 'Petrol',
      features: ['bluetooth', 'ac', 'gps', 'camera']
    },

    {
      id: 2,
      name: 'Ertiga',
      category: 'cars',
      price: 22,
      image: '/Ertiga.webp',
      rating: 4.7,
      seats: 7,
      transmission: 'Manual',
      fuel: 'Diesel',
      features: ['bluetooth', 'ac', 'gps', 'camera']
    },
    {
      id: 3,
      name: 'Innova Crysta',
      category: 'cars',
      price: 18,
      image: '/Innova.webp',
      rating: 4.8,
      seats: 7,
      transmission: 'Manual',
      fuel: 'Diesel',
      features: ['bluetooth', 'gps', 'camera', 'ac']
    },
    // -------- BUSES --------
    {
      id: 4,
      name: 'Luxury Bus',
      category: 'buses',
      price: 30,
      image: 'bus2.webp',
      rating: 5.0,
      seats: 45,
      transmission: 'Manual',
      fuel: 'Diesel',
      features: ['bluetooth', 'gps', 'ac']
    },
    {
      id: 5,
      name: 'Bharat Benz Bus',
      category: 'buses',
      price: 40,
      image: 'bus2.webp',
      rating: 5.0,
      seats: 45,
      transmission: 'Manual',
      fuel: 'Diesel',
      features: ['bluetooth', 'gps', 'ac']
    },
    {
      id: 6,
      name: 'Mini Bus',
      category: 'buses',
      price: 35,
      image: 'bus2.webp',
      rating: 5.0,
      seats: 19,
      transmission: 'Manual',
      fuel: 'Diesel',
      features: ['bluetooth', 'gps', 'ac']
    },

    // -------- TEMPO TRAVELLERS --------
    {
      id: 7,
      name: 'Force Urbania',
      category: 'urbania',
      price: 35,
      image: '/Urbania.webp',
      rating: 5.0,
      seats: 17,
      transmission: 'Manual',
      fuel: 'Diesel',
      features: ['bluetooth', 'gps', 'ac']
    },
    {
      id: 8,
      name: 'Maharaja',
      category: 'maharaja',
      price: 32,
      image: '/Urbania.webp',
      rating: 5.0,
      seats: 17,
      transmission: 'Manual',
      fuel: 'Diesel',
      features: ['bluetooth', 'gps', 'ac']
    }
  ];

  /* ===================== CATEGORIES ===================== */
  const categories = [
    { id: 'all', name: 'All Vehicles', icon: <Gauge className="w-5 h-5" /> },
    { id: 'cars', name: 'Cars', icon: <CarTaxiFront className="w-5 h-5" /> },
    { id: 'buses', name: 'Buses', icon: <BusFront className="w-5 h-5" /> },
    { id: 'tempo', name: 'Tempo Traveller', icon: <BusFront className="w-5 h-5" /> }
  ];


  /* ===================== FEATURES (LEFT FILTER) ===================== */
  const features = [
    { id: 'bluetooth', name: 'Bluetooth', icon: <Zap className="w-4 h-4" /> },
    { id: 'gps', name: 'GPS Navigation', icon: <MapPin className="w-4 h-4" /> },
    { id: 'camera', name: 'Backup Camera', icon: <Shield className="w-4 h-4" /> },
    { id: 'ac', name: 'AC', icon: <Award className="w-4 h-4" /> }
  ];

  const toggleFeature = (id) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  /* ===================== FILTER LOGIC ===================== */
  const filteredCars = useMemo(() => {
    let result = cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || car.category === selectedCategory;
      const matchesPrice =
        car.price >= priceRange[0] && car.price <= priceRange[1];
      const matchesFeatures =
        selectedFeatures.length === 0 ||
        selectedFeatures.every(f => car.features.includes(f));

      return matchesSearch && matchesCategory && matchesPrice && matchesFeatures;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchTerm, selectedCategory, priceRange, selectedFeatures, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section – Image Only */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative h-[65vh] w-full flex items-center justify-center"
      >
        {/* Background Image */}
        <motion.img
          src="heroofcar.webp"
          alt="Luxury Car"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Center Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
          className="relative z-10 text-white text-center font-bold 
               text-4xl sm:text-5xl md:text-4xl lg:text-5xl leading-tight px-6"
        >
          Choose Your Perfect Ride
          <span className="block text-orange-500 mt-3">
            Drive With Comfort
          </span>
        </motion.h1>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">


        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8"
        >
          {/* 🔍 Search Bar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
            className="relative w-full lg:w-1/3"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by vehicle name or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-orange-500 focus:outline-none"
            />
          </motion.div>

          {/* 🟠 Categories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.45, ease: "easeOut" }}
            className="flex flex-wrap gap-3 justify-center relative"
          >
            {categories
              .filter(cat => cat.id !== 'tempo')
              .map((category, i) => (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setShowTempoMenu(false);
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-2 cursor-pointer px-6 py-3 rounded-lg font-semibold transition-all
            ${selectedCategory === category.id
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-orange-500 hover:text-white border'
                    }`}
                >
                  {category.icon}
                  {category.name}
                </motion.button>
              ))}

            {/* Tempo Traveller */}
            <div className="relative" ref={tempoRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowTempoMenu(!showTempoMenu)}
                className="flex items-center gap-2 cursor-pointer px-6 py-3 rounded-lg font-semibold bg-white text-gray-700 hover:bg-orange-500 hover:text-white border transition-all"
              >
                <BusFront className="w-5 h-5" />
                Tempo Traveller
                <motion.span
                  animate={{ rotate: showTempoMenu ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="ml-1"
                >
                  ▼
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {showTempoMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute top-full mt-2 left-0 bg-white border rounded-lg shadow-lg w-55 z-30 overflow-hidden"
                  >
                    <motion.button
                      onClick={() => {
                        setSelectedCategory('urbania');
                        setShowTempoMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 font-semibold hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                    >
                      Force Urbania
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        setSelectedCategory('maharaja');
                        setShowTempoMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 font-semibold hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                    >
                      Maharaja Tempo Traveller
                    </motion.button>
                  </motion.div>

                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>


        <div className="flex flex-col lg:flex-row gap-8 lg:h-[calc(100vh-120px)]">

          {/* Mobile Filter Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:hidden"
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-gray-200"
            >
              <SlidersHorizontal className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">Filters</span>
            </button>
          </motion.div>

          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-80 space-y-6 
            lg:sticky lg:top-24 lg:self-start`}
          >
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100">
              {/* Price Range */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="mb-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Price Range
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="14"
                    max="40"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: '#f97316' }}
                  />
                  <div className="flex justify-between text-sm font-semibold text-gray-700">
                    <span>₹{priceRange[1]}</span>
                    <span>₹{priceRange[1].toLocaleString('en-IN')}/KM</span>
                  </div>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.35 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-orange-500" />
                  Features
                </h3>
                <div className="space-y-2">
                  {features.map((feature, i) => (
                    <motion.button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${selectedFeatures.includes(feature.id)
                          ? 'bg-orange-50 border-2 border-orange-500 text-orange-700'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                        }`}
                    >
                      {feature.icon}
                      <span className="font-medium">{feature.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Reset Filters */}
              {(selectedFeatures.length > 0 ||
                priceRange[1] < 40 ||
                selectedCategory !== 'all') && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setSelectedFeatures([]);
                      setPriceRange([14, 40]);
                      setSelectedCategory('all');
                      setSearchTerm('');
                    }}
                    className="w-full mt-6 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border-2 border-red-200"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </motion.button>
                )}
            </div>
          </motion.div>


          {/* Cars Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col"
          >
            {/* Sticky Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="sticky top-0 z-10 bg-gray-50 pb-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600 font-medium">
                  <span className="text-2xl font-bold text-gray-900">
                    {filteredCars.length}
                  </span>{' '}
                  {selectedCategory === 'cars'
                    ? 'cars available'
                    : selectedCategory === 'buses'
                      ? 'buses available'
                      : 'vehicles available'}
                </p>

                <div className="relative">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="flex justify-center gap-2 hover:bg-orange-500 hover:text-white bg-white w-55 py-3 text-gray-700 rounded-lg border border-gray-700 font-semibold cursor-pointer hover:border-orange-500 transition-all"
                  >
                    {sortBy === 'popular'
                      ? 'Most Popular'
                      : sortBy === 'price-low'
                        ? 'Price: Low to High'
                        : sortBy === 'price-high'
                          ? 'Price: High to Low'
                          : 'Highest Rated'}
                    <motion.span
                      animate={{ rotate: showSortMenu ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-1"
                    >
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {showSortMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-55 bg-white border rounded-lg shadow-lg z-30 overflow-hidden"
                      >
                        <button
                          onClick={() => {
                            setSortBy('popular');
                            setShowSortMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 font-semibold cursor-pointer text-gray-700 hover:bg-orange-500 hover:text-white transition-colors"
                        >
                          Most Popular
                        </button>

                        <button
                          onClick={() => {
                            setSortBy('price-low');
                            setShowSortMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 font-semibold text-gray-700 cursor-pointer hover:bg-orange-500 hover:text-white transition-colors"
                        >
                          Price: Low to High
                        </button>

                        <button
                          onClick={() => {
                            setSortBy('price-high');
                            setShowSortMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 font-semibold text-gray-700 cursor-pointer hover:bg-orange-500 hover:text-white transition-colors"
                        >
                          Price: High to Low
                        </button>

                        <button
                          onClick={() => {
                            setSortBy('rating');
                            setShowSortMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 font-semibold cursor-pointer text-gray-700 hover:bg-orange-500 hover:text-white transition-colors"
                        >
                          Highest Rated
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Scrollable Grid */}
            <div className="flex-1 lg:overflow-y-auto hide-scrollbar">
              {filteredCars.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-20 bg-white rounded-xl shadow-md border-2 border-gray-100"
                >
                  <Gauge className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No cars found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search terms
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-1 gap-5">
                  {filteredCars.map((car, i) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-orange-500 transform hover:-translate-y-1"
                    >
                      {/* 🔁 KEEP YOUR CARD JSX EXACTLY SAME */}
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-lg">
                          <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                          <span className="font-bold text-gray-900">{car.rating}</span>
                        </div>
                        <div
                          className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold uppercase shadow-lg flex items-center gap-1
                  ${car.category === 'cars'
                              ? 'bg-blue-600 text-white'
                              : 'bg-green-600 text-white'
                            }`}
                        >
                          {car.category === 'cars' ? (
                            <>
                              <CarTaxiFront className="w-3 h-3" />
                              Car
                            </>
                          ) : (
                            <>
                              <BusFront className="w-3 h-3" />
                              Bus
                            </>
                          )}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">
                          {car.name}
                        </h3>

                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="flex flex-col items-center p-2 bg-orange-50 rounded-lg">
                            <Users className="w-5 h-5 text-orange-500 mb-1" />
                            <span className="text-xs font-semibold text-gray-600">
                              {car.seats} Seats
                            </span>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-orange-50 rounded-lg">
                            <Gauge className="w-5 h-5 text-orange-500 mb-1" />
                            <span className="text-xs font-semibold text-gray-600">
                              {car.transmission}
                            </span>
                          </div>
                          <div className="flex flex-col items-center p-3 bg-orange-50 rounded-lg">
                            <Zap className="w-5 h-5 text-orange-500 mb-1" />
                            <span className="text-xs font-semibold text-gray-600">
                              {car.fuel}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                          <div>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Per KM
                            </p>
                            <p className="text-xl font-bold text-orange-500">
                              ₹{car.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          {/* <button className="px-3 py-1.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 border transform hover:scale-105 transition-all shadow-md">
                            Check Enquiry
                          </button> */}
                          <button
                            onClick={() => navigate(`/car-book/${car.id}`)}
                            className="
    px-4 py-2
    bg-orange-500
    text-white
    font-semibold
    rounded-lg
    hover:bg-white
    hover:text-orange-600
    border
    transition
  "
                          >
                            Check Enquiry
                          </button>

                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
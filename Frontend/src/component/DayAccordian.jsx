import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoIosArrowDown,
  IoIosArrowBack,
  IoIosArrowForward
} from "react-icons/io";
import { FiCheckCircle } from "react-icons/fi";

const BASE_URL = "https://sdt-7.onrender.com";

const DayAccordion = ({ data = [] }) => {
  const [openDay, setOpenDay] = useState(null);

  return (
    <div style={{ width: "100%" }}>
      {data.map((day) => (
        <AccordionItem
          key={day.day}
          day={day}
          isOpen={openDay === day.day}
          onToggle={() =>
            setOpenDay(openDay === day.day ? null : day.day)
          }
        />
      ))}
    </div>
  );
};

const AccordionItem = ({ day, isOpen, onToggle }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth"
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth"
    });
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        marginBottom: 20,
        overflow: "hidden"
      }}
    >
      {/* HEADER */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer"
        }}
      >
        <strong>
          Day {String(day.day).padStart(2, "0")}: {day.title}
        </strong>

        <IoIosArrowDown
          style={{
            color: "#F4612B",
            fontSize: 20,
            transition: "0.3s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
          }}
        />
      </button>

      {/* CONTENT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: 16 }}>

              {/* IMAGE SLIDER */}
              {day.images?.length > 0 && (
                <div style={{ position: "relative", marginBottom: 14 }}>
                  <button onClick={scrollLeft} style={arrowStyle("left")}>
                    <IoIosArrowBack style={arrowIconStyle} />
                  </button>
                  <button onClick={scrollRight} style={arrowStyle("right")}>
                    <IoIosArrowForward style={arrowIconStyle} />
                  </button>

                  <div
                    ref={sliderRef}
                    style={{
                      display: "flex",
                      gap: 12,
                      overflowX: "auto",
                      scrollSnapType: "x mandatory"
                    }}
                  >
                    {day.images.map((img, i) => (
                      <div
                        key={i}
                        style={{
                          minWidth: "100%",
                          height: 220,
                          scrollSnapAlign: "center",
                          borderRadius: 14,
                          overflow: "hidden"
                        }}
                      >
                        <img
                          src={`${BASE_URL}${img}`}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* POINTS WITH ICON */}
              <ul style={{ padding: 0, margin: 0 }}>
                {day.points?.map((p, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      marginBottom: 10,
                      listStyle: "none"
                    }}
                  >
                    <FiCheckCircle
                      style={{
                        color: "#F4612B",
                        fontSize: 16,
                        marginTop: 3,
                        flexShrink: 0
                      }}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "#444"
                      }}
                    >
                      {p}
                    </span>
                  </li>
                ))}
              </ul>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- INLINE ARROW STYLES ---------- */
const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: 8,
  transform: "translateY(-50%)",
  zIndex: 5,
  background: "#fff",
  borderRadius: "50%",
  padding: 6,
  border: "none",
  boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
  cursor: "pointer"
});

const arrowIconStyle = {
  color: "#F4612B",
  fontSize: 20
};

export default DayAccordion;

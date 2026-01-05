// import { motion } from "framer-motion";

// const text = "Saurashtra Darshan";

// export default function BrandLoader() {
//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
//       <motion.h1
//         className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           visible: {
//             transition: {
//               staggerChildren: 0.08
//             }
//           }
//         }}
//       >
//         {text.split("").map((char, index) => (
//           <motion.span
//             key={index}
//             className="inline-block"
//             variants={{
//               hidden: {
//                 opacity: 0,
//                 rotateY: 220,
//                 transformPerspective: 1000,
//                 color: "#e5e7eb"
//               },
//               visible: {
//                 opacity: 1,
//                 rotateY: 0,
//                 color: "#f46b12",
//                 textShadow: "0px 0px 18px rgba(244,107,18,0.45)"
//               }
//             }}
//             transition={{
//               duration: 0.55,
//               ease: "easeOut"
//             }}
//             style={{
//               transformOrigin: "left center"
//             }}
//           >
//             {char === " " ? "\u00A0" : char}
//           </motion.span>
//         ))}
//       </motion.h1>
//     </div>
//   );
// }
import { motion } from "framer-motion";

const words = ["Saurashtra", "Darshan"];

export default function BrandLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <motion.h1
        className="
          text-5xl md:text-6xl lg:text-7xl
          font-bold tracking-wide
          flex flex-col md:flex-row
          md:gap-4
          items-center
        "
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.08
            }
          }
        }}
      >
        {words.map((word, wIndex) => (
          <div key={wIndex} className="flex">
            {word.split("").map((char, index) => (
              <motion.span
                key={`${wIndex}-${index}`}
                className="inline-block"
                variants={{
                  hidden: {
                    opacity: 0,
                    rotateY: 220,
                    transformPerspective: 1000,
                    color: "#e5e7eb"
                  },
                  visible: {
                    opacity: 1,
                    rotateY: 0,
                    color: "#f46b12",
                    textShadow:
                      "0px 0px 18px rgba(244,107,18,0.45)"
                  }
                }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut"
                }}
                style={{
                  transformOrigin: "left center"
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.h1>
    </div>
  );
}

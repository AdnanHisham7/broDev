import React from "react";
import spanner from "../images/spanner.png";

const UnderConstruction: React.FC = () => {
  return (
    <div className="flex items-center justify-center mt-14 scrollbar-hide text-white flex-col text-center">
      {/* Icon */}
      <div className="mb-4">
        <img
          src={spanner}
          alt="Under Construction"
          className="w-32 h-32"
        />
      </div>

      {/* Main Text */}
      <div className="flex flex-col leading-none space-y-2">
        <h1 className="text-6xl sm:text-5xl uppercase font-anton">Under</h1>
        <h1 className="text-6xl sm:text-6xl uppercase font-anton">
          Construction
        </h1>
      </div>

      {/* Subtext */}
      <p className="text-lg mt-3 opacity-80 font-anton">
        Great things take time. Stay with us!
      </p>
    </div>
  );
};

export default UnderConstruction;

// import React from "react";
// import constructionIcon from "../images/construction-icon.png";

// const UnderConstruction: React.FC = () => {
//   return (
//     <div className="relative flex flex-col items-center justify-center mt-48 bg-black text-white text-center p-6">
//       {/* Icon positioned absolutely to the top-right */}
//       <img
//         src={constructionIcon}
//         alt="Under Construction"
//         className="absolute -top-36 right-64 w-32 h-32 sm:w-56 sm:h-56"
//       />

//       {/* Main Text */}
//       <div className="flex flex-col leading-none">
//         <h1 className="text-6xl sm:text-6xl uppercase font-anton">Under</h1>
//         <h1 className="text-6xl sm:text-7xl uppercase font-anton">Construction</h1>
//       </div>

//       {/* Subtext */}
//       <p className="text-lg mt-4 opacity-80 font-anton">
//         Great things take time. Stay with us!
//       </p>
//     </div>
//   );
// };

// export default UnderConstruction;

import React, { useState, useEffect } from "react";
import SpotlightCard from "./SpotlightCard";

interface TechnologyData {
  name: string;
  count: number;
  percentage: number;
}

interface PlacementCardProps {
  totalPlacements: number;
  technologies: TechnologyData[];
  onShowMore?: () => void;
}

const PlacementCard: React.FC<PlacementCardProps> = ({
  totalPlacements,
  technologies,
  onShowMore,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for the skeleton
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleShowMore = () => {
    setShowAll(true);
    if (onShowMore) {
      onShowMore();
    }
  };

  const displayedTechnologies = showAll
    ? technologies
    : technologies.slice(0, 3);

  return (
    <SpotlightCard
      className="custom-spotlight-card"
      spotlightColor="rgba(200, 200, 200, 0.25)"
    >
      <div
        className={`w-full max-w-md bg-black text-white rounded-3xl p-6 border border-gray-800 ${
          isLoading ? "animate-pulse bg-gray-800" : ""
        }`}
      >
        {isLoading ? (
          // Overall skeleton loading state
          <div className="animate-pulse">
            {/* Skeleton for the totalPlacements section */}
            <div className="text-center mb-8">
              <div className="h-10 bg-gray-600 rounded w-24 mb-2" />{" "}
              {/* Skeleton for the number */}
              <div className="h-6 bg-gray-600 rounded w-32" />{" "}
              {/* Skeleton for the text */}
            </div>

            {/* Skeleton for the technologies section */}
            <div className="space-y-3 mb-10">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="h-4 bg-gray-600 rounded w-full" />{" "}
                  {/* Skeleton for the tech name */}
                  
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Actual content when not loading
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">{totalPlacements}</h1>
              <p className="text-xl font-medium">Placements</p>
            </div>

            <div className="space-y-2">
              {displayedTechnologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm font-medium w-24">{tech.name}</span>
                  <div className="flex-1 mx-3">
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-1000"
                        style={{ width: `${tech.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{tech.count}</span>
                </div>
              ))}
            </div>

            {!showAll && technologies.length > 3 && (
              <button
                onClick={handleShowMore}
                className="w-full text-right mt-4 text-xxs text-gray-300 hover:text-white"
              >
                show more
              </button>
            )}
          </>
        )}
      </div>
    </SpotlightCard>
  );
};

export default PlacementCard;

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpotlightCard from "./SpotlightCard";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface LeetCodeStatsProps {
  leetcodeUsername: string;
}

interface Stats {
  totalQuestions: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

const LeetCodeStats: React.FC<LeetCodeStatsProps> = ({ leetcodeUsername }) => {
  const [stats, setStats] = useState<Stats>({
    totalQuestions: 0,
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: Stats = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [leetcodeUsername]);


  const easyPercent = (stats.easySolved / stats.totalSolved) * 100 || 0;
  const mediumPercent = (stats.mediumSolved / stats.totalSolved) * 100 || 0;
  const hardPercent = (stats.hardSolved / stats.totalSolved) * 100 || 0;

  return (
    <SpotlightCard
      className="custom-spotlight-card"
      spotlightColor="rgba(255, 223, 0, 0.15)"
    >
      <div className="flex-1 bg-[#14170E] p-6 rounded-xl shadow-md border border-gray-800 text-white">
        <div className="flex items-center justify-center">
          <div className="rounded-full border-2 border-gray-500 w-28 h-28 shadow-md flex items-center justify-center">
            <div className="text-center">
              <div className={`font-bold ${isLoading ? "text-sm" : "text-4xl"}`}>
              {isLoading ? (
                    "Fetching..."
                  ) : (
                    <>
                      {stats.totalSolved}
                      <span className="text-xs font-extralight">
                        /{stats.totalQuestions}
                      </span>
                    </>
                  )}
              </div>
              {!isLoading && (
                  <p className="text-xs text-gray-400 mt-1">
                    <FontAwesomeIcon className="text-customGreen" icon={faCheck} /> solved
                  </p>
                )}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
            {/* Difficulty progress bars */}
            <div className="flex items-center justify-between">
              <span className="text-green-400 text-xs w-[3.4rem] text-left">
                Easy
              </span>
              <div className="flex-1 h-3 mx-2 bg-gray-700 rounded">
                <div
                  className="h-full bg-green-400 rounded transition-all duration-500"
                  style={{ width: `${easyPercent}%` }}
                />
              </div>
              <span className="text-gray-400 text-xs w-[2.1rem] text-right">
                {stats.easySolved}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-yellow-400 text-xs w-[3.4rem] text-left">
                Medium
              </span>
              <div className="flex-1 h-3 mx-2 bg-gray-700 rounded">
                <div
                  className="h-full bg-yellow-400 rounded transition-all duration-500"
                  style={{ width: `${mediumPercent}%` }}
                />
              </div>
              <span className="text-gray-400 text-xs w-[2.1rem] text-right">
                {stats.mediumSolved}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-red-400 text-xs w-[3.4rem] text-left">
                Hard
              </span>
              <div className="flex-1 h-3 mx-2 bg-gray-700 rounded">
                <div
                  className="h-full bg-red-400 rounded transition-all duration-500"
                  style={{ width: `${hardPercent}%` }}
                />
              </div>
              <span className="text-gray-400 text-xs w-[2.1rem] text-right">
                {stats.hardSolved}
              </span>
            </div>
          </div>

      </div>
    </SpotlightCard>
  );
};

export default LeetCodeStats;

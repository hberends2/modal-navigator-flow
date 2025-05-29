
import React from "react";
import MetricRow from "./MetricRow";
import { marketADRData, compSetADRData } from "./revenueData";
import { getMarketADRYoY, getCompSetADRYoY, getHistoricalADRYoY, getForecastADRYoY, formatYoYWithColor } from "./revenueCalculations";

interface ADRSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  getHistoricalADR: (year: number) => number;
  getForecastADR: (year: number) => number;
}

const ADRSection: React.FC<ADRSectionProps> = ({
  historicalYears,
  forecastYears,
  getHistoricalADR,
  getForecastADR
}) => {
  return (
    <>
      {/* ADR Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">ADR</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
      />

      {/* Market ADR */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Market (Hotel Horizons / LARC)</span>}
        historicalData={historicalYears.map(year => {
          const data = marketADRData[year as keyof typeof marketADRData];
          return data ? `$${data.toFixed(2)}` : "-";
        })}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Market ADR YoY Growth */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Market ADR YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : formatYoYWithColor(getMarketADRYoY(year, index, historicalYears))
        )}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Comp Set ADR */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Comp Set (STR / Trend Report)</span>}
        historicalData={historicalYears.map(year => {
          const data = compSetADRData[year as keyof typeof compSetADRData];
          return data ? `$${data.toFixed(2)}` : "-";
        })}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Comp Set ADR YoY Growth */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comp Set ADR YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : formatYoYWithColor(getCompSetADRYoY(year, index, historicalYears))
        )}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Subject Property ADR */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Subject Property ADR</span>}
        historicalData={historicalYears.map(year => `$${getHistoricalADR(year).toFixed(2)}`)}
        forecastData={forecastYears.map(year => `$${getForecastADR(year).toFixed(2)}`)}
      />

      {/* Subject Property ADR YoY Growth */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subject Property ADR YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : formatYoYWithColor(getHistoricalADRYoY(year, index, historicalYears, getHistoricalADR))
        )}
        forecastData={forecastYears.map(year => formatYoYWithColor(getForecastADRYoY(year, forecastYears, getForecastADR, getHistoricalADR(2024))))}
      />
    </>
  );
};

export default ADRSection;

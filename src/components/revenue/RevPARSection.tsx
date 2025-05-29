
import React from "react";
import MetricRow from "./MetricRow";
import GrowthControls from "./GrowthControls";
import { marketRevparData, compSetRevparData } from "./revenueData";
import { getMarketRevparYoY, getCompSetRevparYoY, getForecastRevparYoY, formatYoYWithColor } from "./revenueCalculations";

interface RevPARSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  historicalData: {
    revpar: Record<number, number>;
    revparYoY: Record<number, number>;
  };
  revparGrowthType: string;
  setRevparGrowthType: (value: string) => void;
  flatRevparGrowth: string;
  setFlatRevparGrowth: (value: string) => void;
  yearlyRevparGrowth: Record<number, string>;
  handleYearlyRevparChange: (year: number, value: string) => void;
  getForecastRevpar: (year: number) => number;
}

const RevPARSection: React.FC<RevPARSectionProps> = ({
  historicalYears,
  forecastYears,
  historicalData,
  revparGrowthType,
  setRevparGrowthType,
  flatRevparGrowth,
  setFlatRevparGrowth,
  yearlyRevparGrowth,
  handleYearlyRevparChange,
  getForecastRevpar
}) => {
  return (
    <>
      {/* RevPAR Section Header */}
      <MetricRow
        label={<span className="font-bold text-gray-900">RevPAR</span>}
        historicalData={historicalYears.map(() => "")}
        forecastData={forecastYears.map(() => "")}
      />

      {/* Market RevPAR */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Market (Hotel Horizons / LARC)</span>}
        historicalData={historicalYears.map(year => {
          const data = marketRevparData[year as keyof typeof marketRevparData];
          return data ? `$${data}` : "-";
        })}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Market RevPAR YoY Growth */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Market RevPAR YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : formatYoYWithColor(getMarketRevparYoY(year, index, historicalYears))
        )}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Comp Set RevPAR */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Comp Set (STR / Trend Report)</span>}
        historicalData={historicalYears.map(year => {
          const data = compSetRevparData[year as keyof typeof compSetRevparData];
          return data ? `$${data}` : "-";
        })}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Comp Set RevPAR YoY Growth */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comp Set RevPAR YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : formatYoYWithColor(getCompSetRevparYoY(year, index, historicalYears))
        )}
        forecastData={forecastYears.map(() => "-")}
      />

      {/* Subject Property RevPAR */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;Subject Property RevPAR</span>}
        historicalData={historicalYears.map(year => `$${historicalData.revpar[year].toFixed(2)}`)}
        forecastData={forecastYears.map(year => `$${getForecastRevpar(year).toFixed(2)}`)}
      />

      {/* Subject Property RevPAR YoY Growth */}
      <MetricRow
        label={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Subject Property RevPAR YoY Growth</span>}
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : formatYoYWithColor(historicalData.revparYoY[year])
        )}
        forecastData={forecastYears.map(year => formatYoYWithColor(getForecastRevparYoY(year, forecastYears, getForecastRevpar, historicalData.revpar[2024])))}
      />

      {/* RevPAR Growth Controls */}
      <MetricRow
        label={
          <GrowthControls
            revparGrowthType={revparGrowthType}
            setRevparGrowthType={setRevparGrowthType}
            flatRevparGrowth={flatRevparGrowth}
            setFlatRevparGrowth={setFlatRevparGrowth}
            yearlyRevparGrowth={yearlyRevparGrowth}
            handleYearlyRevparChange={handleYearlyRevparChange}
            forecastYears={forecastYears}
          />
        }
        historicalData={historicalYears.map((year, index) => 
          index === 0 ? "-" : `${historicalData.revparYoY[year].toFixed(1)}%`
        )}
        forecastData={forecastYears.map(year => 
          revparGrowthType === "yearly" ? "" : `${parseFloat(flatRevparGrowth).toFixed(1)}%`
        )}
        isGrowthRow={true}
        revparGrowthType={revparGrowthType}
        yearlyRevparGrowth={yearlyRevparGrowth}
        handleYearlyRevparChange={handleYearlyRevparChange}
        forecastYears={forecastYears}
      />
    </>
  );
};

export default RevPARSection;

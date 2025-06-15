
import React from "react";
import RevenueTableValidator from "./RevenueTableValidator";
import RevenueTableRenderer from "./RevenueTableRenderer";
import { RevenueTableProps } from "./RevenueTableTypes";

const RevenueTable: React.FC<RevenueTableProps> = ({
  roomsKeys = 108,
  historicalYears = [],
  forecastYears = [],
  ...props
}) => {
  console.log('RevenueTable rendering with props:', {
    roomsKeys,
    historicalYears,
    forecastYears,
    adrGrowthType: props.adrGrowthType,
    occupancyForecastMethod: props.occupancyForecastMethod
  });

  return (
    <RevenueTableValidator
      roomsKeys={roomsKeys}
      historicalYears={historicalYears}
      forecastYears={forecastYears}
      {...props}
    >
      <RevenueTableRenderer
        roomsKeys={roomsKeys}
        historicalYears={historicalYears}
        forecastYears={forecastYears}
        {...props}
      />
    </RevenueTableValidator>
  );
};

export default RevenueTable;

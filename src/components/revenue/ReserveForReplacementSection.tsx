
import React from "react";
import MetricRow from "./MetricRow";

interface ReserveForReplacementSectionProps {
  historicalYears: number[];
  forecastYears: number[];
  reserveForReplacementInput: Record<number, string>;
  handleReserveForReplacementChange: (year: number, value: string) => void;
  handleReserveForReplacementBlur: (year: number, value: string) => void;
  formatCurrency: (value: number) => string;
}

const ReserveForReplacementSection: React.FC<ReserveForReplacementSectionProps> = ({
  historicalYears,
  forecastYears,
  reserveForReplacementInput,
  handleReserveForReplacementChange,
  handleReserveForReplacementBlur,
  formatCurrency
}) => {
  return (
    <>
      {/* Reserve for Replacement Section */}
      <tr id="reserve-for-replacement-section" className="scroll-mt-4">
        <td colSpan={10} className="h-0 p-0"></td>
      </tr>

      {/* Reserve for Replacement Row */}
      <MetricRow
        label="Reserve for Replacement"
        historicalData={historicalYears.map(() => formatCurrency(1000))}
        forecastData={forecastYears.map(() => "")}
        isEditable={true}
        editableData={reserveForReplacementInput}
        onEditableChange={handleReserveForReplacementChange}
        onEditableBlur={handleReserveForReplacementBlur}
        forecastYears={forecastYears}
        isUserInputRow={true}
      />
    </>
  );
};

export default ReserveForReplacementSection;

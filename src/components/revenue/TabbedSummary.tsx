import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SummaryTable from "./TabbedSummary/SummaryTable";
import { createOccupancyMetrics, createRevenueMetrics, createExpenseMetrics, createKeyMetrics, createSubcategoryMetrics, createExpenseSubcategoryMetrics, createUndistributedSubcategoryMetrics } from "./TabbedSummary/metrics";
import { TabbedSummaryProps } from "./TabbedSummary/types";

const TabbedSummary: React.FC<TabbedSummaryProps> = (props) => {
  const [activeTab, setActiveTab] = useState("keyMetrics");
  const [isOtherOperatedExpanded, setIsOtherOperatedExpanded] = useState(false);
  const [isUndistributedExpanded, setIsUndistributedExpanded] = useState(false);

  const { historicalYears, forecastYears, helpers } = props;
  const allYears = [...historicalYears, ...forecastYears];

  console.log('TabbedSummary rendering with activeTab:', activeTab);
  console.log('All years:', allYears);

  // Create metrics for each tab - pass the main helpers instead of creating new ones
  const keyMetrics = createKeyMetrics(props, allYears, helpers);
  const occupancyMetrics = createOccupancyMetrics(props, allYears);
  const revenueMetrics = createRevenueMetrics(props, allYears, isOtherOperatedExpanded, setIsOtherOperatedExpanded);
  const expenseMetrics = createExpenseMetrics(props, allYears, isOtherOperatedExpanded, setIsOtherOperatedExpanded, isUndistributedExpanded, setIsUndistributedExpanded);
  const subcategoryMetrics = createSubcategoryMetrics(props, allYears);
  const expenseSubcategoryMetrics = createExpenseSubcategoryMetrics(props, allYears);
  const undistributedSubcategoryMetrics = createUndistributedSubcategoryMetrics(props, allYears);

  console.log('Key metrics count:', keyMetrics.length);
  console.log('Key metrics labels:', keyMetrics.map(m => m.label));

  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-0">
          <TabsTrigger value="keyMetrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
        </TabsList>
        
        <TabsContent value="keyMetrics" className="mt-0">
          <SummaryTable
            metrics={keyMetrics}
            historicalYears={historicalYears}
            forecastYears={forecastYears}
            activeTab={activeTab}
            isOtherOperatedExpanded={isOtherOperatedExpanded}
            isUndistributedExpanded={isUndistributedExpanded}
            subcategoryMetrics={subcategoryMetrics}
            undistributedSubcategoryMetrics={undistributedSubcategoryMetrics}
          />
        </TabsContent>
        
        <TabsContent value="occupancy" className="mt-0">
          <SummaryTable
            metrics={occupancyMetrics}
            historicalYears={historicalYears}
            forecastYears={forecastYears}
            activeTab={activeTab}
            isOtherOperatedExpanded={isOtherOperatedExpanded}
            isUndistributedExpanded={isUndistributedExpanded}
            subcategoryMetrics={subcategoryMetrics}
            undistributedSubcategoryMetrics={undistributedSubcategoryMetrics}
          />
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-0">
          <SummaryTable
            metrics={revenueMetrics}
            historicalYears={historicalYears}
            forecastYears={forecastYears}
            activeTab={activeTab}
            isOtherOperatedExpanded={isOtherOperatedExpanded}
            isUndistributedExpanded={isUndistributedExpanded}
            subcategoryMetrics={subcategoryMetrics}
            undistributedSubcategoryMetrics={undistributedSubcategoryMetrics}
          />
        </TabsContent>
        
        <TabsContent value="expense" className="mt-0">
          <SummaryTable
            metrics={expenseMetrics}
            historicalYears={historicalYears}
            forecastYears={forecastYears}
            activeTab={activeTab}
            isOtherOperatedExpanded={isOtherOperatedExpanded}
            isUndistributedExpanded={isUndistributedExpanded}
            subcategoryMetrics={expenseSubcategoryMetrics}
            undistributedSubcategoryMetrics={undistributedSubcategoryMetrics}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabbedSummary;

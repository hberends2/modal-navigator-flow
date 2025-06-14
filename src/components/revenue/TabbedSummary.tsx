
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SummaryTable from "./TabbedSummary/SummaryTable";
import { createOccupancyMetrics, createRevenueMetrics, createExpenseMetrics, createSubcategoryMetrics, createExpenseSubcategoryMetrics } from "./TabbedSummary/metrics";
import { TabbedSummaryProps } from "./TabbedSummary/types";

const TabbedSummary: React.FC<TabbedSummaryProps> = (props) => {
  const [activeTab, setActiveTab] = useState("occupancy");
  const [isOtherOperatedExpanded, setIsOtherOperatedExpanded] = useState(false);

  const { historicalYears, forecastYears } = props;
  const allYears = [...historicalYears, ...forecastYears];

  console.log('TabbedSummary rendering with activeTab:', activeTab);
  console.log('All years:', allYears);

  // Create metrics for each tab
  const occupancyMetrics = createOccupancyMetrics(props, allYears);
  const revenueMetrics = createRevenueMetrics(props, allYears, isOtherOperatedExpanded, setIsOtherOperatedExpanded);
  const expenseMetrics = createExpenseMetrics(props, allYears, isOtherOperatedExpanded, setIsOtherOperatedExpanded);
  const subcategoryMetrics = createSubcategoryMetrics(props, allYears);
  const expenseSubcategoryMetrics = createExpenseSubcategoryMetrics(props, allYears);

  console.log('Expense metrics count:', expenseMetrics.length);
  console.log('Expense metrics labels:', expenseMetrics.map(m => m.label));

  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-0">
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
        </TabsList>
        
        <TabsContent value="occupancy" className="mt-0">
          <SummaryTable
            metrics={occupancyMetrics}
            historicalYears={historicalYears}
            forecastYears={forecastYears}
            activeTab={activeTab}
            isOtherOperatedExpanded={isOtherOperatedExpanded}
            subcategoryMetrics={subcategoryMetrics}
          />
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-0">
          <SummaryTable
            metrics={revenueMetrics}
            historicalYears={historicalYears}
            forecastYears={forecastYears}
            activeTab={activeTab}
            isOtherOperatedExpanded={isOtherOperatedExpanded}
            subcategoryMetrics={subcategoryMetrics}
          />
        </TabsContent>
        
        <TabsContent value="expense" className="mt-0">
          <SummaryTable
            metrics={expenseMetrics}
            historicalYears={historicalYears}
            forecastYears={forecastYears}
            activeTab={activeTab}
            isOtherOperatedExpanded={isOtherOperatedExpanded}
            subcategoryMetrics={expenseSubcategoryMetrics}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabbedSummary;
